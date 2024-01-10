import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../button/button'


const ActionButtons = () => {
  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">        
      <div className="flex xl:space-x-6">
        <Link href={"/pricing"} className="xl:flex items-center hidden">
          <div className="font-semibold flex">Features</div>
        </Link>
        
      </div>
      
      <div className="flex lg-space-x-4 gap-4 items-center">
        <Link href={"/free"}>
          <Button children='Sign Up' />
        </Link>
        <Link href={"/contact"}>
         <Button children='Login' backgroundColor='transparent' />
        </Link>
      </div>
      </div>
  )
}

export default ActionButtons