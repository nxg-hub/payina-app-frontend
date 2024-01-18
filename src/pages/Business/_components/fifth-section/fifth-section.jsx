import React from 'react';
import section5 from './../../../../assets/images/section-four.png'

const FifthSection = () => {
  return <div>
    <div className='bg-lightBlue pt-16 grid md:grid-cols-2 items-center px-16'>
      <div>
        <img src={section5} alt="" />
      </div>
      <div className='flex flex-col  items-center'>
        <p className='font-bold text-[48px] text-[white] '>One Login </p> 
        <p className='font-bold text-[48px] text-[white] text-center '> Infinite Possibilities </p>
        <button className='bg-[white] w-[200px] rounded-md font-medium my-6 mx-auto  py-3 text-[#000]'>Get Started</button>
      </div>
      
    


    </div>
   </div>;
};

export default FifthSection;
