import React, { createContext, useContext, useState, useCallback } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    phoneNumber: '',
    email: '',
    amount: '',
    selectedNetwork: ''
  });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const updateFormValues = useCallback((newValues) => {
    setFormValues((prevValues) => ({ ...prevValues, ...newValues }));
  }, []);

  const updateSelectedPlan = useCallback((plan) => {
    setSelectedPlan(plan);
  }, []);

  return (
    <FormContext.Provider
      value={{ formValues, updateFormValues, selectedPlan, updateSelectedPlan }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
