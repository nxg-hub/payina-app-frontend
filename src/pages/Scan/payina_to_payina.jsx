import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import jsQR from 'jsqr';
import Input from '../../utilities/InputStyle.jsx';
import CustomButton from '../../components/button/button.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { Navbar, Sidebar } from '../Account/_components/index.js';

const PayinaQRTransfer = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [qrCodeData, setQrCodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [pin, setPin] = useState(['', '', '', '']);
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newAuthToken] = useLocalStorage('authToken', '');
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.user.user);

  useEffect(() => {
    // Reset state when tab changes
    setError('');
    setSuccess('');
    setScanResult(null);
    setQrCodeData(null);
    setAmount('');
    setDescription('');
    setPin(['', '', '', '']);
  }, [activeTab]);

  const generateQR = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const qrData = {
        destinationId: userDetails.walletId,
        receiverName: userDetails.accountName,
        receiverEmailAddress: userDetails.email,
        amount,
        description,
      };

      setQrCodeData(JSON.stringify(qrData));
      setSuccess('QR code generated successfully!');
      setError('');
    } catch (error) {
      setError('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'payina-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            try {
              const parsedData = JSON.parse(code.data);
              if (parsedData.destinationId && parsedData.amount) {
                setScanResult(JSON.stringify(parsedData));
                setError('');
              } else {
                throw new Error('Invalid QR code format');
              }
            } catch (error) {
              setError('Invalid QR code format');
              setScanResult(null);
            }
          } else {
            setError('No QR code found in the image');
            setScanResult(null);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePinInput = (value, index) => {
    if (value && !/^\d+$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  const processPayment = async () => {
    if (pin.join('').length !== 4) {
      setError('Please enter a complete PIN.');
      return;
    }

    setLoading(true);

    try {
      const pinResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_VALIDATE_TRANSACTION_PIN_ENDPOINT}?email=${userDetails.email}&transactionPin=${pin.join('')}`
      );

      if (pinResponse.data.message === 'Transaction PIN is valid.') {
        try {
          const scannedData = JSON.parse(scanResult);
          const payload = {
            sourceId: userDetails.walletId,
            destinationId: scannedData.destinationId,
            amount: scannedData.amount,
            senderName: userDetails.accountName,
            receiverName: scannedData.receiverName,
            senderEmailAddress: userDetails.email,
            receiverEmailAddress: scannedData.receiverEmailAddress,
            description: scannedData.description || 'QR Payment',
          };

          const transferResponse = await axios.post(
            `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_IN_HOUSE_TRANSFER_ENDPOINT}`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                apiKey: import.meta.env.VITE_API_KEY,
              },
            }
          );

          if (
            transferResponse.data.response ===
            'Insufficient funds in source wallet. Transfer operation aborted! Kindly fund your account.'
          ) {
            setError('Insufficient funds. Please fund your account and try again.');
            return;
          }

          if (transferResponse.data.httpStatusCode >= 400) {
            throw new Error(transferResponse.data.response || 'Transaction failed');
          }

          setSuccess('Payment completed successfully!');
          setScanResult(null);
          setPin(['', '', '', '']);
        } catch (transferError) {
          if (transferError.response?.data?.response) {
            setError(transferError.response.data.response);
          } else {
            setError(transferError.message || 'Transfer failed. Please try again.');
          }
        }
      } else {
        setError('Incorrect PIN. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        const backendMessage =
          error.response.data?.response ||
          error.response.data?.debugMessage ||
          error.response.data?.message ||
          'Transaction failed.';

        setError(backendMessage);
      } else {
        setError(error.message || 'Transaction process failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (mode) => {
    if (mode === 'other-banks') {
      navigate('/scan');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-6 mt-20">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h1 className="text-center md:text-4xl font-extrabold text-lightBlue">Scan to Pay</h1>
              <br />
              <hr className="border-t border-lightBlue" />
              <br />

              {/* Transfer Mode Toggle */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative h-10 bg-gray-200 rounded-full flex items-center p-1 w-64 overflow-hidden shadow-inner">
                  <button
                    className={`flex-1 h-8 rounded-full text-sm flex items-center justify-center transition-all duration-300 z-10 ${
                      false ? 'text-gray-700' : 'text-lightBlue font-medium'
                    }`}
                    onClick={() => handleToggle('other-banks')}
                  >
                    Other Banks
                  </button>
                  <button
                    className={`flex-1 h-8 rounded-full text-sm flex items-center justify-center transition-all duration-300 z-10 ${
                      true ? 'text-white font-medium' : 'text-lightBlue'
                    }`}
                  >
                    Payina to Payina
                  </button>
                  {/* Sliding background */}
                  <div className="absolute h-8 w-1/2 right-1 bg-lightBlue rounded-full transition-all duration-300"></div>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
              {success && <div className="text-green-500 text-sm mb-4 text-center">{success}</div>}

              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 px-4 text-center whitespace-nowrap ${
                    activeTab === 'generate' ? 'bg-lightBlue text-white' : 'bg-gray-200 text-lightBlue'
                  }`}
                  onClick={() => setActiveTab('generate')}>
                  Generate QR Code
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === 'scan' ? 'bg-lightBlue text-white' : 'bg-gray-200 text-lightBlue'
                  }`}
                  onClick={() => setActiveTab('scan')}>
                  Scan QR Code
                </button>
              </div>

              {activeTab === 'generate' && (
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <CustomButton onClick={generateQR} disabled={loading} className="w-full whitespace-nowrap" variant="default">
                    {loading ? 'Generating...' : 'Generate QR Code'}
                  </CustomButton>

                  {qrCodeData && (
                    <div className="mt-4 flex flex-col items-center">
                      <QRCodeSVG id="qr-code" value={qrCodeData} size={200} />
                      <p className="text-sm text-gray-600 mt-2">Share this QR code with the sender</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Amount: ₦{parseFloat(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </p>
                      <CustomButton
                        onClick={downloadQR}
                        className="mt-2"
                        variant="outline"
                      >
                        Download QR Code
                      </CustomButton>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'scan' && (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <CustomButton
                      onClick={() => {
                        setIsScanning(!isScanning);
                        if (!isScanning) {
                          setScanResult(null);
                          setSuccess('');
                        }
                      }}
                      className="flex-1"
                      variant="default">
                      {isScanning ? 'Stop Scanning' : 'Start Scanning'}
                    </CustomButton>
                    <CustomButton
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 whitespace-nowrap"
                      variant="outline">
                      Upload QR Code
                    </CustomButton>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {isScanning && (
                    <div className="w-full aspect-square">
                      <QrReader
                        constraints={{ facingMode: 'environment' }}
                        onResult={(result) => {
                          if (result) {
                            try {
                              const parsedData = JSON.parse(result.text);
                              if (parsedData.destinationId && parsedData.amount) {
                                setIsScanning(false);
                                setScanResult(result.text);
                              } else {
                                throw new Error('Invalid QR code format');
                              }
                            } catch (error) {
                              setError('Invalid QR code format');
                            }
                          }
                        }}
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {scanResult && (
                    <div className="mt-4 space-y-4">
                      <div className="bg-gray-100 p-3 rounded-md">
                        <h3 className="font-medium mb-2">Transaction Details</h3>
                        {(() => {
                          try {
                            const data = JSON.parse(scanResult);
                            return (
                              <>
                                <p className="text-sm">Receiver: {data.receiverName}</p>
                                <p className="text-sm">
                                  Amount: ₦
                                  {parseFloat(data.amount).toLocaleString('en-NG', {
                                    minimumFractionDigits: 2,
                                  })}
                                </p>
                                {data.description && (
                                  <p className="text-sm">Description: {data.description}</p>
                                )}
                              </>
                            );
                          } catch {
                            return <p className="text-sm text-red-500">Invalid QR data</p>;
                          }
                        })()}
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Enter Transaction PIN</h3>
                        <div className="flex justify-between space-x-2">
                          {pin.map((digit, index) => (
                            <input
                              key={index}
                              id={`pin-${index}`}
                              type="password"
                              maxLength="1"
                              value={digit}
                              onChange={(e) => handlePinInput(e.target.value, index)}
                              className="w-12 h-12 text-center border rounded-md"
                            />
                          ))}
                        </div>
                      </div>

                      <CustomButton
                        onClick={processPayment}
                        disabled={loading || pin.join('').length !== 4}
                        className="w-full"
                        variant="default">
                        {loading ? 'Processing...' : 'Complete Payment'}
                      </CustomButton>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayinaQRTransfer;