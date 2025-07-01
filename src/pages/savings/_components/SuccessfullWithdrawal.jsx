import { AiOutlineCheckCircle } from 'react-icons/ai';
const SuccessfullWithdrawal = ({ close, back }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-2xl p-8 w-[90%] max-w-md text-center animate__animated animate__fadeInUp">
        <div className="flex flex-col items-center">
          <AiOutlineCheckCircle className="text-green-500 text-6xl mb-3" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            💸 Withdrawal Successful! Your savings withdrawal has been successfully processed.
          </h2>
        </div>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          The funds will reflect in your wallet. Thank you for saving with us your financial journey
          matters, and we’re here to support every step you take!
        </p>

        <button
          onClick={() => {
            close(false);
            back();
          }}
          className="mt-2 bg-[#006181] hover:bg-[#004f5f] text-white px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SuccessfullWithdrawal;
