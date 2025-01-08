import Logo from '../_components/ui/logo.jsx';
import TierOneSignupForm from './tier-one-signup-form.jsx';

// eslint-disable-next-line react/prop-types
const TierOne = ({ data, currentStep, handleNextStep }) => {
  return (
    <div className="bg-black h-screen overflow-x-hidden">
      <Logo />
      <TierOneSignupForm data={data} currentStep={currentStep} handleNextStep={handleNextStep} />
    </div>
  );
};

export default TierOne;

