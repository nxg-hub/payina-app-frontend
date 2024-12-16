import Logo from '../_components/ui/logo.jsx';
import TierThreeSignupForm from './tier-three-signup-form.jsx';

// eslint-disable-next-line react/prop-types
const TierThree = ({ data, currentStep, handleNextStep }) => {
  return (
    <div className="bg-black h-screen overflow-x-hidden">
      <Logo />
      <TierThreeSignupForm data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
    </div>
  );
};

export default TierThree;

