import React from 'react'
import Navbar from '../../components/navbar/navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';
const Betone = () => {
    return (
        <section>
         <Navbar />
         <div className=" container" >
            <div className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-40 bg-yellow">
            </div>
             <p className=" mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
                 Buy Data & get Cashback
            </p>
            <form className=" text-white">
                <button className="text-primary text-left p-10 border-none rounded-[5px]
             w-[64%] bg-neutral px-4 py-2">Want to enjoy discounts?  
                <span className="text-yellow"> Register</span> or <span className=" text-yellow">
                     Login</span> </button>
                      <div className="flex flex-col w-[64%] ">
                        <label className="py-4">Email</label>
                        <input type="email" placeholder="Enter Email address" 
                        className="border-2  border-primary rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                        />
                        </div>
                        <div className="flex flex-col w-[64%] ">
                        <label className="py-4">Choose Service</label>
                        <div className=" cursor-pointer ">
                         <FontAwesomeIcon icon={faChevronDown} color="teal" className=" absolute 
                           pl-[53%] md:pl-[56%] min-w-1 py-4"  />
                        <input type="text" placeholder=" Betting "
                      className="border-2  border-primary rounded-[5px]  px-5 py-2 border-primary
                       bg-black text-slate-600 w-full" />
                        </div>
                        </div>
                        <div className="flex flex-col w-[64%] ">
                        <label className="py-4">Phone</label>
                        <input type="number" placeholder="Enter Phone number" 
                        className="border-2  border-primary rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                        />
                        </div>
                        <Link to="/plans">
                         <button className="text-primary mb-10 mt-10 text-left px-16 py-4 
                    border-none rounded-[5px] bg-lightBlue cursor-pointer
                     hover:bg-neutral transition-all duration-200 ">
                        Proceed
                    </button>
                    </Link>
            </form>
            <div>
                <Footer />
            </div>
            </div>


        </section>
    )
}
export default Betone
