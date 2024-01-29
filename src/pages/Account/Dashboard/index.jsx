import { Navbar, Sidebar } from '../_components'
import AccountCard from './_components/account-card/account-card'
import BalanceCard from './_components/balance-card/balance-card'
import QuickAction from './_components/quick-actions/quick-actions'

const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <Sidebar/>
        <AccountCard />
        <BalanceCard />
        <QuickAction />
    </div>
  )
}

export default Dashboard