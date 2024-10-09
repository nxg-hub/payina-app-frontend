import React from 'react';
import Navbar from '../../components/navbar/navbar';
import  { Link} from  'react-router-dom';
import Footer from '../../components/footer/footer';




const ChooseNetwork = () => {
    return (
      <section className="text-primary w-full h-screen">
       <Navbar className="pt-6" />
       <div className=" container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-7 bg-yellow">
            </div>
            <button className="text-primary mt-[25] text-left p-10 border-none rounded-[5px]
             w-[64%] bg-neutral px-4 py-2">Review your Order
            </button>
            <div className=" flex px-5 gap-4">
             <p className="pt-8  pr-5 text-sm">Product</p> 
              <div className=" w-[42%] mt-24 h-1  ml-5 border-none
                     bg-yellow"></div>
               <p className="pt-8 pl-5 text-sm">Airtime</p>
            </div>
            <div className=" flex px-5 gap-4">
             <p className="pt-8  pr-5 text-sm">Network</p>
              <div className=" w-[42%] mt-24 ml-5 h-1 border-none
                     bg-yellow"></div>
               <p className="pt-8 pl-5 text-sm">Mtn</p>
            </div>
            <div className=" flex   gap-4">
             <p className="pt-8 pl-5 text-sm">Phone number</p>
              <div className=" w-[40%] mt-24 h-1 border-none
                     bg-yellow"></div>
               <p className="pt-8 text-sm">09087890765</p>
            </div>
            <div className=" flex justify-start  gap-4">
             <p className="pt-8 pl-5 text-sm">Amount</p>
              <div className=" w-[40%] mt-24 h-[1] border-none
                     bg-yellow"></div>
               <p className="pt-8 pl-14 text-sm">200</p>
            </div>
            <div>
               <Link to="/reviewAirtime" >
                 <button className="text-primary mb-10 text-left px-16 py-4 
                    border-none rounded-[5px] bg-lightBlue cursor-pointer
                     hover:bg-neutral transition-all duration-200 ">
                        Proceed
                    </button>
                    </Link>
            </div>
           </div>
           <div className="pt[-10]">
              <Footer />
              </div>
            </section>
    )
}

export default ChooseNetwork;
