import { Navbar, Sidebar } from '../_components';
import InventoryManagement from './_components/InventoryManagement';

const Inventory = () => {
  return (
    <div className="bg-primary">
      <Navbar />
      <InventoryManagement />
      <Sidebar />
    </div>
  );
};

export default Inventory;
