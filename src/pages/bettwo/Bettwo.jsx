// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import { bet1, bet2, bet3, bet4, bet5, bet6 } from '../../constants/images';
//
// const Bettwo = () => {
//   const location = useLocation();
//   const { slug, formValues } = location.state || {};
//   const [bettingDetails, setBettingDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchBettingDetails = async () => {
//       if (slug) {
//         setIsLoading(true);
//         setError(null);
//         try {
//           const response = await fetch(`https://payina-wallet-service-api.onrender.com/api/v1/vas/biller-enquiry-slug/{slug}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch betting details');
//           }
//           const data = await response.json();
//           setBettingDetails(data);
//         } catch (error) {
//           console.error('Error fetching betting details:', error);
//           setError(error.message);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };
//
//     fetchBettingDetails();
//   }, [slug]);
//
//   return (
//     <section>
//       <Navbar />
//       <div className="container">
//         <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
//         <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
//           Buy Data & get Cashback
//         </p>
//         <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral mb-3 px-4 py-2">
//           Want to enjoy discounts?
//           <span className="text-yellow"> Register</span> or{' '}
//           <span className="text-yellow">Login</span>{' '}
//         </button>
//         <p className="text-primary mb-3 mt-2">Popular Platforms</p>
//         <div className="mb-10 text-lightBlue">
//           <div className="flex gap-36">
//             <div className="flex-col">
//               <img height={58} width={58} src={bet3} alt="" />
//               <p>Bet 9ja</p>
//             </div>
//             <div className="flex-col">
//               <img height={58} width={58} src={bet6} alt="" />
//               <p>Sporty</p>
//             </div>
//             <div className="flex-col">
//               <img height={58} width={58} src={bet5} alt="" />
//               <p>1x Bet</p>
//             </div>
//           </div>
//           <div className="flex mt-10 gap-36">
//             <div className="flex-col">
//               <img height={58} width={58} src={bet4} alt="" />
//               <p>Naira Bet</p>
//             </div>
//             <div className="flex-col">
//               <img height={58} width={58} src={bet1} alt="bet-icon" />
//               <p>22 Bet</p>
//             </div>
//             <div className="flex-col">
//               <img height={58} width={58} src={bet2} alt="bet-icon" />
//               <p>Bet King</p>
//             </div>
//           </div>
//         </div>
//         <div className="flex-col">
//           <p className="text-primary">Chosen Betting Platform</p>
//           <button className="text-black text-sm text-left p-10 border-none rounded-[5px] w-[64%] bg-primary mb-3 mt-3 px-4 py-2">
//             {formValues?.selectedBettingService || 'No service selected'}
//             <FontAwesomeIcon
//               icon={faChevronDown}
//               color="teal"
//               className="absolute pl-[16%] md:pl-[51%] min-w-1 items-center mt-1 cursor-pointer"
//             />
//           </button>
//         </div>
//         {isLoading && <p>Loading betting details...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}
//         {bettingDetails && (
//           <div className="mt-5 mb-5">
//             <h2 className="text-2xl font-bold text-lightBlue">Betting Details</h2>
//             <p className="text-primary">Name: {bettingDetails.name}</p>
//             <p className="text-primary">Slug: {bettingDetails.slug}</p>
//             {/* Add more details as needed */}
//           </div>
//         )}
//         <Link to="/bethree">
//           <button className="text-primary mb-10 mt-5 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200">
//             Proceed to Bethree
//           </button>
//         </Link>
//       </div>
//       <div className="mt-2">
//         <Footer />
//       </div>
//     </section>
//   );
// };
//
// export default Bettwo;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../../components/navbar/navbar';
// import Footer from '../../components/footer/footer';
// import { bet1, bet2, bet3, bet4, bet5, bet6 } from '../../constants/images';
// import axios from 'axios';
//
// const Bettwo = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { email } = location.state || {};
//   const [billerOptions, setBillerOptions] = useState([]);
//   const [selectedBiller, setSelectedBiller] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [customerReference, setCustomerReference] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//
//   const billerImages = {
//     BET9JA: bet3,
//     SPORTY: bet6,
//     '1XBET': bet5,
//     NAIRABET: bet4,
//     '22BET': bet1,
//     BETKING: bet2,
//   };
//
//   useEffect(() => {
//     const fetchBillerOptions = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get('https://payina-wallet-service-api.onrender.com/api/v1/vas/biller-enquiry-slug/BETTING_AND_LOTTERY');
//         const services = response.data.responseData;
//         console.log('Fetched biller options:', services);
//         setBillerOptions(services);
//       } catch (error) {
//         console.error('Error fetching biller options:', error);
//         setError('Failed to fetch biller options. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchBillerOptions();
//   }, []);
//
//   const handleBillerChange = (e) => {
//     const selectedBillerSlug = e.target.value;
//     console.log('Selected biller slug:', selectedBillerSlug);
//     const selectedBillerObj = billerOptions.find(biller => biller.slug === selectedBillerSlug);
//     console.log('Selected biller object:', selectedBillerObj);
//     setSelectedBiller(selectedBillerObj || null);
//   };
//
//   const handleImageClick = (billerSlug) => {
//     console.log('Image clicked for biller:', billerSlug);
//     const selectedBillerObj = billerOptions.find(biller => biller.slug === billerSlug);
//     if (selectedBillerObj) {
//       console.log('Setting selected biller to:', selectedBillerObj);
//       setSelectedBiller(selectedBillerObj);
//     } else {
//       console.log('No matching biller found for slug:', billerSlug);
//     }
//   };
//
//   const handleAmountChange = (e) => {
//     setAmount(e.target.value);
//   };
//
//   const handleCustomerReferenceChange = (e) => {
//     setCustomerReference(e.target.value);
//   };
//
//   const handleProceed = () => {
//     console.log('Proceeding with transaction:', { selectedBiller, amount, customerReference, email });
//
//     navigate('/befour', {
//       state: { selectedBiller, amount, customerReference, email }
//     });
//   };
//
//   useEffect(() => {
//     console.log('Current selectedBiller:', selectedBiller);
//   }, [selectedBiller]);
//
//   const renderBillerImage = (billerSlug, name) => (
//     <div
//       key={billerSlug}
//       className={`flex-col cursor-pointer ${selectedBiller?.slug === billerSlug ? 'border-2 border-yellow p-2 rounded' : ''}`}
//       onClick={() => handleImageClick(billerSlug)}
//     >
//       <img height={58} width={58} src={billerImages[billerSlug]} alt={name} />
//       <p>{name}</p>
//     </div>
//   );
//
//   return (
//     <section>
//       <Navbar />
//       <div className="container">
//         <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
//         <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
//           Buy Data & get Cashback
//         </p>
//         <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral mb-3 px-4 py-2">
//           Want to enjoy discounts?
//           <span className="text-yellow"> Register</span> or{' '}
//           <span className="text-yellow">Login</span>{' '}
//         </button>
//         <p className="text-primary mb-3 mt-2">Popular Platforms</p>
//
//         {/* Images Grid */}
//         <div className="mb-10 text-lightBlue">
//           <div className="flex gap-36">
//             {renderBillerImage('BET9JA', 'Bet 9ja')}
//             {renderBillerImage('SPORTY', 'Sporty')}
//             {renderBillerImage('1XBET', '1x Bet')}
//           </div>
//           <div className="flex mt-10 gap-36">
//             {renderBillerImage('NAIRABET', 'Naira Bet')}
//             {renderBillerImage('22BET', '22 Bet')}
//             {renderBillerImage('BETKING', 'Bet King')}
//           </div>
//         </div>
//
//         {/* Dropdown for Biller Selection */}
//         <div className="flex-col">
//           <label htmlFor="biller-select" className="block text-primary mb-2">
//             Chosen Betting Platform
//           </label>
//           <select
//             id="biller-select"
//             value={selectedBiller?.slug || ''}
//             onChange={handleBillerChange}
//             className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3">
//             <option value="">Select a betting platform</option>
//             {billerOptions.map((biller) => (
//               <option key={biller.slug} value={biller.slug}>
//                 {biller.name}
//               </option>
//             ))}
//           </select>
//         </div>
//
//         {/* Amount and Customer Reference Inputs */}
//         <div className="flex-col">
//           <label htmlFor="amount" className="block text-primary mb-2">
//             Amount
//           </label>
//           <input
//             id="amount"
//             type="number"
//             value={amount}
//             onChange={handleAmountChange}
//             className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3"
//             placeholder="Enter amount"
//           />
//         </div>
//
//         <div className="flex-col">
//           <label htmlFor="customer-reference" className="block text-primary mb-2">
//             Customer Reference
//           </label>
//           <input
//             id="customer-reference"
//             type="text"
//             value={customerReference}
//             onChange={handleCustomerReferenceChange}
//             className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3"
//             placeholder="Enter customer reference"
//           />
//         </div>
//
//         {/* Display Email from Betone */}
//         <div className="flex-col">
//           <label className="block text-primary mb-2">Email</label>
//           <p className="text-slate-600 mb-3">{email || 'No email provided'}</p>
//         </div>
//
//         {isLoading && <p className="text-primary">Loading...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}
//
//         <button
//           onClick={handleProceed}
//           className="text-primary mb-10 mt-5 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
//           disabled={!selectedBiller || !amount || !customerReference || !email || isLoading}>
//           Proceed
//         </button>
//       </div>
//       <Footer />
//     </section>
//   );
// };
//
// export default Bettwo;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { bet1, bet2, bet3, bet4, bet5, bet6 } from '../../constants/images';
import axios from 'axios';

const Bettwo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [billerOptions, setBillerOptions] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [amount, setAmount] = useState('');
  const [customerReference, setCustomerReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const billerImages = {
    BET9JA: bet3,
    SPORTY: bet6,
    '1XBET': bet5,
    NAIRABET: bet4,
    '22BET': bet1,
    BETKING: bet2,
  };

  useEffect(() => {
    const fetchBillerOptions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://payina-wallet-service-api.onrender.com/api/v1/vas/biller-enquiry-slug/BETTING_AND_LOTTERY');
        const services = response.data.responseData;
        console.log('Fetched biller options:', services);
        setBillerOptions(services);
      } catch (error) {
        console.error('Error fetching biller options:', error);
        setError('Failed to fetch biller options. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillerOptions();
  }, []);

  const handleBillerChange = (e) => {
    const selectedBillerSlug = e.target.value;
    const selectedBillerObj = billerOptions.find(biller => biller.slug === selectedBillerSlug);
    setSelectedBiller(selectedBillerObj || null);
  };

  const handleImageClick = (billerSlug) => {
    const selectedBillerObj = billerOptions.find(biller => biller.slug === billerSlug);
    if (selectedBillerObj) {
      setSelectedBiller(selectedBillerObj);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCustomerReferenceChange = (e) => {
    setCustomerReference(e.target.value);
  };
  useEffect(() => {
    console.log('Email received in Bettwo:', email);
  }, [email]);

  const handleProceed = () => {
    navigate('/befour', {
      state: { selectedBiller, amount, customerReference, email }
    });
  };

  const renderBillerImage = (billerSlug, name) => (
    <div
      key={billerSlug}
      className={`flex-col cursor-pointer ${selectedBiller?.slug === billerSlug ? 'border-2 border-yellow p-2 rounded' : ''}`}
      onClick={() => handleImageClick(billerSlug)}
    >
      <img height={58} width={58} src={billerImages[billerSlug]} alt={name} />
      <p>{name}</p>
    </div>
  );

  return (
    <section>
      <Navbar />
      <div className="container">
        <div className="w-[80%] h-1 border-none mr-auto ml-auto mt-[-2px] mb-40 bg-yellow"></div>
        <p className="mt-[-120px] pb-8 text-6xl text-center font-extrabold text-lightBlue">
          Buy Data & get Cashback
        </p>
        <button className="text-primary text-left p-10 border-none rounded-[5px] w-[64%] bg-neutral mb-3 px-4 py-2">
          Want to enjoy discounts?
          <span className="text-yellow"> Register</span> or{' '}
          <span className="text-yellow">Login</span>{' '}
        </button>
        <p className="text-primary mb-3 mt-2">Popular Platforms</p>

        {/* Images Grid */}
        <div className="mb-10 text-lightBlue">
          <div className="flex gap-36">
            {renderBillerImage('BET9JA', 'Bet 9ja')}
            {renderBillerImage('SPORTY', 'Sporty')}
            {renderBillerImage('1XBET', '1x Bet')}
          </div>
          <div className="flex mt-10 gap-36">
            {renderBillerImage('NAIRABET', 'Naira Bet')}
            {renderBillerImage('22BET', '22 Bet')}
            {renderBillerImage('BETKING', 'Bet King')}
          </div>
        </div>

        {/* Dropdown for Biller Selection */}
        <div className="flex-col">
          <label htmlFor="biller-select" className="block text-primary mb-2">
            Chosen Betting Platform
          </label>
          <select
            id="biller-select"
            value={selectedBiller?.slug || ''}
            onChange={handleBillerChange}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3">
            <option value="">Select a betting platform</option>
            {billerOptions.map((biller) => (
              <option key={biller.slug} value={biller.slug}>
                {biller.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount and Customer Reference Inputs */}
        <div className="flex-col">
          <label htmlFor="amount" className="block text-primary mb-2">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex-col">
          <label htmlFor="customer-reference" className="block text-primary mb-2">
            Customer Reference
          </label>
          <input
            id="customer-reference"
            type="text"
            value={customerReference}
            onChange={handleCustomerReferenceChange}
            className="border-2 border-slate-400 rounded-[5px] px-4 py-2 bg-black text-slate-600 w-[64%] mb-3"
            placeholder="Enter customer reference"
          />
        </div>

        {isLoading && <p className="text-primary">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <button
          onClick={handleProceed}
          className="text-primary mb-10 mt-5 text-left px-16 py-4 border-none rounded-[5px] bg-lightBlue cursor-pointer hover:bg-neutral transition-all duration-200"
          disabled={!selectedBiller || !amount || !customerReference || !email || isLoading}>
          Proceed
        </button>
      </div>
      <Footer />
    </section>
  );
};

export default Bettwo;

