import SecondSection from '../../Business/_components/second-section/second-section'
import { Navbar, Sidebar } from '../_components'
import Firstsection from './_components/Firstsection'
import Secondsection from './_components/Secondsection'

const Transaction = () => {
  return (
    <div className='bg-primary'>
        <Navbar />
        <Sidebar/>
        <Firstsection/>
    
        <Secondsection/>
      
    </div>
  )
}

export default Transaction