// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { Link } from 'react-router-dom';

const Ren = () => {
  return (
    <section>
      <Navbar />
      <div className=" container">
        <div
          className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-7 bg-yellow"></div>
        <form>

            <button className="text-primary text-left p-10 border-none rounded-[5px]
             w-[64%] bg-neutral px-4 py-2">Review Your Order </button>
                     <div className="flex text-primary flex-col w-[64%] ">
                        <label className="py-4">Amount Payable</label>
                        <input type="number" placeholder="#200" 
                        className="border-2 rounded-[5px] px-2 text-xs py-2
                         border-primary bg-black text-primary mb-3"
                        />
                     </div>
                     <div className="flex text-primary flex-col w-[64%] ">
                        <label className="pt-4">Card Number</label>
                        <input type="text" placeholder="Enter Card Number" 
                        className="border-2 mt-2 mb-2  rounded-[5px] px-2 py-2
                         border-primary text-xs bg-black text-slate-600"
                        />
                     </div>
                     <div className="flex text-primary flex-col w-[64%] ">
                        <label className="pt-4">Name On Card</label>
                        <input type="text" placeholder="Enter Name On Card" 
                        className="border-2 mt-2 mb-3 text-xs rounded-[5px] px-2 py-2
                         border-primary bg-black text-slate-600"
                        />
                     </div>
                     <div className="md:flex flex-1   text-primary gap-6 mt-8  w-[300px]  ">
                        <input type="number" placeholder="MM" 
                        className="border-2 mb-5 md:static border-primary text-xs pl-2 px-24 py-2 rounded-[5px] 
                         bg-black text-slate-600"
                        />
                        <input type="number" placeholder="YY" 
                        className=" border-primary mb-5 md:static text-xs pl-2 py-2 px-24 border-2 rounded-[5px]  border-primary bg-black text-slate-600"
                        />
                        <input type="number" placeholder="CVV" 
                        className="border-2 text-xs mb-5 md:static border-primary rounded-[5px] pl-2 px-24 py-2 border-primary bg-black text-slate-600"
                        />
                     </div>
                    <Link to="/thanks">
            <button
              className="text-primary mt-7 mb-12 text-left px-16 py-4 

                    border-none rounded-[5px] bg-lightBlue cursor-pointer
                     hover:bg-neutral transition-all duration-200 ">
              Proceed
            </button>
          </Link>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default Ren;
          