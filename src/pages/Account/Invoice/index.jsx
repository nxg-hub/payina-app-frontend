import { Navbar, Sidebar } from '../_components';
import { CorporateCustomerProvider } from './contexts/CorporateCustomerContext';
import Firstsection from './_components/Firstsection';
import Secondsection from './_components/Secondsection';
import Thirdsection from './_components/Thirdsection';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoorperateCustomerDetails } from '../../../Redux/CoorperateCustomerSlice';

const Invoice = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredInvoices, setFilteredInvoices] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // for filtered invoices
  const [currentInvoicePage, setInvoiceCurrentPage] = useState(0); // for normal nvoices
  const dispatch = useDispatch();
  const customerId = useSelector((state) => state.user.user.customerId);

  const handleClientSelect = (clientId, clientName) => {
    setSelectedClient({ id: clientId, name: clientName });
    setShowFiltered(false);
  };

  useEffect(() => {
    dispatch(fetchCoorperateCustomerDetails(customerId));
  }, []);

  return (
    <CorporateCustomerProvider>
      <div>
        <Navbar />
        <Sidebar />
        <Firstsection
          onClientSelect={handleClientSelect}
          setFilteredInvoices={setFilteredInvoices}
          setShowFiltered={setShowFiltered}
          setTotalPages={setTotalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setInvoiceCurrentPage={setInvoiceCurrentPage}
        />
        <Secondsection />

        <Thirdsection
          clientId={selectedClient?.id || null}
          clientName={selectedClient?.name || 'Recent Invoices'}
          filteredInvoices={filteredInvoices}
          showFiltered={showFiltered}
          setTotalPages={setTotalPages}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setInvoiceCurrentPage={setInvoiceCurrentPage}
          currentInvoicePage={currentInvoicePage}
        />
      </div>
    </CorporateCustomerProvider>
  );
};

export default Invoice;
