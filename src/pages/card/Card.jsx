// // eslint-disable-next-line no-unused-vars
// import React from 'react';
//
// const Card = () => {
//   return (
//     <div className="text-primary">
//       <h1>Buy Card</h1>
//     </div>
//   );
// };
//
// export default Card;

// import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ icon, title }) => (
  <div className="card bg-blue-500 p-4 rounded-lg text-center">
    <div className="icon mb-2">{icon}</div>
    <p className="title text-lg font-bold">{title}</p>
  </div>
);

Card.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};

export default Card;
