import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Footer from '../../components/footer/footer';
import network_providers from "../../assets/network_providers";
import { FifthSection } from "../Business/_components";
import * as http from "node:http";

const Airtime = () => {
    const [selectedNetwork, setSelectedNetwork] = useState(network_providers.MTN);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleAirtimePurchase = async () => {
        try {
            let response = await fetch('http://api.......', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    network: selectedNetwork,
                    phoneNumber,
                    amount,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Airtime purchase successful!');
            } else {
                alert(`Failed to purchase airtime: ${data.message}`);
            }
        } catch (error) {
            console.error('Error purchasing airtime:', error);
            alert('There was an error processing your request.');
        }
    };

    return (
        <section className="text-primary w-full h-screen">
            <Navbar className="pt-6" />
            <div className="container">
                <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
                <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
                    Buy Airtime & get Cashback
                </p>
                <form onSubmit={(e) => { e.preventDefault(); handleAirtimePurchase(); }}>
                    <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral px-4 py-2">
                        Want to enjoy discounts?
                        <span className="text-yellow"> Register</span> or <span className=" text-yellow">
                            Login</span>
                    </button>
                    <div className="flex flex-col w-[64%]">
                        <label className="py-4">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                        />
                    </div>
                    <div className="flex flex-col w-[64%]">
                        <label className="py-4">Select Network</label>
                        <select
                            id="network"
                            value={selectedNetwork}
                            onChange={(e) => setSelectedNetwork(e.target.value)}
                            className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                        >
                            {Object.keys(network_providers).map((network) => (
                                <option key={network} value={network_providers[network]}>
                                    {network_providers[network]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col w-[64%]">
                        <label className="py-4">Phone</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                        />
                    </div>
                    <div className="flex flex-col w-[64%]">
                        <label className="py-4">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border-2 mb-8 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-primary mb-10 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
                    >
                        Proceed
                    </button>
                </form>
            </div>
            <div className="pt[-10]">
                <Footer />
            </div>
        </section>
    );
}

export default Airtime;
