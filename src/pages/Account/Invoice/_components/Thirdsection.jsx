import React, { useEffect, useState, useContext } from 'react';
import { CorporateCustomerContext } from '../contexts/CorporateCustomerContext';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const Thirdsection = ({
  clientId,
  clientName,
  showFiltered,
  filteredInvoices,
  setTotalPages,
  totalPages,
  currentPage,
  setCurrentPage,
  setInvoiceCurrentPage,
  currentInvoicePage,
}) => {
  const [invoices, setInvoices] = useState([]);
  const { corporateCustomerId } = useContext(CorporateCustomerContext);
  const [loading, setLoading] = useState(false);
  const [recentInvoices, setRecentInvoicesLocal] = useState([]);
  const [isMarkingAsPaid, setIsMarkingAsPaid] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const loader = useSelector((state) => state.clients.filterLoader);
  const [pageSize] = useState(5); // Fixed page size of 5

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        let response;
        let invoices = [];

        setLoading(true);
        if (clientId) {
          // Fetch invoices for a specific client
          response = await fetch(
            `${import.meta.env.VITE_GET_CLIENTS_INVOICES_ENDPOINT}${clientId}/get-invoices?page=${currentInvoicePage}&size=${pageSize}`,
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
            setTotalPages(data.totalPages);
          } else {
            console.error('Error:', response.status, response.statusText);
            return;
          }
        } else if (corporateCustomerId) {
          // Fetch recent invoices for a corporate customer
          response = await fetch(
            `${import.meta.env.VITE_GET_CUSTOMERS_INVOICES_ENDPOINT}${corporateCustomerId}?page=0&size=4`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log('Corporate Customer Invoices Response:', data);

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
  }, [clientId, corporateCustomerId, currentInvoicePage]);
  const handlePageChange = (selectedPage) => {
    filteredInvoices?.length > 0
      ? setCurrentPage(selectedPage.selected)
      : setInvoiceCurrentPage(selectedPage.selected);
  };
  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray)) return 'N/A';
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

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
        //call get invoice to update paid state immeditaely
        // response = await fetch(
        //   `${import.meta.env.VITE_GET_CLIENTS_INVOICES_ENDPOINT}${clientId}/get-invoices?page=${currentInvoicePage}&size=${pageSize}`,
        //   {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // );
        // if (response.ok) {
        //   const data = await response.json();
        //   // console.log('Client Invoices Response:', data);

        //   invoices = Array.isArray(data) ? data : [data];
        //   setTotalPages(data.totalPages);
        //   setInvoices(invoices);
        // }
      } else {
        console.error('Failed to mark invoice as paid:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
    } finally {
      setIsMarkingAsPaid(null);
    }
  };
  const displayedInvoices =
    showFiltered && filteredInvoices
      ? filteredInvoices
      : invoices[0]?.content
        ? invoices[0]?.content
        : recentInvoices;
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
      total: item.quantity * item.amount,
      // tax: invoice.amount - item.quantity * item.amount,
    }));
    const newItem = {
      invoiceNumber: invoice.invoiceNumber,
      dateOfIssue: invoice.dateOfIssue,
      due_date: invoice.due_date,
      lineItems: updatedLineItems,
      tax: invoice.tax[0].amount,
      totalAmount: invoice.totalAmount,
      description: invoice.description,
    };

    setSelectedInvoice(newItem);
  };
  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px]">
      <div className="font-bold py-2 text-sm md:text-[18px]">Customer Invoices</div>

      {loading || loader ? (
        <div className="flex justify-center items-center py-4">
          <p className="text-gray-500 text-sm md:text-base">Loading invoices...</p>
        </div>
      ) : selectedInvoice ? (
        // Preview Section
        <div className="p-6 border border-gray-300 rounded-md overflow-y-scroll">
          <h2 className="text-xl font-bold mb-4">
            Invoice Preview
            {/* {`Invoice preview for Invoice #${selectedInvoice.invoiceNumber}`} */}
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
                  {/* <th className="text-left p-2 border border-black">Description</th> */}

                  <th className="text-left p-2 border border-black">Quantity</th>
                  <th className="text-left p-2 border border-black">Amount</th>
                  {/* <th className="text-left p-2 border border-black">VAT</th> */}
                  <th className="text-left p-2 border border-black">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice?.lineItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border-r border-black">{item.itemName}</td>
                    {/* <td className="p-2 border-r border-black">{selectedInvoice.description}</td> */}

                    <td className="p-2 border-r border-black">{item.quantity}</td>
                    <td className="p-2 border-r border-black">{item.amount}</td>

                    <td className="p-2">{item.total}</td>
                  </tr>
                ))}
                <tr className="font-bold border border-black">
                  <td colSpan="3" className="p-2 border-black">
                    VAT:
                  </td>
                  <td className="p-2 border-r border-black">{selectedInvoice.tax}</td>
                </tr>
                <tr className="font-bold border border-black">
                  <td colSpan="3" className="p-2 border-black">
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
          <div className="grid grid-cols-6 gap-4 w-full sm:w-auto border-b border-t border-[#D9D9D9] py-2">
            <div className="flex items-center justify-start pl-5">
              <p className="text-[7.5px] md:text-base">Client Name</p>
            </div>
            {/* <div className="flex items-center justify-start">
              <span className="font-medium text-[7.5px] md:text-base">Invoice Number</span>
            </div> */}
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
          {displayedInvoices.length === 0 || displayedInvoices[0]?.content?.length == 0 ? (
            <div className="text-center mt-2">
              {filteredInvoices?.length === 0
                ? 'No Invoice matches the filter. Adjust filter and try again.'
                : `${clientName === 'Select Client' || clientName === 'Recent Invoices' ? ' Add and select a client to view invoice' : 'No Invoice for the selected client'}`}
            </div>
          ) : (
            displayedInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-6 gap-4 w-full sm:w-auto border-b border-[#D9D9D9] py-4">
                <div className="flex items-center justify-start pl-5">
                  <p
                    className="text-[7px] md:text-base font-medium text-blue-400  hover:text-blue-800 hover:underline-offset-2 cursor-pointer"
                    onClick={() => handleClickedInvoice(invoice)}>
                    {/* {`${invoice.corporateCustomerClient?.firstName || ''} ${invoice.corporateCustomerClient?.lastName || ''}`.trim() ||
                      'No customer'}{' '} */}
                    {invoice.customer}
                  </p>
                </div>
                {/* <div className="flex items-center justify-start">
                  <span className="font-medium text-[7px] md:text-base">
                    {`invoice #${invoice.invoiceNumber}`}
                  </span>
                </div> */}
                <div className="flex items-center justify-start">
                  <span className="font-medium text-[7px] md:text-base">
                    {/* {formatDate(invoice.dateOfIssue)} */}
                    {invoice.dateOfIssue}
                    {/* {invoice.createdDate} */}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-[7px] md:text-base">
                    {/* {formatDate(invoice.due_date)} */}
                    {invoice.due_date}
                    {/* {invoice.dueDate} */}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span
                    className={`border text-[5px] md:text-base py-2 md:py-2 px-6 md:px-6 md:w-[60%] !text-justify ${
                      invoice.paymentStatus === 'PAID'
                        ? 'border-[#28a745] text-[#28a745]'
                        : 'border-[#FF0000] text-[#FF0000]'
                    }`}>
                    {invoice.paymentStatus}
                    {/* {invoice.status} */}
                  </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="text-[7px] md:text-base pl-5 md:pl-0">
                    {invoice.totalAmount}
                    {/* {invoice.amount} */}
                  </span>
                </div>
                <div className="flex items-center justify-start ">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={invoice.paymentStatus === 'PAID'}
                      onChange={() => handleMarkAsPaid(invoice.id)}
                      disabled={invoice.paymentStatus === 'PAID'}
                    />
                    <div
                      className={` w-8 md:w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer-checked:bg-[#A9A9A9] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-bg-[#A9A9A9] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:border-white ${
                        invoice.paymentStatus === 'PAID'
                          ? 'cursor-not-allowed  bg-[#A9A9A9]'
                          : 'cursor-pointer'
                      }`}></div>
                  </label>
                </div>
              </div>
            ))
          )}
          <ReactPaginate
            pageCount={filteredInvoices?.length === 0 ? 0 : totalPages} // Total number of pages
            onPageChange={handlePageChange} // Event for page change
            containerClassName="flex justify-center items-center space-x-2 mt-5"
            pageClassName="cursor-pointer"
            pageLinkClassName="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            previousClassName="cursor-pointer"
            previousLinkClassName="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            nextClassName="cursor-pointer"
            nextLinkClassName="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            activeClassName={'bg-[#00618133] text-black font-bold'}
            disabledClassName="opacity-50 cursor-not-allowed"
            forcePage={showFiltered ? currentPage : currentInvoicePage}
          />
        </>
      )}
    </div>
  );
};

export default Thirdsection;
