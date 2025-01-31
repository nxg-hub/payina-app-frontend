import React, { useState } from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportTransaction = ({ credits, debits }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction Report', 20, 20);

    const transactions = [...credits, ...debits];
    const tableData = transactions.map((transaction) => [
      transaction.type,
      transaction.description,
      transaction.transactionRef,
      transaction.status,
      `₦${transaction.amount.toLocaleString()}`,
      new Date(transaction.createdAt).toLocaleString(),
    ]);

    doc.autoTable({
      startY: 30,
      head: [['Type', 'Description', 'Reference', 'Status', 'Amount', 'Date']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [71, 85, 105],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 10,
      },
      margin: { horizontal: 10 },
    });

    doc.save('transactions.pdf');
  };

  const handleDownloadExcel = () => {
    const transactions = [...credits, ...debits];
    const data = transactions.map((transaction) => ({
      Type: transaction.type,
      Description: transaction.description,
      Reference: transaction.transactionRef,
      Status: transaction.status,
      Amount: `₦${transaction.amount.toLocaleString()}`,
      Date: new Date(transaction.createdAt).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, 'transactions.xlsx');
  };

  return (
    <div className="relative">
      <Download
        className="w-5 h-5 text-gray-600 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <button
            onClick={handleDownloadPDF}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg">
            Download as PDF
          </button>
          <button
            onClick={handleDownloadExcel}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg">
            Download as Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportTransaction;
