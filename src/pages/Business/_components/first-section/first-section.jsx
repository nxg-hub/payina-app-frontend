import React from 'react'
import first from '../../../../assets/images/firstrectangle.png'
import Second from '../../../../assets/images/secondrectangle.png'


const FirstSection = () => {
  return (
    <div className='bg-[#000]'>
    <div className="flex itmes-center justify-center xl:py-20 py-2 xl:pt-0 px-8 xl:px-10 bg-[#000]">
      <div className='text-lightBlue text-3xl xl:text-5xl font-extrabold xl:w-[60%] md:text-center text-start !leading-[4rem]'>
      We Have a Solution for Your Business Regardless of Scale
      </div>
      </div>
      <div className='grid place-items-center'>
      <div className='flex justify-between flex-col md:flex-row px-8  w-full md:w-[80%]  mb-[53px]'>
        <div className='w-full pr-[27px] pl-[27px] rounded-md bg-lightBlue md:w-[48%] mb-8 '>
          <img src={first} alt="" className='pt-[26px]  w-full' />
          <h1 className='text-[34px] md:text-[44px] xl:text-[48px] text-center pt-[15px] text-yellow font-bold'>Small Business</h1>
          <p className='leading-[35.84px]  pb-[47px] text-primary '> Seamlessly accept payments, boost customer satisfaction, and enhance financial agility. Join the future of commerce with our secure and efficient platform </p>
          
        </div>
        <div className='w-full pr-[27px] pl-[27px] rounded-md bg-secondary md:w-[48%] mb-8'>
          <img src={Second} alt=""className='pt-[26px] w-full '  />
          <h1 className='text-[34px] md:text-[44px] xl:text-[48px] text-center pt-[15px] text-yellow font-bold '>Enterprise</h1>
          <p className='leading-[35.84px] pb-[47px] text-primary '>Streamline transactions, gain insights with intuitive analytics, and enjoy enhanced financial control. Experience efficiency and growth for your entrepreneurial journey.</p>
      </div>
      </div>
      </div>
    
    </div>
  )
}

export default FirstSection