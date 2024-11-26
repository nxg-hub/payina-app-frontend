import React from 'react';

const ServiceImages = ({ selectedService, selectedBiller, onBillerSelect }) => {

  const serviceImages = {
    BETTING_AND_LOTTERY: {
      BET9JA: '/src/assets/images/Bet9ja_Logo.svg',
      '1XBET': '/src/assets/images/bet5.png',
      NAIRABET: '/src/assets/images/bet4.png',
      BETKING: '/src/assets/images/bet4.png',
    },
    PAY_TV: {
      DSTV: '/src/assets/images/DSTVLogo.jpeg',
      GOTV: '/src/assets/images/GOTV.png',
      STARTIMES: '/src/assets/images/startimes.png',
      SHOWMAX: '/src/assets/images/showmax logo.png',
    },
    ELECTRIC_DISCO: {
      EKEDC: '/src/assets/images/ekedc.png',
      AEDC: '/src/assets/images/AEDC-LOGO_.png',
      PHED_2: '/src/assets/images/PHEDC.png',
      IKEDC: '/src/assets/images/Ikeja-Electric-Logo.png',
    },
    AIRTIME_AND_DATA: {
      MTN: '/path/to/mtn.png',
      AIRTEL: '/path/to/airtel.png',
      GLO: '/path/to/glo.png',
      '9MOBILE': '/path/to/9mobile.png',
    },
    ENTERTAINMENT_AND_LIFESTYLE: {
      NETFLIX: '/path/to/netflix.png',
      SPOTIFY: '/path/to/spotify.png',
      APPLE: '/path/to/apple.png',
    },
    // Add more categories as needed
  };

  const renderBillerImage = (billerSlug, name) => (
    <div
      key={billerSlug}
      className={`flex-col cursor-pointer ${
        selectedBiller?.slug === billerSlug ? 'border-2 border-yellow p-2 rounded' : ''
      }`}
      onClick={() => onBillerSelect(billerSlug)}>
      <img
        height={58}
        width={58}
        src={serviceImages[selectedService]?.[billerSlug]}
        alt={name}
        className="object-contain"
      />
      <p className="text-center mt-2 text-sm">{name}</p>
    </div>
  );

  const getServiceLayout = () => {
    const images = serviceImages[selectedService];
    if (!images) return null;

    const billerSlugs = Object.keys(images);

    // Split images into rows of 3
    const rows = [];
    for (let i = 0; i < billerSlugs.length; i += 3) {
      const row = billerSlugs.slice(i, i + 3);
      rows.push(
        <div key={i} className="flex justify-center gap-36 mt-10">
          {row.map((slug) => {
            const name = slug.charAt(0) + slug.slice(1).toLowerCase().replace(/_/g, ' ');
            return renderBillerImage(slug, name);
          })}
        </div>
      );
    }

    return rows;
  };

  return <div className="mb-10 text-lightBlue">{getServiceLayout()}</div>;
};

export default ServiceImages;


// import React from 'react';
//
// // Import all images
// import bet9jaLogo from '../assets/images/Bet9ja_Logo.svg';
// import sportyLogo from '../assets/images/bet6.png';
// import xbetLogo from '../assets/images/bet5.png';
// import nairabetLogo from '../assets/images/bet4.png';
// import bet22Logo from '../assets/images/bet1.png';
// import betkingLogo from '../assets/images/bet4.png';
// import dstvLogo from '../assets/images/DSTV logo.svg';
// import gotvLogo from '../assets/images/GO TV Logo.png';
// import startimesLogo from '../assets/images/startimes.png';
// import showmaxLogo from '../assets/images/showmax logo.png';
// import ikedcLogo from '../assets/images/Ikeja-Electric-Logo.png';
// import ekedcLogo from '../assets/images/ekedc.png';
//
// const ServiceImages = ({ selectedService, selectedBiller, onBillerSelect }) => {
//   const serviceImages = {
//     BETTING_AND_LOTTERY: {
//       BET9JA: bet9jaLogo,
//       SPORTY: sportyLogo,
//       '1XBET': xbetLogo,
//       NAIRABET: nairabetLogo,
//       '22BET': bet22Logo,
//       BETKING: betkingLogo,
//     },
//     PAY_TV: {
//       DSTV: dstvLogo,
//       GOTV: gotvLogo,
//       STARTIMES: startimesLogo,
//       SHOWMAX: showmaxLogo,
//     },
//     ELECTRIC_DISCO: {
//       IKEDC: ikedcLogo,
//       EKEDC: ekedcLogo,
//       AEDC: '/api/placeholder/58/58', // Placeholder for missing image
//       PHED: '/api/placeholder/58/58', // Placeholder for missing image
//     },
//     AIRTIME_AND_DATA: {
//       MTN: '/api/placeholder/58/58',
//       AIRTEL: '/api/placeholder/58/58',
//       GLO: '/api/placeholder/58/58',
//       '9MOBILE': '/api/placeholder/58/58',
//     },
//     ENTERTAINMENT_AND_LIFESTYLE: {
//       NETFLIX: '/api/placeholder/58/58',
//       SPOTIFY: '/api/placeholder/58/58',
//       APPLE: '/api/placeholder/58/58',
//     },
//   };
//
//   const renderBillerImage = (billerSlug, name) => (
//     <div
//       key={billerSlug}
//       className={`flex-col cursor-pointer ${
//         selectedBiller?.slug === billerSlug ? 'border-2 border-yellow p-2 rounded' : ''
//       }`}
//       onClick={() => onBillerSelect(billerSlug)}
//     >
//       <img
//         height={58}
//         width={58}
//         src={serviceImages[selectedService]?.[billerSlug]}
//         alt={name}
//         className="object-contain"
//       />
//       <p className="text-center mt-2 text-sm">{name}</p>
//     </div>
//   );
//
//   const getServiceLayout = () => {
//     const images = serviceImages[selectedService];
//     if (!images) return null;
//
//     const billerSlugs = Object.keys(images);
//
//     // Split images into rows of 3
//     const rows = [];
//     for (let i = 0; i < billerSlugs.length; i += 3) {
//       const row = billerSlugs.slice(i, i + 3);
//       rows.push(
//         <div key={i} className="flex justify-center gap-36 mt-10">
//           {row.map((slug) => {
//             const name = slug.charAt(0) + slug.slice(1).toLowerCase().replace(/_/g, ' ');
//             return renderBillerImage(slug, name);
//           })}
//         </div>
//       );
//     }
//
//     return rows;
//   };
//
//   return <div className="mb-10 text-lightBlue">{getServiceLayout()}</div>;
// };
//
// export default ServiceImages;