// import React from 'react';
// import { XCircle, CheckCircle } from 'lucide-react';
//
// const PhoneInput = ({
//                       value,
//                       onChange,
//                       placeholder = "Enter Phone number",
//                       className = "border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
//                     }) => {
//   const [error, setError] = React.useState('');
//   const [isValid, setIsValid] = React.useState(false);
//
//   const handlePhoneChange = (e) => {
//     const newValue = e.target.value;
//
//     // Only allow numbers and limit to 11 digits
//     if (/^\d*$/.test(newValue) && newValue.length <= 11) {
//       onChange({ target: { value: newValue } });
//
//       // Validate phone number length
//       if (newValue.length === 11) {
//         setIsValid(true);
//         setError('');
//       } else if (newValue.length > 0) {
//         setIsValid(false);
//         setError('Phone number must be 11 digits');
//       } else {
//         setIsValid(false);
//         setError('');
//       }
//     }
//   };
//
//   return (
//     <div className="flex flex-col w-[64%]">
//       <label className="py-4">Phone</label>
//       <div className="relative">
//         <input
//           type="text"
//           inputMode="numeric"
//           placeholder={placeholder}
//           className={`${className} ${
//             error ? 'border-red-500' : ''
//           } ${isValid ? 'border-green-500' : ''}`}
//           value={value}
//           onChange={handlePhoneChange}
//         />
//         <div className="absolute right-3 top-1/2 -translate-y-1/2">
//           {value && (isValid ? (
//             <CheckCircle className="w-5 h-5 text-green-500" />
//           ) : (
//             <XCircle className="w-5 h-5 text-red-500" />
//           ))}
//         </div>
//       </div>
//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       {isValid && (
//         <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
//           <CheckCircle className="w-4 h-4" />
//           Valid phone number
//         </p>
//       )}
//     </div>
//   );
// };
//
// export default PhoneInput;