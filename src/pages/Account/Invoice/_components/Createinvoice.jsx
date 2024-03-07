import React from 'react'
import { Sidebar } from '../../_components'
import { Navbar } from '../../_components'
import InvoiceForm from '../components/InvoiceForm'



const Createinvoice = () => {
  return (
    <div className=''>
      <Navbar  />
      <Sidebar />
      <InvoiceForm/>
    </div>
  )
}

export default Createinvoice
