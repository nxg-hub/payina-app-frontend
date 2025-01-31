// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import plus from './../../../../assets/images/invoiceplus.png';
import { Link } from 'react-router-dom';
import { CorporateCustomerContext } from '../contexts/CorporateCustomerContext';
import { fetchClientSuccess, setFilterLoader } from '../../../../Redux/GetClientsSlice';

const Firstsection = ({
  onClientSelect,
  setFilteredInvoices,
  setShowFiltered,
  clientId,
  handleSetRecentInvoices,
  setTotalPages,
  currentPage,
  setCurrentPage,
  setInvoiceCurrentPage,
}) => {
  // const [clients, setClients] = useState([]);
  const { corporateCustomerId } = useContext(CorporateCustomerContext);
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [selectedClientId, setSelectedClientId] = useState('');
  const [loadingClients, setLoadingClients] = useState(false);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  const success = useSelector((state) => state.clients.success);
  const clientss = useSelector((state) => state.clients.clients);
  const [search, setSearch] = useState('');
  const [filteredClients, setFilteredClients] = useState(clientss);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter clients based on search input
  useEffect(() => {
    setFilteredClients(
      clientss.filter((client) =>
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, clientss]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClientClick = (clientId, clientName) => {
    setSelectedClientId(clientId);
    onClientSelect(clientId, clientName);
    setSelect(true);
  };
  useEffect(() => {
    const handleGetClients = async () => {
      if (success) {
        return;
      }
      setLoadingClients(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_GET_CLIENTS_ENDPOINT}${corporateCustomerId}/get-clients`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          // console.log(responseData);

          const clientsData = responseData?.content?.map((client) => ({
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            companyName: client.companyName,
            phone: client.phone,
          }));

          // setClients(clientsData);
          dispatch(fetchClientSuccess(clientsData));
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoadingClients(false);
      }
    };

    handleGetClients();
  }, [corporateCustomerId]);

  useEffect(() => {
    const fetchFilteredInvoices = async () => {
      if (!selectedClientId) {
        console.error('Client ID is not selected');
        useEffect(() => {
          if (selectedClientId && (beginDate || endDate || status)) {
            fetchFilteredInvoices();
          }
        }, [selectedClientId, beginDate, endDate, status]);

        return;
      }
      const formattedBeginDate = beginDate ? `${beginDate}` : '';
      const formattedEndDate = endDate ? `${endDate}` : '';
      setLoadingInvoices(true);
      dispatch(setFilterLoader(true));
      try {
        const response = await fetch(
          `${import.meta.env.VITE_FILTER_INVOICES_ENDPOINT}?corporateCustomerClientId=${selectedClientId}&startDateStr=${formattedBeginDate}&endDateStr=${formattedEndDate}&status=${status}&page=${currentPage}&size=${4}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }

        const data = await response.json();

        setFilteredInvoices(data.content);
        setTotalPages(data.totalPages);
        setShowFiltered(true);
        dispatch(setFilterLoader(false));
        // setTotalPages(Math.ceil(data.length / 5) || 1);
        // console.log("Filtered Invoices:", data);
      } catch (error) {
        console.error('Error filtering invoices:', error);
        setShowFiltered(false);
        setFilteredInvoices(null);
      } finally {
        setLoadingInvoices(false);
        dispatch(setFilterLoader(false));
      }
    };

    fetchFilteredInvoices();
  }, [selectedClientId, beginDate, endDate, status, currentPage]);

  return (
    <>
      <div className="md:px-[.7rem] pb-4 w-auto md:clear-right ml-5 md:ml-2 xl:ml-[19.5rem] mr-5 md:mr-2">
        <div className="pt-2 md:pt-[9%] text-sm md:text-base pb-6 ">
          <div className="flex justify-between">
            <div className=" text-[21px] md:text-[32px] font-bold">Invoice</div>
            <Link to="/invoice/createinvoice">
              <div className="flex items-center border border-lightBlue px-[8px] md:px-[16px] py-[4px] md:py-[8px] rounded-md ">
                <img src={plus} alt="" />
                <p className="text-[14px] md:text-[21px] text-lightBlue font-semibold">
                  Create Invoice
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="shadow-[rgba(50,_50,_105,_0.4)_0px_2px_5px_1px,_rgba(0,_0,_0,_0.03)_0px_1px_1px_0px] py-8 px-3 rounded-md">
          <div className="w-full md:w-[90%]">
            <h2 className="pb-6 md:text-[21px]  font-bold">All Invoices</h2>
            <div className="grid grid-cols-4 gap-4   ">
              <div className="">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base font-bold">Begin Date</p>
                <input
                  type="date"
                  id="beginDate"
                  name="beginDate"
                  className="text-[9px] md:text-base w-[90%] md:w-full bg-[#82B5C6] h-[30px] sm:text-[13px] md:h-[48px] p-2 rounded-md"
                  value={beginDate}
                  onChange={(e) => {
                    setBeginDate(e.target.value);
                    setCurrentPage(0);
                    setInvoiceCurrentPage(0);
                  }}
                />
              </div>
              <div className=" ">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base  font-bold">End Date</p>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="text-[9px] md:text-base w-[90%] md:w-full bg-[#F1A2A2] h-[30px] sm:text-[13px] md:h-[48px] p-2 rounded-md"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setCurrentPage(0);
                    setInvoiceCurrentPage(0);
                  }}
                />
              </div>
              <div className="">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base  font-bold">Status</p>
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setCurrentPage(0);
                    setInvoiceCurrentPage(0);
                  }}
                  className=" h-[30px] md:h-[48px] rounded-md p-2 w-full md:w-full text-[9px] sm:text-[13px] md:text-base bg-[#BADD56]">
                  <option value="">Select </option>
                  <option value="PAID">Paid</option>
                  <option value="UNPAID">Unpaid</option>
                </select>
              </div>
              <div className=" w-[120%]">
                <p className="pb-2 text-[10px] sm:text-[13px] md:text-base font-bold">Clients</p>
                <div
                  ref={dropdownRef}
                  className="relative w-full md:w-full p-2 bg-[#A3F5FB] rounded-md">
                  {/* Search Input */}
                  <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    placeholder="Search..."
                    className="w-full h-5 md:h-8 border px-3 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setIsDropdownOpen(true)}
                  />

                  {/* Dropdown List (Visible only if dropdown is open) */}
                  {isDropdownOpen && (
                    <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto z-50">
                      {loadingClients ? (
                        <li className="px-3 py-2 text-gray-500">Loading clients...</li>
                      ) : filteredClients.length > 0 ? (
                        filteredClients.map((client) => (
                          <li
                            key={client.id}
                            className={`px-3 py-2 cursor-pointer ${
                              selectedClientId === client.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => {
                              setSearch(`${client.firstName} ${client.lastName}`);
                              setIsDropdownOpen(false);
                              handleClientClick(
                                client.id,
                                `${client.firstName} ${client.lastName}`
                              );
                              setCurrentPage(0);
                              setInvoiceCurrentPage(0);
                            }}>
                            {client.firstName} {client.lastName}
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-2 text-gray-500">No clients available</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Firstsection;
