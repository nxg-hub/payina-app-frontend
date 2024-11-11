// // import React, { useEffect } from 'react';
// // import { usePhoneInput } from './usePhoneInput';
// //
// // const PhoneInput = ({ formValues, updateFormValues }) => {
// //   const { phoneNumber, error, handlePhoneNumberChange } = usePhoneInput(formValues.phoneNumber || '');
// //
// //   const onChange = (e) => {
// //     handlePhoneNumberChange(e);
// //     updateFormValues({ phoneNumber: e.target.value });
// //   };
// //
// //   useEffect(() => {
// //     setPhoneError(error);
// //   }, [error, setPhoneError]);
// //
// //   return (
// //     <div className="flex flex-col w-[64%]">
// //       <label className="py-4">Phone</label>
// //       <input
// //         type="number"
// //         placeholder="Enter Phone number"
// //         className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
// //         value={phoneNumber}
// //         onChange={onChange}
// //       />
// //       {error && <p className="text-red-500">{error}</p>}
// //     </div>
// //   );
// // };
// //
// // export default PhoneInput;
//
//
// import React, { useEffect } from 'react';
// import { usePhoneInput } from './usePhoneInput';
//
// const PhoneInput = ({ value, onChange, setPhoneError }) => {
//   const { phoneNumber, error, handlePhoneNumberChange } = usePhoneInput(value || '');
//
//   const handleChange = (e) => {
//     handlePhoneNumberChange(e);
//     onChange(e);
//   };
//
//   // Notify the parent of any error changes
//   useEffect(() => {
//     setPhoneError(error);
//   }, [error, setPhoneError]);
//
//   return (
//     <div className="flex flex-col w-[64%]">
//       <label className="py-4">Phone</label>
//       <input
//         type="number"
//         placeholder="Enter Phone number"
//         className="border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
//         value={phoneNumber}
//         onChange={handleChange}
//       />
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// };
//
// export default PhoneInput;