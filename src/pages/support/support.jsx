import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { images } from '../../constants';
import { Link } from 'react-router-dom';

function Support() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I create an account on Payina?',
      answer:
        'To create an account, download the Payina app or visit our website. Click Sign Up, enter your details, verify your email or phone number, and set up a secure password. Once verified, you are ready to use Payina!',
    },

    {
      question: 'What should I do if I forget my password?',
      answer:
        'Click Forgot Password on the login page and enter your registered email or phone number. You’ll receive a reset link or code to create a new password. If you need help, contact our support team.',
    },

    {
      question: 'Is my personal and financial information secure on Payina?',
      answer:
        'Yes! Payina uses advanced encryption technology and multi-factor authentication (MFA) to keep your data safe. We comply with industry security standards to protect your transactions.',
    },

    {
      question: 'How do I send money using Payina?',
      answer:
        'Log in to your account, select Send Money, enter the recipient’s details (Payina tag, bank account, or mobile number), input the amount, and confirm the transaction. You may need to enter your PIN for security.',
    },

    {
      question: 'Why did my transaction fail, and how can I fix it?',
      answer:
        'Transactions may fail due to insufficient balance, incorrect details, poor network connection, or bank server issues**. Double-check your details and internet connection, then try again. If the issue persists, contact support.',
    },

    {
      question: 'How long does it take for a transaction to be processed?',
      answer:
        'Most transactions are instant. However, bank transfers may take a few minutes to several hours depending on the recipient’s bank. If delayed, check your transaction history or contact support.',
    },

    {
      question: 'How do I verify my identity on Payina?',
      answer:
        'Go to Profile Verify Account, upload a valid government-issued ID, and complete the verification steps. This helps us ensure security and prevent fraud.',
    },

    {
      question: 'What should I do if I suspect unauthorized activity on my account?',
      amswer:
        ' Immediately change your password, enable two-factor authentication (2FA), and review your recent transactions. Contact our support team to secure your account.',
    },

    {
      question: 'Are there any transaction fees on Payina?',
      answer:
        ' Payina offers low or no transaction fees for most transfers. However, some bank transfers or international payments may have small processing fees. Check our pricing page for details.',
    },

    {
      question: 'Is there a limit to how much I can send or receive?',
      answer:
        'Yes, transaction limits vary based on your account level and verification status. To increase your limit, complete identity verification. You can check your limits in the app under Account Settings.',
    },
  ];
  return (
    <section className="bg-black text-primary">
      <Navbar />
      <hr className="border-none bg-yellow h-1 w-[87%] mx-auto" />

      <div className="flex flex-col justify-center items-center lg:gap-[10rem] gap-10 relative p-5 lg:m-auto">
        <div className="flex lg:flex-row flex-col justify-start items-center lg:gap-10 lg:p-5 lg:mx-auto lg:my-5">
          <div className="flex flex-col jutify-start items-start lg:items-base lg:w-[45vw]">
            <h1 className="lg:text-[45px] text-[30px] font-bold mb-4 text-lightBlue">
              Customer Support
            </h1>
            <p className="text-lg">
              Need help? Our support team is here for you! Find quick answers in our FAQs or reach
              out via complaint form, email, or phone. We&apos;re always ready to assist you.
            </p>
          </div>

          <div className="lg:w-[500px] lg:h-[500px]">
            <img
              src={images.CustomerSupport}
              alt="section5Img"
              className="w-[100%] rounded-full"></img>
          </div>
        </div>
        <div className="flex flex-row justify-center lg:gap-[15rem] gap-5 w-[200px] h-[200px] py-3 px-5 absolute top-[24rem] left-2 lg:top-[25rem] lg:left-[23rem] items-center bg-yellow text-lightBlue lg:px-10 lg:py-5 lg:w-[700px] lg:h-[200px] rounded-xl">
          <div className="">
            <h1 className="text-xl text-start">Having Issues with Transactions?</h1>
            <h1 className="text-xl text-start mt-2">Need Help?</h1>
            <p className="text-md text-start mt-5">Let’s resolve it together!</p>
          </div>

          <div className="w-[60px] h-[60px] mb-10">
            <img src={images.TalkIcon} alt="section5Img" className="w-[100%]"></img>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start gap-3 p-5 lg:m-auto">
          <h1 className="text-base text-[30px] lg:text-[45px] font-bold lg:mb-4 text-lightBlue">
            FAQS
          </h1>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-base gap-5 py-3 px-10 border border-lightBlue lg:w-[900px]"
              onClick={() => toggleFaq(index)}>
              <div className="">
                <h3 className="text-start lg:text-lg">{faq.question}</h3>
                {openFaq === index && <span className="block mt-2">{faq.answer}</span>}
              </div>
              <div>
                <svg
                  className={`w-10 h-10 text-yellow transition-transform ${
                    openFaq === index ? 'rotate-90' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}

          <div className="flex flex-col justify-between items-center gap-3 mx-auto">
            <h3 className="text-start lg:text-lg">Don&apos;t see your question ?</h3>
            <Link to="/contact-us">
              <button
                type="submit"
                className="rounded-xl text-lightBlue hover:text-white text-xs md:text-base py-[15px] px-[30px] border border-lightBlue bg-yellow hover:bg-[#FFb950] hover:bg-yellow">
                Send Complaints To Help Desk
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </section>
  );
}

export default Support;
