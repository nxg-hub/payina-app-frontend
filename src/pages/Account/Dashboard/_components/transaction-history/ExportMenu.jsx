import React from 'react';
import { Download } from 'lucide-react';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';

export const ExportMenu = ({
                             showExportMenu,
                             setShowExportMenu,
                             transactions,
                             selectedRows,
                             showAllFields,
                             closeOtherMenus,
                             formatCurrency,
                             filters,
                             dateRange,
                           }) => {
  const columns = [
    { header: 'Type', key: 'type' },
    { header: 'Description', key: 'description' },
    { header: 'Reference', key: 'transactionRef' },
    { header: 'Status', key: 'status' },
    { header: 'Amount', key: 'amount' },
    { header: 'Date', key: 'createdAt' },
    ...(showAllFields
      ? [
        { header: 'ID', key: 'id' },
        { header: 'Previous Balance', key: 'previousBalance' },
        { header: 'New Balance', key: 'newBalance' },
      ]
      : []),
  ];

  const getExportData = () => {
    let exportData = [];
    const headers = columns.map((col) => col.header);
    exportData.push(headers);

    if (Array.isArray(transactions) && transactions.length > 0) {
      const tableData = selectedRows.length > 0
        ? transactions.filter((t) => selectedRows.includes(t.id))
        : transactions;

      const rows = tableData.map((transaction) =>
        columns.map((col) => {
          const value = transaction[col.key];
          if (['amount', 'previousBalance', 'newBalance'].includes(col.key)) {
            return value ? formatCurrency(value) : '';
          }
          if (col.key === 'createdAt') {
            return value ? new Date(value).toLocaleString() : '';
          }
          return value || '';
        })
      );

      exportData = [...exportData, ...rows];
    } else {
      exportData.push(new Array(columns.length).fill('No Data Available'));
    }

    return exportData;
  };

  const addFilterInfo = (doc) => {
    let yPos = 30;
    doc.setFontSize(10);

    // Add date range if available
    if (dateRange?.startDate && dateRange?.endDate) {
      doc.text(`Date Range: ${dateRange.startDate} to ${dateRange.endDate}`, 14, yPos);
      yPos += 7;
    }

    // Add active filters if available
    if (filters && Object.keys(filters).length > 0) {
      doc.text('Applied Filters:', 14, yPos);
      yPos += 7;
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          doc.text(`${key}: ${value}`, 20, yPos);
          yPos += 7;
        }
      });
    }

    return yPos + 10;
  };

  const exportToPDF = () => {
    try {
      // Initialize jsPDF with standard options
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const exportData = getExportData();

      // Add title
      doc.setFontSize(16);
      doc.text('Transaction Report', 14, 20);

      // Add filters information
      const startY = addFilterInfo(doc);

      // Add table using autoTable plugin
      doc.autoTable({
        startY,
        head: [exportData[0]],
        body: exportData.slice(1),
        theme: 'grid',
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [71, 85, 105],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold',
        },
        didDrawPage: (data) => {
          // Add page numbers
          doc.setFontSize(8);
          doc.text(
            `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: 'center' }
          );
        },
      });

      // Save the PDF
      doc.save('transactions.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      // You might want to add error handling here, such as showing a toast notification
    }
  };

  const exportToExcel = () => {
    try {
      const exportData = getExportData();
      const ws = utils.aoa_to_sheet(exportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Transactions');
      writeFile(wb, 'transactions.xlsx');
    } catch (error) {
      console.error('Error generating Excel:', error);
      // You might want to add error handling here
    }
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowExportMenu(!showExportMenu);
          closeOtherMenus();
        }}
        className="p-2 hover:bg-gray-100 rounded-full">
        <Download className="w-5 h-5 text-gray-600" />
      </button>

      {showExportMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <button
            onClick={() => {
              exportToPDF();
              setShowExportMenu(false);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg">
            Export to PDF
          </button>
          <button
            onClick={() => {
              exportToExcel();
              setShowExportMenu(false);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-b-lg">
            Export to Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;