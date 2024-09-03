import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/Cards'
import { IoCallOutline } from "react-icons/io5";
import { IoWifi } from "react-icons/io5";
import { RiCurrencyFill } from "react-icons/ri";
import { moneyBack, support, watchIcon } from '../../constants/images';
import { Link, useLocation } from 'react-router-dom';


const Paybills = () => {
  return (
        
        <section>
        <Navbar />
        <div className=" w-full h-screen  text-center ">
            <div className="w-[80%] h-1 border-none mr-auto ml-auto 
            mt-[-2px] mb-40 bg-yellow">
            </div>
                <p className=" mt-[-100px] text-lightBlue font-sans text-6xl font-bold">
                Buy Data, Airtime and Pay</p> 
                 <p className="pt-5 py-12 text-lightBlue text-6xl  font-sans font-bold">
                 Bills Instantly</p> 
            
                <p className=" text-2xl font-sans font-bold  text-primary">
                We Guarantee</p>
                <div className="mt-4 w-[50%] h-1 border-none mr-auto ml-auto
                    mb-40 bg-yellow">
                        <div className="  pt-10 flex-1 font-bold flex justify-between items-center my-10">
                <div className=" flex pr-20 flex-col items-center text-center relative  text-primary">
                    <img 
                    height={64}
                    width={64}
                    src={watchIcon}
                    alt="watch-icon"
                    className="py-4"
                    />
                    <p>instant delivery</p>
                </div>
                <div className="text-primary flex flex-col items-center text-rightrelative">
                    <img 
                     height={64}
                    width={64}
                    src={support}
                    alt="support icon"
                    className="py-4"
                    />
                    <h2>24/7 Customer Support</h2>
                </div>
                <div className=" mt-1 text-primary flex flex-col items-center text-center relative">
                    <img 
                     height={72}
                    width={72}
                    src={moneyBack}
                    alt="moneyback"
                    className="py-5"
                    />
                    <h2 className="pt-2 pl-2">100% Refund if value <br /> 
                    is not delivered</h2>
                </div>
                </div>
                    </div>
                
                <div className="flex px-20 flex-1 pt-20 pb-10 text-white justify-between items-right">
                           
                           <Link to="/airtime">
                            <Cards  icon= <IoCallOutline size={30}color="white" /> title="Buy Airtime"/>
                            </Link>
                            <Link to="/card">
                            <Cards icon= <IoWifi size={30} color="white" /> title="Buy Data" />
                            </Link>
                            <Cards icon= <RiCurrencyFill  size={30} color="white" /> title=" PayBills"/>
                </div>
                <div className="mt-4">
                 <Footer  />
                </div>
        
            </div>
       
    </section>
  );
  };













        
    


export default Paybills
