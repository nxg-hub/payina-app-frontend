import React, { useEffect, useState, useContext } from 'react';
import { CorporateCustomerContext } from '../contexts/CorporateCustomerContext';

const Thirdsection = ({ clientId, clientName, showFiltered, filteredInvoices }) => {
  const [invoices, setInvoices] = useState([]);
  const { corporateCustomerId } = useContext(CorporateCustomerContext);
  const [loading, setLoading] = useState(false);
  const [recentInvoices, setRecentInvoicesLocal] = useState([]);
  const [isMarkingAsPaid, setIsMarkingAsPaid] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchInvoices = async () => {
      try {
        let response;
        let invoices = [];
        if (clientId) {
          // Fetch invoices for a specific client
          response = await fetch(
            `${import.meta.env.VITE_GET_CLIENTS_INVOICES_ENDPOINT}${clientId}/get-invoices`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log('Client Invoices Response:', data);

            invoices = Array.isArray(data) ? data : [data];
          } else {
            console.error('Error:', response.status, response.statusText);
            return;
          }
        } else if (corporateCustomerId) {
          // Fetch recent invoices for a corporate customer
          response = await fetch(
            `${import.meta.env.VITE_GET_CUSTOMERS_INVOICES_ENDPOINT}${corporateCustomerId}?page=0&size=10`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log('Corporate Customer Invoices Response:', data);

            invoices = Array.isArray(data.content) ? data.content : [];
          } else {
            console.error('Error:', response.status, response.statusText);
            return;
          }
        }

        setInvoices(invoices);

        // Set recent invoices if fetching for a corporate customer
        if (!clientId && corporateCustomerId) {
          setRecentInvoicesLocal(invoices.slice(-4));
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [clientId, corporateCustomerId]);

  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray)) return 'N/A';
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const displayedInvoices = clientId
    ? showFiltered
      ? filteredInvoices
      : invoices
    : recentInvoices;
  const handleMarkAsPaid = async (invoiceId) => {
    setIsMarkingAsPaid(invoiceId);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_MARK_AS_PAID_ENDPOINT}${invoiceId}/mark-as-paid`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ invoiceId }),
        }
      );

      if (response.ok) {
        setInvoices((prevInvoices) =>
          prevInvoices.map((invoice) =>
            invoice.id === invoiceId ? { ...invoice, paymentStatus: 'PAID' } : invoice
          )
        );
      } else {
        console.error('Failed to mark invoice as paid:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
    } finally {
      setIsMarkingAsPaid(null);
    }
  };
  const handleClickedInvoice = (invoice) => {
    const formatDateString = (dateString) => {
      if (typeof dateString === 'string' && dateString.length === 8) {
        return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`;
      }
      return dateString || 'N/A';
    };

    const updatedLineItems = invoice.lineItems.map((item) => ({
      itemName: item.name,
      quantity: item.quantity,
      amount: item.amount,
      total: item.amount * item.quantity * 1.075, // Calculate total with vat
    }));

    const newItem = {
      invoiceNumber: invoice.invoiceNumber,
      dateOfIssue: formatDate(invoice.dateOfIssue),
      due_date: formatDate(invoice.due_date),
      lineItems: updatedLineItems,
      tax: 0.075,
      totalAmount: invoice.totalAmount,
      description: invoice.description,
    };

    setSelectedInvoice(newItem);
  };
  // console.log(displayedInvoices);
  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px]">
      <div className="font-bold py-2 text-sm md:text-[18px]">Customer Invoices</div>

      {loading ? (
        <div className="flex justify-center items-center py-4">
          <p className="text-gray-500 text-sm md:text-base">Loading invoices...</p>
        </div>
      ) : selectedInvoice ? (
        // Preview Section
        <div className="p-6 border border-gray-300 rounded-md">
          <h2 className="text-xl font-bold mb-4">
            {' '}
            {`Invoice preview for Invoice #${selectedInvoice.invoiceNumber}`}
          </h2>
          <p>
            <strong>Issue Date:</strong> {selectedInvoice.dateOfIssue}
          </p>
          <p>
            <strong>Due Date:</strong> {selectedInvoice.due_date}
          </p>
          <section className="mt-4">
            <table className="w-full table-auto border-collapse border border-black">
              <thead>
                <tr>
                  <th className="text-left p-2 border border-black">Items</th>
                  <th className="text-left p-2 border border-black">Description</th>

                  <th className="text-left p-2 border border-black">Quantity</th>
                  <th className="text-left p-2 border border-black">Amount</th>
                  <th className="text-left p-2 border border-black">VAT</th>
                  <th className="text-left p-2 border border-black">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice?.lineItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border-r border-black">{item.itemName}</td>
                    <td className="p-2 border-r border-black">{selectedInvoice.description}</td>

                    <td className="p-2 border-r border-black">{item.quantity}</td>
                    <td className="p-2 border-r border-black">{item.amount}</td>
                    <td className="p-2 border-r border-black">0.075</td>
                    <td className="p-2">{item.total}</td>
                  </tr>
                ))}
                <tr className="font-bold border border-black">
                  <td colSpan="4" className="p-2 border-black">
                    Total Amount:
                  </td>
                  <td className="p-2">{selectedInvoice.totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <button
            onClick={() => setSelectedInvoice(null)} // Clear selection to go back
            className="mt-4 bg-[#126180] text-white py-2 px-4 rounded">
            Back to Invoices
          </button>
        </div>
      ) : (
        <>
          {/* Column headers */}
          <div className="grid grid-cols-7 gap-4 w-full sm:w-auto border-b border-t border-[#D9D9D9] py-2">
            <div className="flex items-center justify-start pl-5">
              <p className="text-[7.5px] md:text-base">Client Name</p>
            </div>
            <div className="flex items-center justify-start">
              <span className="font-medium text-[7.5px] md:text-base">Invoice Number</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="font-medium text-[7.5px] md:text-base">Created Date</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="text-[7.5px] md:text-base">Due Date</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="text-[7.5px] md:text-base">Status</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="text-[7.5px] md:text-base">Amount</span>
            </div>
            <div className="flex items-center justify-start">
              <span className="text-[7.5px] md:text-base">Mark as Paid</span>
            </div>
          </div>

          {/* Invoices */}
          {displayedInvoices.length === 0 ? (
            <div className="text-center mt-2">
              {`${clientName === 'Select Client' || clientName === 'Recent Invoices' ? ' Add and select a client to view invoice' : 'No Invoice for the selected client'}`}
            </div>
          ) : (
            displayedInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-7 gap-4 w-full sm:w-auto border-b border-[#D9D9D9] py-4">
                <div className="flex items-center justify-start pl-5">
                  <p
                    className="text-[7px] md:text-base font-medium text-blue-400  hover:text-blue-800 hover:underline-offset-2 cursor-pointer"
                    onClick={() => handleClickedInvoice(invoice)}>
                    {`${invoice.corporateCustomerClient?.firstName || ''} ${invoice.corporateCustomerClient?.lastName || ''}`.trim() ||
                      'No customer'}{' '}
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  <span className="font-medium text-[7px] md:text-base">
                    {`invoice #${invoice.invoiceNumber}`}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="font-medium text-[7px] md:text-base">
                    {/* {formatDate(invoice.dateOfIssue)} */}
                    {invoice.dateOfIssue}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-[7px] md:text-base">
                    {/* {formatDate(invoice.due_date)} */}
                    {invoice.due_date}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span
                    className={`border text-[5px] md:text-base py-2 md:py-2 px-6 md:px-6 ${
                      invoice.paymentStatus === 'PAID'
                        ? 'border-[#28a745] text-[#28a745]'
                        : 'border-[#FF0000] text-[#FF0000]'
                    }`}>
                    {invoice.paymentStatus}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-[7px] md:text-base">{invoice.totalAmount}</span>
                </div>
                <div className="flex items-center justify-start">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={invoice.paymentStatus === 'PAID'}
                      onChange={() => handleMarkAsPaid(invoice.id)}
                      disabled={invoice.paymentStatus === 'PAID'}
                    />
                    <div
                      className={`w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer-checked:bg-[#A9A9A9] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-bg-[#A9A9A9] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:border-white ${
                        invoice.paymentStatus === 'PAID'
                          ? 'cursor-not-allowed  bg-[#A9A9A9]'
                          : 'cursor-pointer'
                      }`}></div>
                  </label>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Thirdsection;
