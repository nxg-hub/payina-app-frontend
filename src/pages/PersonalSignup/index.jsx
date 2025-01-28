// import Logo from './_components/ui/logo';
// import PersonalSignupForm from './personal-signup-form.jsx';

// // eslint-disable-next-line react/prop-types
// const Signup = ({ data, currentStep, handleNextStep }) => {
//   return (
//     <div className="bg-black h-screen overflow-x-hidden">
//       <Logo />
//       <PersonalSignupForm data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
//     </div>
//   );
// };

import Logo from './_components/ui/logo';
import PersonalSignupForm from './personal-signup-form.jsx';
import { images } from '../../constants';

// eslint-disable-next-line react/prop-types
const Signup = ({ data, currentStep, handleNextStep }) => {
  return (
    <div className="h-screen bg-black">
      <div className="relative">
        <Logo />
        <div className="hidden md:block absolute right-0 top-0">
          <img src={images.Group} alt="" />
        </div>
      </div>

      <PersonalSignupForm data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
    </div>
  );
};

export default Signup;
