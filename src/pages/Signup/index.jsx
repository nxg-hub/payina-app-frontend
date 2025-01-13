import Logo from './_components/ui/logo';
import SignUpForm from './signup-form';
import { images } from '../../constants';

// eslint-disable-next-line react/prop-types
const Signup = ({ data, currentStep, handleNextStep }) => {
  return (
    <div className="bg-black h-screen">
      <div className="relative">
        <Logo />
        <div className="hidden md:block absolute right-0 top-0">
          <img src={images.Group} alt="" />
        </div>
      </div>

      <SignUpForm data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
    </div>
  );
};

export default Signup;
