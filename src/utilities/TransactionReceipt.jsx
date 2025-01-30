import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/images/payina_real-logo-crop.jpg';

const TransactionReceipt = ({ receiptData, onClose }) => {
  const [logoBase64, setLogoBase64] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const convertLogoToBase64 = async () => {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoBase64(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error loading logo:', error);
      }
    };

    convertLogoToBase64();
  }, []);

  // Data validation check
  if (!receiptData) {
    return (
      <div className="relative bg-white rounded-lg w-full max-w-xl mx-auto shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center">
          <p className="text-red-500 font-medium">Error: Receipt data is missing</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Close
          </button>
        </div>
      </div>
    );
  }

  // const formatDate = (dateArray) => {
  //   if (!Array.isArray(dateArray)) return 'Invalid Date';
  //   try {
  //     const date = new Date(...dateArray);
  //     return date.toLocaleString('en-US', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: '2-digit',
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit',
  //       hour12: true
  //     });
  //   } catch (error) {
  //     console.error('Error formatting date:', error);
  //     return 'Invalid Date';
  //   }
  // };

  const formatCurrency = (amount) => {
    if (!amount) return '₦0.00';
    return `₦${Number(amount).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleSaveAsPDF = async () => {
    try {
      setIsDownloading(true);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [110, 227], // Standard receipt size
      });

      // Add custom font for Naira symbol support
      doc.addFont(
        'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf',
        'Roboto',
        'normal'
      );
      doc.setFont('Roboto');

      // Initial y position
      let yPos = 20;

      // Add logo if available
      if (logoBase64) {
        try {
          doc.addImage(logoBase64, 'JPEG', doc.internal.pageSize.width / 2 - 20, yPos, 40, 40);
          yPos += 45;
        } catch (error) {
          console.error('Error adding logo to PDF:', error);
          yPos += 5;
        }
      }

      // Add title
      doc.setFontSize(20);
      doc.setTextColor(44, 62, 80);
      doc.text('Transaction Receipt', doc.internal.pageSize.width / 2, yPos, { align: 'center' });

      // Add amount and status
      yPos += 15;
      doc.setFontSize(24);
      doc.text(formatCurrency(receiptData.amount), doc.internal.pageSize.width / 2, yPos, {
        align: 'center',
      });

      yPos += 10;
      doc.setFontSize(16);
      doc.text('Successful Transaction', doc.internal.pageSize.width / 2, yPos, {
        align: 'center',
      });

      // Add transaction details
      yPos += 15;
      doc.autoTable({
        startY: yPos,
        theme: 'plain',
        styles: {
          fontSize: 10,
          cellPadding: 5,
          font: 'Roboto',
        },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 40 },
          1: { cellWidth: 'auto' },
        },
        body: [
          ['Date', formatDate(receiptData.transactionDate)],
          ['Recipient', receiptData.beneficiaryName || 'N/A'],
          ['Sender', receiptData.email || 'N/A'],
          ['Description', receiptData.description || 'N/A'],
          ['Reference', receiptData.transactionRef || 'N/A'],
        ],
      });

      // Add footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Thank you for using Payina', doc.internal.pageSize.width / 2, pageHeight - 5, {
        align: 'center',
      });

      // Generate filename with transaction reference
      const filename = `receipt-${receiptData.transactionRef || 'transaction'}.pdf`;

      // Save the PDF
      doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF receipt. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Receipt data field definitions
  const receiptFields = [
    { label: 'Recipient', key: 'beneficiaryName' },
    { label: 'Sender', key: 'email' },
    { label: 'Description', key: 'description' },
    { label: 'Reference', key: 'transactionRef' },
  ];
  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) return 'Invalid Date';

    const [year, month, day, hour, minute, second] = dateArray;

    // Create a Date object
    const date = new Date(year, month - 1, day, hour, minute, second);

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };



  return (
    <div className="relative bg-white rounded-lg w-full max-w-xl mx-auto shadow-xl">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1">
        <X className="w-6 h-6" />
      </button>

      <div className="p-6 space-y-4">
        {/* Header with Logo and Amount */}
        <div className="flex justify-between items-center border-b pb-4">
          {logo && (
            <div className="flex-shrink-0">
              <img src={logo} alt="Payina Logo" className="h-12 w-auto" />
            </div>
          )}

          <div className="text-right space-y-2">
            <h2 className="text-4xl font-bold text-lightBlue">
              {formatCurrency(receiptData.amount)}
            </h2>
            <p className="text-xl font-semibold text-gray-800">Successful Transaction</p>
            {/*<p className="text-gray-500">*/}
            {/*  {formatDate(receiptData.transactionDate)}*/}
            {/*</p>*/}

            <p className="text-gray-500">{formatDate(receiptData.transactionDate)}</p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3">
          {receiptFields.map(({ label, key }) => (
            <div key={key} className="flex justify-between items-center py-1">
              <span className="text-gray-600">{label}:</span>
              <span className="font-semibold text-gray-900">{receiptData[key] || 'N/A'}</span>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="pt-4 border-t">
          <button
            onClick={handleSaveAsPDF}
            disabled={isDownloading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-lightBlue text-white rounded-lg transition-colors
              ${isDownloading ? 'bg-opacity-75 cursor-not-allowed' : 'hover:bg-lightBlueDark'}
            `}>
            <Download className="w-5 h-5" />
            <span>{isDownloading ? 'Generating PDF...' : 'Download Receipt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionReceipt;
