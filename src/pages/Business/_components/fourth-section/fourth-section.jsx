import { images } from '../../../../constants';

const FourthSection = () => {
  return (
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
      </div>
    </div>
  );
};

export default FourthSection;
