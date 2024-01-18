import React from 'react'
import doreen from './../../../../assets/images/doreen.png'
import Norman from './../../../../assets/images/Norman.png'
import star from './../../../../assets/images/star.png'


const SixthSection = () => {
  return (
    <div className=''>
      <div className='flex flex-row text-[#000] pt-12 px-12'>
      <hr className="border mt-4 mb-4 text-yellow w-[500px] mx-auto" />
      <p className='w-[170px] text-center '> Join Our Community</p>
      <hr className="border mt-4 mb-4 text-yellow w-[500px] mx-auto" />
      </div>
      
      <div className=' py-16 text-primary grid md:grid-cols-3 px-8   gap-8 md:pr-[100px]  md:pl-[100px] ' >
        <div className='w-full grid place-content-center '>
          <p className='text-[48px] text-[#000]'>
          They 
          </p>
          <p className='text-[48px] text-[#000]'>
          Trusted
          </p>
          <p className='text-[48px] text-[#000]'>
          Us
          </p>
          <p className='text-[#000]'>Happy customers make us happy!</p>
          <button className='border w-[200px] rounded-md font-medium my-6 mx-auto  py-3 text-lightBlue'>See more reviews</button>
        </div>

        <div className=' bg-lightBlue mb-5 h-[574px] py-[42px] px-[18px] rounded-md w-full md:w-full'>
          <p className='text-center  leading-[31.35px] md:text-[14px] text-[12px] '>
          "Innovative fintech solution! Streamlined processes, user-friendly interface, and efficient transactions. Enhances financial management seamlessly. A game-changer for modern finance. Highly recommend for convenience and reliability!"
          </p>
          <div className=' w-full grid place-content-center '>
          <img src={doreen} alt="" className='py-8 md:w-full ' />
          </div>
          <hr className="border-[0.1px] mt-4 mb-4 text-primary w-full mx-auto" />
          <p className='text-center'>Doreen Schumm</p>
          <div className='flex justify-center'>
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
          </div>
        </div> 

        <div className='bg-lightBlue mb-5  h-[574px] rounded-md py-[42px] px-[18px] md:w-full '>
          <p className=' text-center  md:text-[14px] text-[12px] md:w-full w-[]   leading-[31.35px]'>
          "Spectacular fintech platform! Swift transactions, intuitive interface, and robust security. Simplifies financial tasks effortlessly. A must-have for seamless banking. Truly impressed by its efficiency and convenience!"
          </p>
          <div className='grid place-content-center'>
          <img src={Norman} alt="" className='py-8' />
          </div>
          <hr className="border-[0.1px] mt-4 mb-4 text-primary w-full mx-auto" />
          <p className='text-center'>Norman Conn</p>
          <div className='flex justify-center'>
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
          </div>
          </div>
      </div>
      <div className='grid place-content-end pr-4 '>
          <button className='border w-[200px] rounded-md  font-medium my-6 mx-auto  py-3 text-lightBlue'>See more reviews</button>
          </div>
      
      SixthSection</div>
  )
}

export default SixthSection