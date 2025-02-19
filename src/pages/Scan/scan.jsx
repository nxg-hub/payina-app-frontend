// import { useState, useRef } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { QRCodeSVG } from 'qrcode.react';
// import jsQR from 'jsqr';
// import Input from '../../utilities/InputStyle.jsx';
// import CustomButton from '../../components/button/button.jsx';
// import useLocalStorage from '../../hooks/useLocalStorage.js';
// import { Navbar, Sidebar } from '../Account/_components/index.js';
//
// const Scan = () => {
//   const [activeTab, setActiveTab] = useState('generate');
//   const [authToken] = useLocalStorage('authToken', '');
//   const [scanResult, setScanResult] = useState(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [qrCodeData, setQrCodeData] = useState(null);
//   const fileInputRef = useRef(null);
//
//   // const decodeEmailFromToken = (token) => {
//   //   try {
//   //     const decoded = jwtDecode(token);
//   //     return decoded.email || '';
//   //   } catch (error) {
//   //     console.error('Error decoding token:', error);
//   //     return '';
//   //   }
//   // };
//
//   const handleScan = (result) => {
//     if (result) {
//       setScanResult(result.text);
//       setIsScanning(false);
//     }
//   };
//
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext('2d');
//           ctx.drawImage(img, 0, 0, img.width, img.height);
//           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//           const code = jsQR(imageData.data, imageData.width, imageData.height);
//           if (code) {
//             handleScan({ text: code.data });
//           } else {
//             alert('No QR code found in the image');
//           }
//         };
//         img.src = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   const initializePayment = async () => {
//     if (!amount) {
//       alert('Please enter an amount');
//       return;
//     }
//
//     setLoading(true);
//     try {
//       const email = authToken.sub;
//       // const email = decodeEmailFromToken(authToken);
//       const payload = {
//         order: {
//           customerEmail: email,
//           amount: Number.parseFloat(amount),
//         },
//         tokenizeCard: true,
//       };
//
//       const response = await fetch(import.meta.env.VITE_INITIALIZE_PAYMENT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//
//       const data = await response.json();
//
//       if (data.success && data.checkoutLink) {
//         setQrCodeData(data.checkoutLink);
//       } else {
//         alert('Failed to initialize payment');
//       }
//     } catch (error) {
//       console.error('Error initializing payment:', error);
//       alert('Failed to initialize payment');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar />
//
//         <div className="flex h-screen bg-gray-100 mt-28">
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//               <h1 className="text-center md:text-4xl font-extrabold text-lightBlue">Scan to Pay</h1>
//               <br />
//               <hr className="border-t border-lightBlue" />
//               <br />
//               <div className="flex mb-4">
//                 <button
//                   className={`flex-1 py-2 px-4 text-center ${
//                     activeTab === 'scan' ? 'bg-lightBlue text-white' : 'bg-gray-200 text-lightBlue'
//                   }`}
//                   onClick={() => setActiveTab('scan')}>
//                   Scan QR Code
//                 </button>
//                 <button
//                   className={`flex-1 py-2 px-4 text-center ${
//                     activeTab === 'generate'
//                       ? 'bg-lightBlue whitespace-nowrap text-white'
//                       : 'bg-gray-200 text-lightBlue'
//                   }`}
//                   onClick={() => setActiveTab('generate')}>
//                   Generate QR Code
//                 </button>
//               </div>
//
//               {activeTab === 'generate' && (
//                 <div className="space-y-4">
//                   <Input
//                     // type="number"
//                     placeholder="Enter amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     className="w-full p-2 border rounded"
//                   />
//                   <CustomButton
//                     onClick={initializePayment}
//                     className="w-full"
//                     disabled={loading}
//                     variant="default" href="/scan/payina-to-payina">
//                     {loading ? 'Processing...' : 'Payina to Payina'}
//                   </CustomButton>
//                   <CustomButton
//                     onClick={initializePayment}
//                     className="w-full"
//                     disabled={loading}
//                     variant="default">
//                     {loading ? 'Processing...' : 'Generate Now'}
//                   </CustomButton>
//                   {qrCodeData && (
//                     <div className="flex flex-col items-center space-y-4">
//                       <QRCodeSVG id="qr-code" value={qrCodeData} size={200} />
//                       <p className="text-sm text-gray-600 mt-2">
//                         Scan this QR code to complete the payment
//                       </p>
//                       <CustomButton
//                         onClick={() => {
//                           const svg = document.getElementById('qr-code');
//                           const svgData = new XMLSerializer().serializeToString(svg);
//                           const canvas = document.createElement('canvas');
//                           const ctx = canvas.getContext('2d');
//                           const img = new Image();
//                           img.onload = () => {
//                             canvas.width = img.width;
//                             canvas.height = img.height;
//                             ctx.drawImage(img, 0, 0);
//                             const pngFile = canvas.toDataURL('image/png');
//                             const downloadLink = document.createElement('a');
//                             downloadLink.download = 'qrcode.png';
//                             downloadLink.href = pngFile;
//                             downloadLink.click();
//                           };
//                           img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
//                         }}
//                         className="w-full mt-4"
//                         variant="outline">
//                         Download QR Code
//                       </CustomButton>
//                     </div>
//                   )}
//                 </div>
//               )}
//
//               {activeTab === 'scan' && (
//                 <div className="space-y-4">
//                   <CustomButton
//                     onClick={() => setIsScanning(!isScanning)}
//                     className="w-full"
//                     variant="default">
//                     {isScanning ? 'Stop Scanning' : 'Start Scanning'}
//                   </CustomButton>
//                   <CustomButton
//                     onClick={() => fileInputRef.current.click()}
//                     className="w-full"
//                     variant="outline">
//                     Upload QR Code Image
//                   </CustomButton>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileUpload}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                   {isScanning && (
//                     <div className="w-full aspect-square">
//                       <QrReader
//                         constraints={{ facingMode: 'environment' }}
//                         onResult={handleScan}
//                         className="w-full h-full"
//                       />
//                     </div>
//                   )}
//                   {scanResult && (
//                     <div className="mt-4 p-4 bg-gray-100 rounded">
//                       <h3 className="font-semibold mb-2">Scan Result:</h3>
//                       <p className="break-all">{scanResult}</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Scan;





import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { QRCodeSVG } from 'qrcode.react';
import jsQR from 'jsqr';
import Input from '../../utilities/InputStyle.jsx';
import CustomButton from '../../components/button/button.jsx';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { Navbar, Sidebar } from '../Account/_components/index.js';

const Scan = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [authToken] = useLocalStorage('authToken', '');
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result) {
      setScanResult(result.text);
      setIsScanning(false);
    }
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
            handleScan({ text: code.data });
          } else {
            alert('No QR code found in the image');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const initializePayment = async () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    setLoading(true);
    try {
      const email = authToken.sub;
      const payload = {
        order: {
          customerEmail: email,
          amount: Number.parseFloat(amount),
        },
        tokenizeCard: true,
      };

      const response = await fetch(import.meta.env.VITE_INITIALIZE_PAYMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success && data.checkoutLink) {
        setQrCodeData(data.checkoutLink);
      } else {
        alert('Failed to initialize payment');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert('Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (mode) => {
    if (mode === 'payina-to-payina') {
      navigate('/scan/payina-to-payina');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <div className="flex h-screen bg-gray-100 mt-28">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-center md:text-4xl font-extrabold text-lightBlue">Scan to Pay</h1>
              <br />
              <hr className="border-t border-lightBlue" />
              <br />

              {/* Beautiful Toggle Switch */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative h-10 bg-gray-200 rounded-full flex items-center p-1 w-64 overflow-hidden shadow-inner">
                  <button
                    className={`flex-1 h-8 rounded-full text-sm flex items-center justify-center transition-all duration-300 z-10 ${
                      true ? 'text-white font-medium' : 'text-gray-700'
                    }`}
                  >
                    Other Banks
                  </button>
                  <button
                    className={`flex-1 h-8 rounded-full text-sm flex items-center justify-center transition-all duration-300 z-10 ${
                      false ? 'text-white font-medium' : 'text-gray-700'
                    }`}
                    onClick={() => handleToggle('payina-to-payina')}
                  >
                    Payina to Payina
                  </button>
                  {/* Sliding background */}
                  <div className="absolute h-8 w-1/2 left-1 bg-lightBlue rounded-full transition-all duration-300"></div>
                </div>
              </div>

              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === 'scan' ? 'bg-lightBlue text-white' : 'bg-gray-200 text-lightBlue'
                  }`}
                  onClick={() => setActiveTab('scan')}>
                  Scan QR Code
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center ${
                    activeTab === 'generate'
                      ? 'bg-lightBlue whitespace-nowrap text-white'
                      : 'bg-gray-200 text-lightBlue'
                  }`}
                  onClick={() => setActiveTab('generate')}>
                  Generate QR Code
                </button>
              </div>

              {activeTab === 'generate' && (
                <div className="space-y-4">
                  <Input
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <CustomButton
                    onClick={initializePayment}
                    className="w-full"
                    disabled={loading}
                    variant="default">
                    {loading ? 'Processing...' : 'Generate Now'}
                  </CustomButton>
                  {qrCodeData && (
                    <div className="flex flex-col items-center space-y-4">
                      <QRCodeSVG id="qr-code" value={qrCodeData} size={200} />
                      <p className="text-sm text-gray-600 mt-2">
                        Scan this QR code to complete the payment
                      </p>
                      <CustomButton
                        onClick={() => {
                          const svg = document.getElementById('qr-code');
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
                            downloadLink.download = 'qrcode.png';
                            downloadLink.href = pngFile;
                            downloadLink.click();
                          };
                          img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                        }}
                        className="w-full mt-4"
                        variant="outline">
                        Download QR Code
                      </CustomButton>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'scan' && (
                <div className="space-y-4">
                  <CustomButton
                    onClick={() => setIsScanning(!isScanning)}
                    className="w-full"
                    variant="default">
                    {isScanning ? 'Stop Scanning' : 'Start Scanning'}
                  </CustomButton>
                  <CustomButton
                    onClick={() => fileInputRef.current.click()}
                    className="w-full"
                    variant="outline">
                    Upload QR Code Image
                  </CustomButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {isScanning && (
                    <div className="w-full aspect-square">
                      <QrReader
                        constraints={{ facingMode: 'environment' }}
                        onResult={handleScan}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                  {scanResult && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                      <h3 className="font-semibold mb-2">Scan Result:</h3>
                      <p className="break-all">{scanResult}</p>
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

export default Scan;