import { Link } from 'react-router-dom';
import { images } from '../../../../../constants';

const Logo = () => {
  return (
    <div>
      <Link href={'/'}>
        <img src={images.logo} alt="logo" className="w-60" />
      </Link>
    </div>
  );
};

export default Logo;
