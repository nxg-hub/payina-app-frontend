import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShareButton from '../../../../utilities/ShareButton';
import { CiGift } from 'react-icons/ci';
import axios from 'axios';

const Invite = () => {
  const [success, setSuccess] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userDetails = useSelector((state) => state.user.user);
  const id = userDetails?.customerId;
  const generatePromoCode = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GENERATE_USER_PROMOCODE}/${id}`,

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
    <div className=" px-4 py-4 mx-auto w-auto ml-0 xl:ml-[19rem] xl:pt-28 clear-none xl:clear-right">
      <div className=" rounded-lg shadow-lg p-6 w-[90%] md:w-96 text-black m-auto mt-11">
        <CiGift className="m-auto" size={40} />
        <h2 className="mt- text-center font-bold md:text-2xl">Refer and Earn!</h2>
        <h2 className=" font-bold mb-4 text-center mt-2">Get paid referring other business.</h2>
        <p className="mb-4 text-gray-700 text-center">
          Earn up to ₦10,000 monthly when you invite your friends to signup, complete registration
          and make transactions.
        </p>
        <div className="mt-5 w-full flex flex-col items-center">
          <button
            disabled={loading}
            onClick={generatePromoCode}
            className="px-4 py-2 bg-[#468A9B] font-bold text-white rounded-md mb-11 hover:bg-[#006181] transition-all">
            {loading ? 'loading...' : 'Get Promo Code'}
          </button>
          {error && <h2 className="text-red-500">{error}</h2>}
          {success && <h2 className="text-green-500">{success}</h2>}
          {promoCode && <ShareButton promoCode={promoCode} />}
        </div>
      </div>
    </div>
  );
};

export default Invite;
