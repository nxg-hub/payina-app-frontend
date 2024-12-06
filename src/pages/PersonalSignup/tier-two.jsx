import Logo from './_components/ui/logo';
import PersonalSignupForm from './personal-signup-form.jsx';
import TierTwoSignupForm from './tier-two-signup-form.jsx';

// eslint-disable-next-line react/prop-types
const TierTwo = ({ data, currentStep, handleNextStep }) => {
  return (
    <div className="bg-black h-screen overflow-x-hidden">
      <Logo />
      <TierTwoSignupForm data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
    </div>
  );
};

export default TierTwo;

