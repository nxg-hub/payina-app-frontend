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
  const [filteredInvoices, setFilteredInvoices] = useState([]);
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
        />
        <Secondsection />

        <Thirdsection
          clientId={selectedClient?.id || null}
          clientName={selectedClient?.name || 'Recent Invoices'}
          filteredInvoices={filteredInvoices}
          showFiltered={showFiltered}
        />
      </div>
    </CorporateCustomerProvider>
  );
};

export default Invoice;
