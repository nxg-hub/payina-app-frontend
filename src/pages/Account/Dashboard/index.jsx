import { Navbar, Sidebar } from '../_components'
import AccountCard from './_components/account-card/account-card'
import BalanceCard from './_components/balance-card/balance-card'
import QuickAction from './_components/quick-actions/quick-actions'
import TransactionHistory from './_components/transaction-history/transaction-history'

const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <Sidebar/>
        <AccountCard />
        <BalanceCard />
        <QuickAction />
        <TransactionHistory />
    </div>
  )
}

export default Dashboard