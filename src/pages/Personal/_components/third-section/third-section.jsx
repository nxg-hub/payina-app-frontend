import React from 'react'
import section3 from './../../../../assets/images/section-three.png'

const ThirdSection = () => {
  return (
    <div className="bg-[#000] flex justify-center items-center  xl:pb-4 xl:pt-4">
      <div className='relative'>
        <img src={section3} alt="security"  className='xl:mb-10 xl:mt-10 ' />
        <div className='bg-primary p-4 h-[88%] md:px-10 md:py-10 w-[40%] md:h-fit absolute md:left-[1rem] left-[.5rem] md:top-[11rem] top-[2.5rem] text-lightBlue flex items-center justify-center flex-col rounded-[8.34px]'>
          < span className='uppercase md:text-center md:pl-0 text-start text-[.7rem] xl:text-[1rem] '> SECURITY YOU CAN TRUST</span >
          <hr className="border mt-4 mb-4 text-yellow w-full mx-auto" />
          <p className='md:leading-[224.024%] font-medium text-[.6rem] md:text-center lg:  xl:text-[1rem] lg:text-[1rem] md:text-[1rem] '>Your financial security is our top priority. Benefit from state-of-the-art security measures, including encryption and multi-factor authentication, to safeguard your transactions and sensitive information.</p>
                        
        </div>
  
      </div>
      
    </div>
  )
}

export default ThirdSection