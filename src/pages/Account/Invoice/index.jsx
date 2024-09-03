import { Navbar, Sidebar } from '../_components'
import Firstsection from './_components/Firstsection'
import Secondsection from './_components/Secondsection'
import Thirdsection from './_components/Thirdsection'

const Invoice = () => {
  return (
    <div>
        <Navbar  />
        <Sidebar />
        <Firstsection/>
        <Secondsection/>
        <Thirdsection/>
    </div>
  )
}

export default Invoice