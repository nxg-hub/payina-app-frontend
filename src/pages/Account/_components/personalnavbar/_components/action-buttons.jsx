import { Link, useLocation } from 'react-router-dom';
import { images } from '../../../../../constants';

const ActionButtons = () => {
  const location = useLocation();
  const route = location.pathname;
  return (
    <div className="flex items-center md:justify-between md:space-x-6 sm:px-10">
      <div className="flex space-x-16 justify-center items-center">
        <Link href={'/'} className="md:flex items-center hidden">
          <div className="hover:scale-95">
            <img src={images.Headphone} alt="customer_care" />
          </div>
        </Link>

        <Link to={'/'}>
          <div className="hover:scale-95">
            <img src={images.Bell} alt="customer_care" />
          </div>
        </Link>
        <Link to={'/'}>
          <div className="hover:scale-95">
            <img src={images.Settings} alt="customer_care" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
