import { Navbar, Sidebar } from '../Account/_components';
import HistoryLoan from './HistoryLoan';
const LoanHistory = () => {
  return (
    <div>
      <div>
        <Navbar />
        <Sidebar />
        <HistoryLoan />
      </div>
    </div>
  );
};

export default LoanHistory;
