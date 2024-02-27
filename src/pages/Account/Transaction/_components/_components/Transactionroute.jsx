import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Credit from './Credit';
import Debit from './Debit';

const Transactionroute = () => {
  return (
    <div>
          <Routes>
      <Route path="/credit" element={<Credit/>}/>
      <Route path="/debit" element={<Debit/>}/> 
    </Routes>
      
    </div>
  )
}

export default Transactionroute
