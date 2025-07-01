import { Link } from 'react-router-dom';
// import Button from '../../components/button/button';
import { images } from '../../constants';
import Newsletter from './Newsletter';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };
  return (
    <footer className="flex flex-col md:flex p-5  md:justify-center bg-lightBlue relative">
      <div className="md:flex justify-start md:gap-20 md:space-x-28 md:px-0 md:py-20">
        <div className="flex-col space-y-6 flex text-[#3d2e7c] md:ml-6">
          <div className=" pt-0 text-yellow text-[20px]">Company</div>
          <div className="text-[16px] space-y-4 text-primary font-semibold">
            <Link to="/about-us" onClick={scrollToTop}>
              About Us
            </Link>
            <hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />
            <Link to="/contact-us" onClick={scrollToTop}>
              Contact Us
            </Link>
            <hr className="text-yellow w-[10%] py-2  xl:w-[20%]" />
            <Link to="/support" onClick={scrollToTop}>
              Support
            </Link>

            <hr className="text-yellow w-[10%] py-2  xl:w-[20%]" />
            <Link to="/refer" onClick={scrollToTop}>
              Refer
            </Link>
            <hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />
            <Link to="/terms-of-service" onClick={scrollToTop}>
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="flex-col space-y-6 flex text-[#3d2e7c]">
          <div className="pt-0 text-yellow text-[20px]">Account Types</div>
          <div className="space-y-4 text-[16px] text-primary font-semibold">
            <Link to="/personal/signup" onClick={scrollToTop}>
              Personal Account
            </Link>
            {/*<hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />*/}
            {/*<Link>Petty Business</Link>*/}
            {/*<hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />*/}
            {/*<Link>Superstore</Link>*/}
            <hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />
            <Link to="/signup" onClick={scrollToTop}>
              Corporate
            </Link>
          </div>
        </div>

        <Newsletter />
      </div>

      <section className="md:flex flex-col md:justify-between">
        <div className="p-10 space-y-10 md:space-y-0 md:text-center md:flex flex-col justify-between md:px-80 md:space-x-20">
          <div className="text-center text-yellow font-extrabold mb-4">Follow Us</div>
          <div className="!ml-0 flex items-center justify-center space-x-6">
            <Link
              to="https://www.facebook.com/payinapaymentsolutions"
              target="_blank"
              className="p-2 rounded-full">
              <img src={images.Facebook} alt="" />
            </Link>
            {/*<Link className="p-2 rounded-full">*/}
            {/*  <img src={images.Instagram} alt="" />*/}
            {/*</Link>*/}
            <Link
              to="https://www.linkedin.com/showcase/payina-payment-solutions"
              target="_blank"
              className="p-2 rounded-full">
              <img src={images.LinkedIn} alt="" />
            </Link>
            {/*<Link className="p-2 rounded-full">*/}
            {/*  <img src={images.Twitter} alt="" />*/}
            {/*</Link>*/}
          </div>
        </div>
      </section>
      {/* Animated Arrow */}
      <Link to="/">
        <motion.div
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 cursor-pointer"
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.9 }}>
          <img
            src={images.arrowFooter}
            alt="arrowIcon"
            className="w-[80px] md:w-[100px] transition-all duration-300"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(79%) sepia(86%) saturate(489%) hue-rotate(359deg) brightness(103%) contrast(103%)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.filter =
                'brightness(0) saturate(100%) invert(27%) sepia(97%) saturate(501%) hue-rotate(164deg) brightness(96%) contrast(89%)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.filter =
                'brightness(0) saturate(100%) invert(79%) sepia(86%) saturate(489%) hue-rotate(359deg) brightness(103%) contrast(103%)')
            }
          />
        </motion.div>
      </Link>
    </footer>
  );
};

export default Footer;
