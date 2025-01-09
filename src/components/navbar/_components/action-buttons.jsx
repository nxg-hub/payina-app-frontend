// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Button from '../../button/button';
// import Paybills from '../../../pages/paybills/Paybills';
//
// const ActionButtons = () => {
//   const location = useLocation();
//   const route = location.pathname;
//   return (
//     <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
//       <div className="flex xl:space-x-6">
//         <Link href={'/pricing'} className="xl:flex items-center hidden">
//           <div className="hover:scale-95 font-extrabold duration-300 flex text-primary"></div>
//         </Link>
//       </div>
//
//       <div className="flex lg-space-x-4 gap-4 items-center">
//         <Link to={'/paybills'}>
//           <Button
//             children="Paybills"
//             className="'hover:bg-lightBlue hover:scale-95 font-extrabold duration-300 center gap-2"
//             backgroundColor="#00678f"
//           />
//         </Link>
//         <Link to={'/account/onboarding'}>
//           <Button
//             children="Sign Up"
//             className="hover:bg-lightBlue hover:scale-95 font-extrabold duration-300 center gap-2"
//             backgroundColor="#00678f"
//           />
//         </Link>
//         <Link to={'/login'}>
//           <Button
//             children="Login"
//             className="hover:!bg-lightBlue hover:!text-primary hover:scale-95 font-extrabold duration-300 center gap-2"
//             backgroundColor="transparent"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// };
//
// export default ActionButtons;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../button/button';
// import Paybills from '../../../pages/paybills/Paybills';

const ActionButtons = () => {
  const location = useLocation();
  const route = location.pathname;

  // Determine the login/signup routes based on current path
  const loginRoute = '/login';
  // const signupRoute = route === '/' ? '/personal/signup' : '/signup';

  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
      <div className="flex xl:space-x-6">
        <Link href={'/pricing'} className="xl:flex items-center hidden">
          <div className="hover:scale-95 font-extrabold duration-300 flex text-primary"></div>
        </Link>
      </div>

      <div className="flex lg-space-x-4 gap-4 items-center">
        <Link to={'/paybills'}>
          <Button
            children="Paybills"
            className="'hover:bg-lightBlue hover:scale-95 font-extrabold duration-300 center gap-2"
            backgroundColor="#00678f"
          />
        </Link>
        <Link to={'/account/onboarding'}>
          <Button
            children="Sign Up"
            className="hover:bg-lightBlue hover:scale-95 font-extrabold duration-300 center gap-2"
            backgroundColor="#00678f"
          />
        </Link>
        <Link to={loginRoute}>
          <Button
            children="Login"
            className="hover:!bg-lightBlue hover:!text-primary hover:scale-95 font-extrabold duration-300 center gap-2"
            backgroundColor="transparent"
          />
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
