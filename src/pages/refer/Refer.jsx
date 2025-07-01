import { useState } from 'react';
import { motion } from 'framer-motion';
import ShareButton from '../../utilities/ShareButton';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
const Refer = () => {
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePromoCode = async () => {
    if (email === '') {
      setError('Email is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GENERATE_GUEST_PROMOCODE}`,
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
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      <div className=" relative bottom-9 ">
        <img className="md:w-[350px]" src={logo} alt="" />
      </div>
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-[#00AEEF]">Refer and Earn</h1>
        <p className="text-sm text-gray-300">
          Enter your email to get a promo code. Share it with your friends and earn rewards!
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black py-3 px-5 w-[300px] rounded-xl"
          />
          <button
            onClick={generatePromoCode}
            className="w-[80%] py-3 px-5 rounded-xl bg-[#FECF0A] text-black hover:bg-yellow-400">
            {loading ? 'Processing...' : 'Generate Promo Code'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3">
          {promoCode && (
            <p className="text-lg font-semibold text-[#00AEEF]">
              Your Code: <span className="text-white">{promoCode}</span>
            </p>
          )}
          {error && <h2 className="text-red-500">{error}</h2>}
          {success && <h2 className="text-green-500">{success}</h2>}
          {promoCode && <ShareButton promoCode={promoCode} />}
        </motion.div>
      </div>
    </section>
  );
};
export default Refer;
