import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../Redux/modalSlice';
import { CiGift } from 'react-icons/ci';
import ShareButton from '../utilities/ShareButton';
import axios from 'axios';

const InviteModal = () => {
  const showModal = useSelector((state) => state.modal.showModal);
  const dispatch = useDispatch();
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
        `${import.meta.env.VITE_GENERATE_USER_PROMOCODE}/${id}`,

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

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#005978] rounded-lg shadow-lg p-6 w-[90%] md:w-96 text-white">
        <CiGift className="m-auto" size={40} />
        <h2 className=" font-bold mb-4 text-center text-blue-100  mt-2">
          Get paid referring other business!
        </h2>
        <p className="mb-4 text-gray-700 text-center">
          Earn up to ₦10,000 monthly when you invite your friends to signup, complete registration
          and make transactions.
        </p>
        <div className="mt-5 w-full flex flex-col items-center">
          <button
            disabled={loading}
            onClick={generatePromoCode}
            className="px-4 py-2 bg-gradient-to-br from-white via-blue-100 to-blue-300 font-bold text-black rounded-md mb-11 hover:bg-purple-600 transition-all">
            {loading ? 'loading...' : 'Get Promo Code'}
          </button>
          {error && <h2 className="text-red-500">{error}</h2>}
          {success && <h2 className="text-green-500">{success}</h2>}
          {promoCode && <ShareButton promoCode={promoCode} type={'dash'} />}
        </div>
        <button
          onClick={() => dispatch(hideModal())}
          className="mt-4 m-auto bg-gradient-to-br from-white via-blue-100 to-blue-300 text-black font-bold px-4 py-2 rounded ">
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
