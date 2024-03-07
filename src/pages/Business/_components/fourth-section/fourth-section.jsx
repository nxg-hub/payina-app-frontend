import { images } from '../../../../constants';

const FourthSection = () => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col justify-center text-center bg-black w-full py-4">
      <div className="text-[#FFCB05] font-bold text-3xl md:text-4xl xl:text-5xl">Why They Trust Us</div>
      <div className="flex xl:flex-row flex-col xl:space-y-0 space-y-8 text-primary md:px-10 py-4 xl:py-10">
        <div className="xl:w-1/2 text-left mx-4 xl:mx-10 text-sm md:text-base flex gap-4">
        <div>
          <img src={images.Lock} className='xl:w-[13rem] md:w-[5rem] w-[9rem]' alt="" />
          </div>
          We have robust security measures that safeguard your financial transactions. Our Fintech
          prioritizes the protection of your data through advanced encryption and authentication
          protocols.
        </div>
        <div className="xl:w-1/2 text-left mx-4 xl:mx-10 text-sm md:text-base flex gap-4">
        <div>
          <img src={images.Mobile} className='xl:w-[13rem] md:w-[5rem] w-[9rem]' alt="" />
          </div>
          We have robust security measures that safeguard your financial transactions. Our Fintech
          prioritizes the protection of your data through advanced encryption and authentication
          protocols.
        </div>
        <div className="xl:w-1/2 text-left mx-4 xl:mx-10 text-sm md:text-base flex gap-4">
          <div>
          <img src={images.Transfer} className='xl:w-[13rem] md:w-[5rem] w-[9rem]' alt="" />
          </div>
        
          We have robust security measures that safeguard your financial transactions. Our Fintech
          prioritizes the protection of your data through advanced encryption and authentication
          protocols.
        </div>
=======
    <div className=''>
    <div className=' text-[white] flex justify-center items-center'> 
    <div> <p className='text-center pt-6 text-[#000]  text-[14px] md:text-[20px]'>What Set’s Us Apart</p></div> 
     </div> 
    
     <hr className="border-none bg-yellow h-1 mt-4 mb-4  w-[87%] mx-auto" />
     <div className="xl:py-20 py-0 grid place-content-center">
        <img src={polygon} className='pb-10 pt-10' alt="" />
>>>>>>> e93b99b18222c70ab7aafafc706491d7219f959d
      </div>
    </div>
  );
};

export default FourthSection;
