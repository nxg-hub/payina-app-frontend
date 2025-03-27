import React from 'react';

const ServiceImages = ({ selectedService, selectedBiller, onBillerSelect }) => {

  const serviceImages = {
    BETTING_AND_LOTTERY: {
      BET9JA: 'https://i.ibb.co/ym6zHGmp/bet3.png',
      '1XBET': 'https://i.ibb.co/HpMMfGmH/bet5.png',
      NAIRABET: 'https://i.ibb.co/gbwFfj68/bet4.png',
      BETKING: 'https://i.ibb.co/WWrzrDkG/bet2.png',
    },

    // https://i.ibb.co/wZmcrDRw/wakanow-logo.png
    PAY_TV: {
      DSTV: 'https://i.ibb.co/XZLxx7XQ/DSTVLogo.jpg',
      GOTV: 'https://i.ibb.co/C3KbfLwX/GOTV.png',
      STARTIMES: 'https://i.ibb.co/Y77DhZxp/startimes.png',
      SHOWMAX: 'https://i.ibb.co/LXs5QSxt/showmax-logo.png',
    },
    ELECTRIC_DISCO: {
      EKEDC: 'https://i.ibb.co/XxJx9pkg/ekedc.png',
      AEDC: 'https://i.ibb.co/8gpvXbB2/AEDC-LOGO.png',
      PHEDC: 'https://i.ibb.co/7JHdzxCn/PHEDC.png',
      IKEDC: 'https://i.ibb.co/MD3G1Pt5/Ikeja-Electric-Logo.png',
    },
    AIRTIME_AND_DATA: {
      MTN: '/path/to/mtn.png',
      AIRTEL: '/path/to/airtel.png',
      GLO: '/path/to/glo.png',
      '9MOBILE': '/path/to/9mobile.png',
    },
    ENTERTAINMENT_AND_LIFESTYLE: {
      NETFLIX: 'https://i.ibb.co/fzMHjWKQ/netflix-logo.png',
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