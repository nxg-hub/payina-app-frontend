import { images } from '../../../constants';
import { Link } from 'react-router-dom';

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
