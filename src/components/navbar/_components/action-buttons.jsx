import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../button/button'


const ActionButtons = () => {
  const location = useLocation()
  const route = location.pathname
  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">        
      <div className="flex xl:space-x-6">
        <Link href={"/pricing"} className="xl:flex items-center hidden">
          <div className="font-semibold flex">Features</div>
        </Link>
        
      </div>
      
      <div className="flex lg-space-x-4 gap-4 items-center">
        <Link to={"/signup"}>
          <Button children='Sign Up' backgroundColor={route === '/signup' ? '#00678F' : 'transparent'} />
        </Link>
        <Link to={"/login"}>
         <Button children='Login' backgroundColor={route === '/login' ? '#00678F' : 'transparent'} />
        </Link>
      </div>
      </div>
  )
}

export default ActionButtons