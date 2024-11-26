import React from 'react';

export const NetworkLogos = {
  MTN: () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <circle cx="20" cy="20" r="20" fill="#FFCC00"/>
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#000" className="font-bold text-sm">MTN</text>
    </svg>
  ),
  AIRTEL: () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <circle cx="20" cy="20" r="20" fill="#FF0000"/>
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#FFF" className="font-bold text-sm">AIRTEL</text>
    </svg>
  ),
  GLO: () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <circle cx="20" cy="20" r="20" fill="#00FF00"/>
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#FFF" className="font-bold text-sm">GLO</text>
    </svg>
  ),
  '9MOBILE': () => (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <circle cx="20" cy="20" r="20" fill="#009900"/>
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#FFF" className="font-bold text-sm">9M</text>
    </svg>
  ),
};

export default NetworkLogos;