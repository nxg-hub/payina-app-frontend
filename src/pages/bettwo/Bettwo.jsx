import React from 'react'
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown} from "@fortawesome/free-solid-svg-icons";
import  { Link} from  'react-router-dom';
import { bet1, bet2, bet3, bet4, bet5, bet6 } from '../../constants/images';

const Bettwo = () => {
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
            <p className="text-primary mb-3 mt-2">Popular Platforms</p>
            <div className="mb-10 text-lightBlue">
                <div className="flex gap-36">
                    <div className="flex-col">
                    <img 
                    height={64}
                    width={64}
                    src={bet3}
                    alt=""
                    className="py-4"
                    />
                    <p>Bet 9ja</p>
                    </div>
                    <div className="flex-col">
                    <img 
                    height={64}
                    width={64}
                    src={bet6}
                    alt=""
                    className="py-4"
                    />
                    <p>Sporty</p>
                    </div>
                    
                   <div className="flex-col">
                    <img 
                    height={64}
                    width={64}
                    src={bet5}
                    alt=""
                    className="py-4"
                    />
                    <p>1x Bet</p>
                   </div>
                </div>
                 <div className="flex gap-36">
                   <div className="flex-col">
                     <img 
                    height={64}
                    width={64}
                    src={bet4}
                    alt=""
                    className="py-4"
                    />
                    <p>Naira Bet</p>
                   </div>
                   <div className="flex-col">
                     <img 
                    height={64}
                    width={64}
                    src={bet1}
                    alt="bet-icon"
                    className="py-4"
                    />
                    <p>22 Bet</p>
                </div>
                <div className="flex-col">
                     <img 
                    height={64}
                    width={64}
                    src={bet2}
                    alt="bet-icon"
                    className="py-4"
                    />
                    <p>Bet King</p>
                </div>
                 </div>
            </div>
             <div className="flex-col">
                <p className="text-primary">Choose Preferred platform</p>
          <button
            className="text-black text-sm text-left p-10 border-none rounded-[5px]
             w-[64%] bg-primary mb-3 mt-3 px-4 py-2">Bet King  
                 
             
                <FontAwesomeIcon icon={faChevronDown} color="teal" className=" absolute 
             pl-[16%] md:pl-[51%] min-w-1 items-center mt-1 cursor-pointer"  />
           </button>
        </div>
        <Link to="/bethree" >
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

export default Bettwo
