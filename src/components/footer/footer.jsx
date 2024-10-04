import { Link } from 'react-router-dom';
import Button from '../../components/button/button';
import { images } from '../../constants';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex p-5  md:justify-center bg-lightBlue">
      <div className="md:flex justify-start md:gap-20 md:space-x-28 md:px-0 md:py-20">
        <div className="flex-col space-y-6 flex text-[#3d2e7c] md:ml-6">
          <div className=" pt-0 text-yellow text-[20px]">Company</div>
          <div className="text-[16px] space-y-4 text-primary font-semibold">
            <Link to="/about-us">About Us</Link>
            <hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />
            <Link to="/contact-us">Contact Us</Link>
            <hr className="text-yellow w-[10%] py-2  xl:w-[20%]" />
            <Link to="/support">Support</Link>
            <hr className="text-yellow w-[10%] py-2  xl:w-[20%]" />
            {/*<Link to="/team">Team</Link>*/}
            <hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>

        <div className="flex-col space-y-6 flex text-[#3d2e7c]">
          <div className="pt-0 text-yellow text-[20px]">Account Types</div>
          <div className="space-y-4 text-[16px] text-primary font-semibold">
            <Link to="/personal">Personal Account</Link>
            {/*<hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />*/}
            {/*<Link>Petty Business</Link>*/}
            {/*<hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />*/}
            {/*<Link>Superstore</Link>*/}
            {/*<hr className="text-yellow w-[10%] py-2 xl:w-[20%]" />*/}
            <Link to="/business">Coporate</Link>
          </div>
        </div>

        <div className="md:!ml-auto md:!mr-40 md:w-[30%] flex-col space-y-6 flex text-[#3d2e7c]">
          <div className="pt-10 font-semibold text-primary text-4xl">
            Subscribe to our newsletter
          </div>
          <div className="font-light space-y-4 text-sm w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-primary text-md px-4 flex items-center space-x-2 text-md border py-4 mt-2 rounded-[10px] border-primary justify-center bg-lightBlue"
            />
            <Button
              padding="20px"
              backgroundColor="#FFFFFF"
              children="Subscribe"
              textColor="#006181"
              width="100%"
              className="hover:scale-95 font-extrabold duration-300 center gap-2 w-full"
            />
          </div>
        </div>
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
    </footer>
  );
};

export default Footer;
