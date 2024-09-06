export const formValidation = (fields) => {
  const errors = {};

  if (!fields.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
    errors.email = 'Email is invalid';
  }

  if (!fields.selectedNetwork) {
    errors.selectedNetwork = 'Please select a network';
  }

  if (!fields.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!/^\d{10,15}$/.test(fields.phoneNumber)) {
    errors.phoneNumber = 'Phone number is invalid';
  }

  if (!fields.amount || parseFloat(fields.amount) <= 0) {
    errors.amount = 'Amount must be greater than zero';
  }


  if (!fields.selectedNetwork) {
    errors.selectedNetwork = 'Network is required';
  }

  return errors;
};
