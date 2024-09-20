// import React, { createContext, useContext, useState } from 'react';
//
// const FormContext = createContext();
//
// export const FormProvider = ({ children }) => {
//   const [formValues, setFormValues] = useState({
//     phoneNumber: '',
//         email: '',
//     // phoneNumber: '',
//     amount: '',
//     selectedNetwork: ''
//     // ... other form fields
//   });
//   const [selectedPlan, setSelectedPlan] = useState(null);
//
//   const updateFormValues = (newValues) => {
//     setFormValues(prevValues => ({ ...prevValues, ...newValues }));
//   };
//
//   const updateSelectedPlan = (plan) => {
//     setSelectedPlan(plan);
//   };
//
//   return (
//     <FormContext.Provider value={{
//       formValues,
//       updateFormValues,
//       selectedPlan,
//       updateSelectedPlan
//     }}>
//       {children}
//     </FormContext.Provider>
//   );
// };
//
// export const useForm = () => useContext(FormContext);

// src/context/FormContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    phoneNumber: '',
    email: '',
    amount: '',
    selectedNetwork: ''
  });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const updateFormValues = (newValues) => {
    setFormValues((prevValues) => ({ ...prevValues, ...newValues, email: formValues.email }));
  };

  const updateSelectedPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <FormContext.Provider
      value={{ formValues, updateFormValues, selectedPlan, updateSelectedPlan }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
