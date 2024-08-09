import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import Cards from '../../components/cards/Cards'
import { IoCallOutline } from "react-icons/io5";
import { IoWifi } from "react-icons/io5";
import { RiCurrencyFill } from "react-icons/ri";




const Paybills = () => {
    
    return (
        <section>
        <Navbar />
        <div className=" w-full h-screen  text-center ">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto 
        mt-[-10px] mb-40 bg-yellow">
        </div>
                <p className=" mt-[-100px] text-lightBlue font-sans text-6xl font-bold">
                Buy Data, Airtime and Pay</p> 
                 <p className="pt-5 py-12 text-lightBlue text-6xl  font-sans font-bold">
                 Bills Instantly</p> 
            
                <p className=" text-2xl font-sans font-bold  text-primary">
                We Guarantee</p>
                <div className="mt-4 w-[50%] h-1 border-none mr-auto ml-auto
                    mb-40 bg-yellow"></div>
                    </div>
                  
                    
                        
                        <div className=" flex px-20 py-20 text-white justify-between items-right">
                         <Cards  icon= <IoCallOutline size={30}color="white" /> title="Buy Airtime"/>
                         <Cards icon= <IoWifi size={30} color="white" /> title="Buy Data" />
                         <Cards icon= <RiCurrencyFill  size={30} color="white" /> title=" PayBills"/>
                        </div>
                        
                 <Footer className="pt-2" />
        </section>












        
    )
}

export default Paybills
