import React from 'react'
import Navbar from '../../components/navbar/navbar'; 
import Footer from '../../components/footer/footer';
import  { Link} from  'react-router-dom';

const Bethree = () => {
    
    return (
        <section>
           <Navbar />
             <div className=" container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-7 bg-yellow">
            </div>
        <form>
             <button className="text-primary text-left p-10 border-none rounded-[5px]
             w-[64%] bg-neutral px-4 py-2">Confirm Your Order </button>
            <div className="flex gap-20">
            <div className="flex-col text-primary mr-6 mt-4  w-[300px]  ">
            <label className="-mb-2">Platform</label>
                 <input type="text" placeholder="Bet 9ja" 
                 className="border-2 mb-5 md:static border-primary text-xs pl-2 px-52 py-2 
                  mt-2 rounded-[5px]  border-primary bg-black text-slate-600"
                        />
            </div>
            <div className="flex-col text-primary  mt-4 ml-6 w-[300px]  ">
               <label className="">Custom Ref</label>
                 <input type="text" placeholder="Enter Your Customer ID" 
                 className="border-2 mb-5 md:static border-primary text-xs pl-2 px-52 py-2 rounded-[5px]
                 mt-2  border-primary bg-black text-slate-600"
                        />
            </div>
            </div>
                     <div className="flex text-primary flex-col w-[64%] ">
                        <label className="py-3">Amount Payable</label>
                        <input type="number" placeholder="#500" 
                        className="border-2 border-primary rounded-[5px] px-2 py-2
                         border-primary bg-black text-primary text-xs mb-3"
                        />
                     </div>
                     <div className="flex text-primary flex-col w-[64%] ">
                        <label className="pt-4">Card Number</label>
                        <input type="text" placeholder="Enter Card Number" 
                        className="border-2 mt-2 mb-2 border-primary rounded-[5px] px-2 py-2
                         text-xs border-primary bg-black text-slate-600"
                        />
                     </div>
                     <div className="flex text-primary flex-col w-[64%] ">
                        <label className="pt-4">Name On Card</label>
                        <input type="text" placeholder="Enter Name On Card" 
                        className="border-2 mt-2 mb-3 border-slate-300 rounded-[5px] px-2 py-2
                         text-xs border-primary bg-black text-slate-600"
                        />
                     </div>
                     <div className="md:flex flex-1  text-primary gap-6 mt-8  w-[300px]  ">
                        <input type="number" placeholder="MM" 
                        className="border-2 mb-5 md:static border-primary text-xs pl-2 px-24 py-2 rounded-[5px]  border-primary bg-black text-slate-600"
                        />
                        <input type="number" placeholder="YY" 
                        className=" border-primary mb-5 md:static text-xs pl-2 py-2 px-24 border-2 rounded-[5px]  border-primary bg-black text-slate-600"
                        />
                        <input type="number" placeholder="CVV" 
                        className="border-2 text-xs mb-5 md:static border-slate-300 rounded-[5px] pl-2 px-24 py-2 border-primary bg-black text-slate-600"
                        />
                     </div>
                    <Link to="/befour" >
                    <button className="text-primary mt-7 mb-12 text-left px-16 py-4 
                    border-none rounded-[5px] bg-lightBlue cursor-pointer
                     hover:bg-neutral transition-all duration-200 ">
                        Proceed
                    </button>
                    </Link>
             </form>

            </div>
            <Footer />
        </section>
    )





}

export default Bethree
