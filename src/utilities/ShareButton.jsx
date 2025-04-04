import axios from 'axios';
import { useState } from 'react';
import { FaWhatsapp, FaTelegram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ShareButton = ({ promoCode }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Message for WhatsApp & Telegram

  // Message for LinkedIn, Twitter, and Facebook
  const promoMessageOtherPlatforms = `
 🔥 Payina is here – Your Smartest Payment App! 🔥

 Tired of hidden fees? Switch to Payina for:
 ✔ Zero charge instant inhouse transfers
 ✔ Scan & Pay with ease
 ✔ Airtime Chargeback Guarantee – Get refunds instantly
 ✔ ₦10,000 Rewards for New Users when you refer a friend🎉

 💰 Sign up & claim your reward!
 👉 https://payina.com.ng
 📲 Use Referral Code: ${promoCode}

 💡 Share this with your friends and start earning today! 🚀

 #Payina #SmartPayments #Fintech #Innovation
 `;
  // Message for WhatsApp & Telegram
  const promoMessageWhatsAppTelegram = `
 🚀 Payina App is Live!
 💰 Get up to ₦10,000 when you sign up & share!

 💳 Why Payina?
 ✅ Affordable bill payments – No hidden fees
 ✅ Scan to Pay – Quick & secure
 ✅ Instant transfers – No extra charges
 ✅ Business automation tools 💼
 ✅ Chargebacks on Airtime – Get refunds instantly!

 📲 Join now & use my referral code: ${promoCode}
 👉 https://payina.com.ng

 Let's make payments smarter! 🚀💡 #Payina #Fintech
 `;

  const getShareLink = (platform) => {
    const encodedWhatsAppTelegram = encodeURIComponent(promoMessageWhatsAppTelegram);
    const encodedOtherPlatforms = encodeURIComponent(promoMessageOtherPlatforms);
    const encodedURL = encodeURIComponent('https://payina.com.ng');

    switch (platform) {
      case 'whatsapp':
        return `https://wa.me/?text=${encodedWhatsAppTelegram}`;
      case 'telegram':
        return `https://t.me/share/url?url=${encodedURL}&text=${encodedWhatsAppTelegram}`;
      case 'linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedOtherPlatforms}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodedOtherPlatforms}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}&quote=${encodedWhatsAppTelegram}`;
      default:
        return '';
    }
  };

  const shareContent = async (platform) => {
    const shareLink = getShareLink(platform);

    if (shareLink) {
      setLoading(true);
      try {
        const response = await axios.post(
          import.meta.env.VITE_USE_PROMOCODE, // API endpoint
          { code: promoCode }, // Corrected payload
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          window.open(shareLink, '_blank');
          setLoading(false);
        }
      } catch (err) {
        console.error('API call failed:', err);
      } finally {
        setShowOptions(false); // Hide dropdown after selection
        setLoading(false);
      }
    } else {
      console.error('Unsupported platform');
    }
  };

  return (
    <div className="relative inline-block">
      <button
        className="px-6 py-3 bg-[#00405A] text-white  font-semibold rounded-lg shadow-lg hover:bg-[#468A9B] transition-all"
        onClick={() => setShowOptions(!showOptions)}>
        Share Promo Code
      </button>

      {showOptions && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="text-gray-800">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => shareContent('whatsapp')}>
              <span className="flex w-[80%] m-auto justify-between items-center">
                WhatsApp
                <FaWhatsapp />
              </span>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer "
              onClick={() => shareContent('linkedin')}>
              <span className="flex w-[80%] m-auto justify-between items-center">
                LinkedIn
                <FaLinkedin />
              </span>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => shareContent('twitter')}>
              <span className="flex w-[80%] m-auto justify-between items-center">
                Twitter
                <FaTwitter />
              </span>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => shareContent('facebook')}>
              <span className="flex w-[80%] m-auto justify-between items-center">
                Facebook
                <FaFacebook className="items-center" />
              </span>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => shareContent('telegram')}>
              <span className="flex w-[80%] m-auto justify-between items-center">
                Telegram
                <FaTelegram />
              </span>
            </li>
          </ul>
          {loading && <h2 className="text-center mb-2">Loading...</h2>}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
