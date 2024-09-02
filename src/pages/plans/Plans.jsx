import React from 'react'
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown} from "@fortawesome/free-solid-svg-icons";
import  { Link} from  'react-router-dom';

const Plans = () => {
    return (
        <section>
         <Navbar />
            <div className=" container">
            <div className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-40 bg-yellow">
            </div>
            <p className=" mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
                 Buy Data & get Cashback
            </p>
            <button className="text-primary text-left p-10 border-none rounded-[5px]
             w-[64%] bg-neutral mb-3 px-4 py-2">Want to enjoy discounts?  
                <span className="text-yellow"> Register</span> or <span className=" text-yellow">
                     Login</span> </button>
            <p className="text-primary mb-10">Hot Plans</p>
            <div className="flex gap-64 mb-10 text-primary">
                <div className="flex-col">
                    <p className="text-sm text-lightBlue">50<span className="text-sm text-lightBlue">mb</span></p>
                    <p className="text-xs">NGN<span className="text-sm">50</span></p>
                    <p className="text-xs">1day</p>
                </div>
                 <div className="flex-col pl-4 ">
                    <p className="text-sm text-lightBlue">100<span className="text-xs text-lightBlue">MB</span></p>
                    <p className="text-xs">NGN<span className="text-sm">100</span></p>
                    <p className="text-xs">1day</p>
                </div>
                 <div className=" flex-col text-primary">
                    <p className="text-sm text-lightBlue">2.5<span className="text-xs">GB</span></p>
                    <p className="text-xs">NGN<span className="text-sm">500</span></p>
                    <p className="text-xs">2day</p>
                </div>
            </div>
            <div className="flex gap-64 text-primary">
                <div className="flex-col">
                    <p className="text-sm text-lightBlue">7<span className="text-sm text-lightBlue">GB</span></p>
                    <p className="text-xs">NGN<span className="text-sm">1500</span></p>
                    <p className="text-xs">7 days</p>
                </div>
                 <div className="flex-col ">
                    <p className="text-sm text-lightBlue">3<span className="text-xs text-lightBlue">GB</span></p>
                    <p className="text-xs">NGN<span className="text-sm">1500</span></p>
                    <p className="text-xs">1month</p>
                </div>
                 <div className=" flex-col text-primary">
                    <p className="text-sm text-lightBlue">9<span className="text-xs">GB</span></p>
                    <p className="text-xs">NGN<span className="text-sm">10000</span></p>
                    <p className="text-xs">1month</p>
                </div>
            </div>
             <div className="flex mt-2">
                <button className="text-black text-sm text-left p-10 border-none rounded-[5px]
             w-[64%] bg-primary mb-3 mt-10 px-4 py-2">2.5GB  
                 <span className=" pl-36 md:pl-72 m">#500
             </span>
                <FontAwesomeIcon icon={faChevronDown} color="teal" className=" absolute 
             pl-[16%] md:pl-[28%] min-w-1 items-center mt-1 cursor-pointer"  />
           </button>
        </div>
        <Link to="/planb">
         <button className="text-primary mb-10 mt-5 text-left px-16 py-4 
         border-none rounded-[5px] bg-lightBlue cursor-pointer
         hover:bg-neutral transition-all duration-200 ">
        Proceed
     </button> 
     </Link>     
  </div>
  <div className="mt-2">
   <Footer /> 
   </div>        
 </section>
    )
}

export default Plans
