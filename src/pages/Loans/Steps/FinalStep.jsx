import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCheckCircle, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { closeModal } from '../../../Redux/modalSlice';

const FinalStep = ({ onBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const showModal = useSelector((state) => state.modal.modalOpen);

  const handleCloseModal = () => {
    navigate('/account/dashboard');
    dispatch(closeModal());
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className=" bg-gradient-to-br from-white via-blue-100 to-blue-300 rounded-lg shadow-lg p-6 w-[90%] md:w-[500px] ">
        <IoMdClose
          onClick={handleCloseModal}
          size={24}
          className="font-bold float-right relative bottom-3 cursor-pointer "
        />
        <div className="flex items-center gap-3 mb-6 mt-4  py-3 px-2 bg-[#005978]">
          <AiOutlineCheckCircle className="text-green-200 w-8 h-8" />
          <h1 className="text-2xl font-bold text-green-200">Loan Application Submitted!</h1>
        </div>

        <p className="text-lg mb-6">
          Thank you for applying. Your loan application has been <strong>received</strong> and is
          currently <strong>under review</strong> by our credit team.
        </p>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">What Happens Next?</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>We’re reviewing your application to determine your eligibility.</li>
            <li>
              This usually takes <strong>24 to 72 hours</strong>.
            </li>
            <li>You’ll receive feedback via email or SMS as soon as a decision is made.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
          <p className="mb-2 flex items-center gap-2">
            <AiOutlineMail className="text-blue-600 w-5 h-5" />
            <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">
              support@payina.com.ng
            </a>
          </p>
          <p className="flex items-center gap-2">
            <AiOutlinePhone className="text-blue-600 w-5 h-5" />
            <span>08138563840</span>
          </p>
        </section>

        <footer className="pt-4 mt-6 border-t text-sm text-gray-500 text-center">
          Thank you for choosing <span className="font-bold text-gray-700">PAYINA</span> — your
          trusted financial partner.
        </footer>
      </div>
    </div>
  );
};

export default FinalStep;
