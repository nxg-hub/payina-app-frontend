import Logo from './_components/ui/logo';
import SignUpForm from './signup-form';

// eslint-disable-next-line react/prop-types
const Signup = ({ data, currentStep, handleNextStep }) => {
  return (
    <div className="bg-black h-screen overflow-x-hidden">
      <Logo />
      <SignUpForm data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
    </div>
  );
};

export default Signup;
