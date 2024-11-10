import React from 'react';

const ServiceImages = ({ selectedService, selectedBiller, onBillerSelect }) => {
  // Object to store image mappings for different service categories
  const serviceImages = {
    BETTING_AND_LOTTERY: {
      BET9JA: '/path/to/bet9ja.png',
      SPORTY: '/path/to/sporty.png',
      '1XBET': '/path/to/1xbet.png',
      NAIRABET: '/path/to/nairabet.png',
      '22BET': '/path/to/22bet.png',
      BETKING: '/path/to/betking.png'
    },
    PAY_TV: {
      DSTV: '/path/to/dstv.png',
      GOTV: '/path/to/gotv.png',
      STARTIMES: '/path/to/startimes.png',
      SHOWMAX: '/path/to/showmax.png'
    },
    ELECTRIC_DISCO: {
      IKEDC: '/path/to/ikedc.png',
      EKEDC: '/path/to/ekedc.png',
      AEDC: '/path/to/aedc.png',
      PHED: '/path/to/phed.png'
    },
    AIRTIME_AND_DATA: {
      MTN: '/path/to/mtn.png',
      AIRTEL: '/path/to/airtel.png',
      GLO: '/path/to/glo.png',
      '9MOBILE': '/path/to/9mobile.png'
    },
    ENTERTAINMENT_AND_LIFESTYLE: {
      NETFLIX: '/path/to/netflix.png',
      SPOTIFY: '/path/to/spotify.png',
      APPLE: '/path/to/apple.png'
    }
    // Add more categories as needed
  };

  const renderBillerImage = (billerSlug, name) => (
    <div
      key={billerSlug}
      className={`flex-col cursor-pointer ${
        selectedBiller?.slug === billerSlug ? 'border-2 border-yellow p-2 rounded' : ''
      }`}
      onClick={() => onBillerSelect(billerSlug)}
    >
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
          {row.map(slug => {
            const name = slug.charAt(0) + slug.slice(1).toLowerCase().replace(/_/g, ' ');
            return renderBillerImage(slug, name);
          })}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="mb-10 text-lightBlue">
      {getServiceLayout()}
    </div>
  );
};

export default ServiceImages;