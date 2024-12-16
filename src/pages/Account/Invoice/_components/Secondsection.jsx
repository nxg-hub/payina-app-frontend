// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import notes from './../../../../assets/images/notesbook.png';
import { CorporateCustomerContext } from '../contexts/CorporateCustomerContext';



const Secondsection = ({ next }) => {
  const { corporateCustomerId } = useContext(CorporateCustomerContext);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [loadingCustomers, setLoadingCustomers] = useState(false); 
  const [loadingInvoices, setLoadingInvoices] = useState(false); 
  const [paidCount, setPaidCount] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [loadingPaymentStatus, setLoadingPaymentStatus] = useState(false);
  
   
    const fetchTotalCustomers = async () => {
      setLoadingCustomers(true); 

      try {
        const response = await fetch(`${import.meta.env.VITE_GET_CLIENTS_ENDPOINT}${corporateCustomerId}/get-clients`);
        if (response.ok) {
          const data = await response.json();
          setTotalCustomers(data.length); 
        } else {
          console.error('Failed to fetch total customers');
        }
      } catch (error) {
        console.error('Error fetching total customers:', error);
      }finally {
        setLoadingCustomers(false); 
      }
    };
    

    const fetchTotalInvoices = async () => {
      setLoadingInvoices(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_GET_CUSTOMERS_INVOICE_COUNT_ENDPOINT}?corporateCustomerId=${corporateCustomerId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.ok) {
          const totalInvoices = await response.json(); 
          setTotalInvoices(totalInvoices);
        } else {
          console.error('Failed to fetch total invoices:', response.status);
        }
      } catch (error) {
        console.error('Error fetching total invoices:', error);
      } finally {
        setLoadingInvoices(false);
      }
    };

    const fetchPaymentStatus = async () => {
      setLoadingPaymentStatus(true);
      try {
        const response = await fetch (
          `${import.meta.env.VITE_PAYMENT_STATUS_COUNT_ENDPOINT}?corporateCustomerId=${corporateCustomerId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch payment status counts');
        }
        const data = await response.json();
        const paymentStatusCounts = data.reduce(
          (acc, item) => ({
            ...acc,
            [item.paymentStatus]: item.count,
          }),
          {}
        );

        setPaidCount(paymentStatusCounts.PAID);
        setUnpaidCount(paymentStatusCounts.UNPAID);
      } catch (error) {
        console.error ('Error fetching payment status: error');
      } finally{
        setLoadingPaymentStatus(false);
      }
 };
    
    

    useEffect(() => {
      if (corporateCustomerId) {
        fetchTotalCustomers();
        fetchTotalInvoices();
        fetchPaymentStatus();
      }
    }, [corporateCustomerId]); 

  return (
    
    <div>
      <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center">
            <div className="grid place-content-center">
              <img src={notes} alt="" />
            </div>
            <p className="text-center md:text-[18px] font-bold">Total Customers</p>
            
            <p className="text-center md:text-[18px] font-bold">
              {loadingCustomers ? 'Loading Customers...' : totalCustomers}
            </p>
           </div>
          <div className="shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center">
            <div className="grid place-content-center">
              <img src={notes} alt="" />
            </div>
            <p className="text-center md:text-[18px] font-bold">Invoices Generated</p>
            
            <p className="text-center md:text-[18px] font-bold">
              {loadingInvoices ? 'Loading Invoices...' : totalInvoices}
            </p>          </div>
          <div className="shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center">
            <div className="grid place-content-center">
              <img src={notes} alt="" />
            </div>
            <p className="text-center md:text-[18px] font-bold">Paid Invoices</p>
            {loadingPaymentStatus ? (
            <p className="text-center md:text-[18px] font-bold">Loading...</p>
            ) : (
            <p className="text-center md:text-[18px] font-bold">{paidCount}</p>
            )}
          </div>
          <div className="shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-6 px-3 rounded-md md:h-[200px] grid place-content-center">
            <div className="grid place-content-center">
              <img src={notes} alt="" />
            </div>
            <p className="text-center md:text-[18px] font-bold">Unpaid Invoices</p>
            {loadingPaymentStatus ? (
            <p className="text-center md:text-[18px] font-bold"> Loading... </p>
            ) : (
              <p className="text-center md:text-[18px] font-bold"> {unpaidCount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Secondsection;
