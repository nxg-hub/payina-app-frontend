import { Navbar, Sidebar } from '../_components';
import AccountSetting from './_components/AccountSetting';

const Settings = () => {
  return (
    <div className="bg-primary">
      <>
        <Navbar />
        <AccountSetting />
        <Sidebar />
      </>
    </div>
  );
};

export default Settings;
