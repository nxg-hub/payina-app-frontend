import React from 'react'
import { images } from '../../../../../constants'

const BalanceCard = () => {
  return (
    <div className="px-4 mx-auto w-auto ml-0 xl:ml-[19rem] clear-none xl:clear-right">
         <div className="w-auto p-4 py-6  h-fit xl:h-[134x]  md:h-fit mx-auto text-start bg-lightBlue text-primary rounded-[10px]">
        <div className="flex gap-4 md:gap-0 md:pt-0 justify-between md:text-sm xl:text-base">
          <div className="px-4 py-4 md:py-8 space-y-2">
            <div className='md:text-[20.372px] text-sm font-medium flex gap-10 items-center'>Balance in Wallet <img src={images.BalanceIcon} alt="" /></div>
            <div className='md:text-[32px] text-2xl font-bold'><span className='uppercase text-sm md:text-[23.282px] '>NGN</span> 100,000.<span className='text-xl md:text-[27.502px] '>00</span></div>
          </div>
          <div className="mr-[-1rem] mb-[-1.5rem] mt-[-1.4rem] md:block hidden">
             <img src={images.BalanceSpiral} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BalanceCard