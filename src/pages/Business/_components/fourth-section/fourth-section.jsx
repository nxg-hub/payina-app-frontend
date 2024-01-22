import './fourth-section.css'
import polygon from './../../../../assets/images/polygon.png'
import cost from './../../../../assets/images/cost-icon.png'
import clock from './../../../../assets/images/clock-icon.png'
import lock from './../../../../assets/images/lock-icon.png'
import phone from './../../../../assets/images/phone-icon.png'

const FourthSection = () => {
  return (
    <div className=''>
    <div className=' text-[white] flex justify-center items-center'> 
    <div> <p className='text-center pt-6 text-[#000] text-[14px] md:text-[20px]'>What Set’s Us Apart</p></div> 
     </div> 
    
     <hr className="border-none bg-yellow h-1 mt-4 mb-4  w-[87%] mx-auto" />

     <div className='grid place-content-center items-center  xl:pb-4 xl:pt-4  text-[#000]'>
     <div className='gallery-container'>
  <div className="gallery place-content-center py-8 md:py-12 lg:py-16 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
    <div className="relative">
      <img className='w-full h-64 md:h-80 lg:h-96 object-cover' src={polygon} alt="..." />
      <img className='icon' src={lock} alt="" />
      <div className="text absolute inset-0 flex flex-col justify-center items-center text-center bg-white bg-opacity-75 p-3 md:p-8">
        <h1 className='  text-[6.5px] sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[16px] font-bold mb-0 md:mb-2 px-1 md:px-0 '>SECURITY ASSURANCE</h1>
        <p className='text-[5px] sm:text-[7px] md:text-[8px] lg:text-[10px] xl:text-[14px] 
        pl-[7px] pr-[7px] pb-0  md:pb-4 md:pl-4 md:pr-4   lg:p-1'>Trust in robust security measures that safeguard your financial transactions. Our Fintech prioritizes the protection of your data through advanced encryption and authentication protocols.</p>
      </div>
    </div>
    <div className="relative">
      <img className='w-full h-64 md:h-80 lg:h-96 object-cover' src={polygon} alt="..." />
      <img className='icon' src={cost} alt="" />
      <div className="text absolute inset-0 flex flex-col justify-center items-center text-center bg-white bg-opacity-75 p-2 md:p-8">
        <h1 className='text-[6.5px] sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[16px]  font-bold mb-0 '>COST-EFFECTIVE TRANSACTIONS</h1>
        <p className='text-[5px] sm:text-[7px] md:text-[8px] lg:text-[11px] xl:text-[14px] 
        pl-[7px] pr-[7px] pb-0  md:pb-4 md:pl-4 md:pr-4   lg:p-1'>Instantaneous transfers ensure swift access to your funds, providing the efficiency needed in today's fast-paced financial landscape for seamless and timely transactions.</p>
      </div>
    </div>
    <div className="relative">
      <img className='w-full h-64 md:h-80 lg:h-96 object-cover' src={polygon} alt="..." />
      <img className='icon' src={clock} alt="" />
      <div className="text absolute inset-0 flex flex-col justify-center items-center text-center bg-white bg-opacity-75 p-4">
        <h1 className='text-[6.5px] sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[16px]  font-bold mb-0'>EXPERIENCE UNPARALLELED SPEED</h1>
        <p className='text-[5px] sm:text-[7px] md:text-[8px] lg:text-[10px] xl:text-[14px] 
        pl-[7px] pr-[7px] pb-0  md:pb-4 md:pl-4 md:pr-4   lg:p-1'>Experience a seamless and intuitive platform designed with simplicity in mind. Payina is easy to navigate, making financial management a breeze for users of all levels.</p>
      </div>
    </div>
    <div className="relative">
      <img className='w-full h-64 md:h-80 lg:h-96 object-cover' src={polygon} alt="..." />
      <img className='icon'  src={phone} alt="" />
      <div className="text absolute inset-0 flex flex-col justify-center items-center text-center bg-white bg-opacity-75 p-4">
        <h1 className='text-[6.5px] sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[16px] font-bold mb-0'>USER-FRIENDLY INTERFACE</h1>
        <p className='text-[5px] sm:text-[7px] md:text-[8px] lg:text-[10px] xl:text-[14px] 
        pl-[5px] pr-[5px] pb-0  md:pb-0 md:pl-4 md:pr-4   lg:p-1'>Enjoy the advantage of low fees and transparent pricing structures. Our Fintech app provides cost-effective solutions for sending, receiving, and managing your money, maximizing your financial efficiency.</p>
      </div>
    </div>
  </div>
</div>


  </div>

  
</div>
  )
}

export default FourthSection