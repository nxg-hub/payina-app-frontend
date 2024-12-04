import React, { useEffect, useState, useContext } from 'react';
import box from './../../../../assets/images/invoicebox.png';
import { CorporateCustomerContext } from '../contexts/CorporateCustomerContext';

const Thirdsection = ({ clientId, clientName, showFiltered, filteredInvoices }) => {
  const [invoices, setInvoices] = useState([]); // To store the invoices
  const { corporateCustomerId } = useContext(CorporateCustomerContext); // Get corporate customer ID from context
  const [loading, setLoading] = useState(false); // To show the loading state
  const [recentInvoices, setRecentInvoicesLocal] = useState([]);

  // Fetch invoices based on clientId or corporateCustomerId
  useEffect(() => {
    setLoading(true);

    const fetchInvoices = async () => {
      try {
        let response;

        // If a clientId is passed, fetch client invoices
        if (clientId) {
          response = await fetch(`${import.meta.env.VITE_GET_CLIENTS_INVOICES_ENDPOINT}${clientId}/get-invoices`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } 
        // If no clientId, fetch recent invoices using corporateCustomerId
        else if (corporateCustomerId) {
          response = await fetch(`${import.meta.env.VITE_GET_CUSTOMERS_INVOICES_ENDPOINT}${corporateCustomerId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }

        if (!response.ok) {
          console.error('Error:', response.status, response.statusText);
          return;
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const data = await response.json();
        // console.log('Invoices:', data);
        setInvoices(data); 
        // If no clientId is provided, display recent invoices for corporate customer
        if (!clientId) {
          setRecentInvoicesLocal(data.slice(0, 4)); 
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchInvoices();
  }, [clientId, corporateCustomerId]);

  // Format date for invoice display
  const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray)) return 'N/A';
    const [year, month, day] = dateArray;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Determine which invoices to display
  const displayedInvoices = clientId ? (showFiltered ? filteredInvoices : invoices) : recentInvoices;

  return (
    <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-3 shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px]">
      <div className="font-bold py-2 text-sm md:text-[18px]">Customer Invoices</div>

      {loading ? (
        <div className="flex justify-center items-center py-4">
          <p className="text-gray-500 text-sm md:text-base">Loading invoices...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col border-b border-t border-[#D9D9D9] ">
            <div className="flex items-center justify-between px-1 md:px-6 py-2 md:py-2 md:gap-0 gap-2">
              <div>
                <div className="flex">
                  <p className=" text-[7.5px] md:text-base">Client Name</p>
                </div>
              </div>
              <span className="font-medium text-[7.5px] md:text-base xl:pl-12 md:pl-11 pl-5 sm:pl-4">
                Created Date
              </span>
              <span className=" text-[7.5px] md:text-base sm: md:pl-7 lg:pl-3 xl:pl-12 pl-0 sm:pl-4">
                Due Date <span className="text-primary"></span>
              </span>
              <span className=" text-[7.5px] md:text-base md:pl-8 sm:pl-4">Status</span>
              <span className=" text-[7.5px] md:text-base md:pl-2 ">Amount</span>
              <span className=" text-[7.5px] md:text-base text-primary">...</span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 w-full sm:w-auto">
            {/* Add more rows and data here as needed */}
          </div>

          {displayedInvoices.map((invoice, index) => (
            <div key={invoice.id || index} className="flex flex-col border-b border-[#D9D9D9]">
              <div className="flex items-center justify-between px-2 md:px-6 py-4 md:py-6 md:gap-0 gap-0">
                <div>
                  <div className="flex items-center">
                    <img
                      src={box}
                      alt="Invoice Box"
                      className="h-[70%] md:h-full w-[70%] md:w-full"
                    />
                    <p className="text-[7px] md:text-base">{clientName || 'No customer'}</p>
                  </div>
                  <p className="text-[7px] md:text-base">Invoice# {invoice.invoiceNumber || 'NO no'}</p>
                </div>
                <span className="font-medium text-[7px] md:text-base">
                  {formatDate(invoice.dateOfIssue)}
                </span>
                <span className="text-[7px] md:text-base">{formatDate(invoice.due_date)}</span>
                <span
                  className={`border text-[7px] md:text-base py-2 md:py-2 px-6 md:px-6 ${
                    invoice.status === 'Paid'
                      ? 'border-[#0C4E06] text-[#0C4E06]'
                      : 'border-[#FF0000] text-[#FF0000]'
                  }`}
                >
                  {invoice.status || 'Unpaid'}
                </span>
                <span className="text-[7px] md:text-base">
                  {/* ${calculateTotalAmount(invoice.lineItems)} */}
                  {invoice.totalAmount}
                </span>
                <span className="text-[7px] md:text-base">...</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Thirdsection;
