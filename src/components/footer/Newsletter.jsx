import { useState } from 'react';
import Button from '../../components/button/button';

const NewsletterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        setEmail('');
      }, 3000); // Hide after 3 seconds
    }, 2000); // Simulate loading time
  };

  return (
    <div className="md:!ml-auto md:!mr-40 md:w-[30%] flex-col space-y-6 flex text-[#3d2e7c] relative">
      <div className="pt-10 font-semibold text-primary text-4xl">Subscribe to our newsletter</div>
      <form
        name="newsletter"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="font-light space-y-4 text-sm w-full">
        <input type="hidden" name="form-name" value="newsletter" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full outline-none text-primary text-md px-4 flex items-center space-x-2 text-md border py-4 mt-2 rounded-[10px] border-primary justify-center bg-lightBlue"
        />
        <Button
          padding="20px"
          backgroundColor="#FFFFFF"
          children="Subscribe"
          textColor="#006181"
          width="100%"
          className="hover:scale-95 font-extrabold duration-300 center gap-2 w-full"
          disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Subscribe'}
        </Button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="absolute top-[18rem] left-[15rem] w-full h-[50px] flex justify-right items-right">
          <div className="bg-white text-lightBlue shadow-lg px-6 py-4 rounded-lg text-center">
            ✅ Thank you for subscribing!
          </div>
        </div>
      )}
      {/* {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg text-center">
            ✅ Thank you for subscribing!
          </div>
        </div>
      )} */}
    </div>
  );
};

export default NewsletterForm;
