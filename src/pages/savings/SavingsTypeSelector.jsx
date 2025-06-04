export default function SavingsTypeSelector({ onSelect }) {
  return (
    <div className="max-w-md mx-auto mt-28 p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl rounded-2xl text-center space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-800">💰 Payina Vault</h2>
      <p className="text-gray-600 text-sm">Pick how you'd like to start saving today</p>

      <button
        onClick={() => onSelect('personal')}
        className="flex items-center justify-center gap-3 w-full p-4 bg-[#00678F] hover:bg-[#005978] text-white rounded-full font-semibold shadow-md transition-transform transform hover:scale-105">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h2l1-2h13l1 2h2v10H3V10z" />
        </svg>
        Personal Savings
      </button>

      {/* Uncomment to add more options later
  <button
    onClick={() => onSelect('group')}
    className="flex items-center justify-center gap-3 w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-md transition-transform transform hover:scale-105"
  >
    👥 Group Savings
  </button>
  */}
    </div>
  );
}
