import { Navbar, Sidebar } from '../_components'
import AccountCard from './_components/account-card/account-card'

const Dashboard = () => {
  return (
    <div>
        <Navbar />
        <Sidebar/>
        <AccountCard />
    </div>
  )
}

export default Dashboard