import './fourth-section.css'
import polygon from './../../../../assets/images/polygon.png'
import cost from './../../../../assets/images/cost-icon.png'
import clock from './../../../../assets/images/clock-icon.png'
import lock from './../../../../assets/images/lock-icon.png'
import phone from './../../../../assets/images/phone-icon.png'

const FourthSection = () => {
  return (
    <div className='  '>
    <div className=' text-[white] flex justify-center items-center'> 
    <div> <p className='text-center pt-6 text-[#000]'>What Set’s Us Apart</p></div> 
     </div> 
    
     <hr className="border-none bg-yellow h-1 mt-4 mb-4  w-[87%] mx-auto" />

     <div className='flex flex-col items-center  xl:pb-4 xl:pt-4  text-[#000]'>

      <div className='gallery-container'>
      <div class="gallery py-16">
  <div>
    <img className='w-[500px] h-[500px]' src={polygon} alt="..."/>
    <img className='icon' src={lock} alt="" />
    <div class="text"><h1 className='py-2' >SECURITY ASSURANCE</h1><p className=''> Trust in robust security measures that safeguard your financial transactions. Our Fintech prioritizes the protection of your data through advanced encryption and authentication protocols.</p></div>
  </div>
  <div>
    <img  className='w-[500px] h-[500px]' src={polygon} alt="..."/>
    <img className='icon' src={cost} alt="" />
    <div class="text"><h1 className='py-2'> COST-EFFECTIVE TRANSACTIONS </h1>  <p className=''>   Instantaneous transfers ensure swift access to your funds, providing the efficiency needed in today's fast-paced financial landscape for seamless and timely transactions</p></div>
  </div>
  <div>
    <img  className='w-[500px] h-[500px]' src={polygon} alt="..."/>
    <img className='icon' src={clock} alt="" />
    <div class="text"><h1 className='py-2'>EXPERIENCE UNPARALLELED SPEED</h1> <p className=''> Experience a seamless and intuitive platform designed with simplicity in mind. Payina is easy to navigate, making financial management a breeze for users of all levels</p></div>
  </div>
  <div>
    <img  className='w-[500px] h-[500px]' src={polygon} alt="..."/>
    <img className='icon' src={phone} alt="" />
    <div class="text"><h1 className='py-2'> USER-FRIENDLY INTERFACE </h1><p>Enjoy the advantage of low fees and transparent pricing structures. Our Fintech app provides cost-effective solutions for sending, receiving, and managing your money, maximizing your financial efficiency.</p></div>
  </div>
</div>




    </div>
  </div>

  
</div>
  )
}

export default FourthSection