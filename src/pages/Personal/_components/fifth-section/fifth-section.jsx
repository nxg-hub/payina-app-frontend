// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import section5 from './../../../../assets/images/section-four.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShareButton from '../../../../utilities/ShareButton';
import axios from 'axios';

const FifthSection = () => {
  const [refer, setRefer] = useState(false);
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: (Math.random() - 0.5) * 20, // Moves randomly within 20px range
        y: (Math.random() - 0.5) * 20,
      });
    }, 1000); // Change position every second

    return () => clearInterval(interval);
  }, []);

  const generatePromoCode = async () => {
    if (email === '') {
      setError('Email is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        import.meta.env.VITE_GENERATE_GUEST_PROMOCODE,
        {
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setPromoCode(response.data);
        setSuccess('Promo Code Successfully Generated!');
        setTimeout(() => setSuccess(''), 10000);
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong: Failed to generate Promo code.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <div className="bg-lightBlue pt-16 flex flex-col-reverse justify-between lg:flex-row items-center px-16">
        <div className="">
          <img src={section5} alt="" />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-[36px] text-primary md:text-[48px] ">One Login </p>
          <p className="font-bold text-[36px] text-primary text-center md:text-[48px] ">
            Infinite Possibilities{' '}
          </p>
          <Link to="/onboarding/email_verification">
            <button className="bg-[white] w-[200px] rounded-md font-medium md:my-6 my-8 mx-auto py-3 text-[#000]">
              Get Started
            </button>
          </Link>
        </div>
        <div className="md:w-[40%] m-auto ">
          <motion.button
            onClick={() => {
              setRefer(true);
            }}
            className="px-6 py-3 bg-yellow text-white font-semibold rounded-2xl shadow-lg
            hover:bg-orange-300 transition-all"
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 100, damping: 8 }}>
            Refer and Earn!
          </motion.button>
          {refer && (
            <div className="w-full mt-5">
              <label className=" font-bold text-white">Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter email..."
                className="w-full border rounded-md py-2 px-2 outline-none"
              />
              <button
                onClick={generatePromoCode}
                className="bg-[#00405A] text-white font-semibold px-4 py-2 rounded-md mt-4 block mb-4  hover:bg-[#468A9B] transition-all">
                {loading ? 'loading...' : 'Submit'}
              </button>
              {error && <h2 className="text-red-500">{error}</h2>}
              {success && <h2 className="text-green-500">{success}</h2>}
              {promoCode && <ShareButton promoCode={promoCode} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FifthSection;
// [#00516C]