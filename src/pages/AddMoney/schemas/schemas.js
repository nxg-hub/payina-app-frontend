import * as Yup from 'yup';

export const PayinaSchema = Yup.object().shape({
  payinaTag: Yup.string().required('Payina Tag is required'),
  confirmName: Yup.string().required('Sender Name Confirmation is required'),
  amount: Yup.string().required('Amount is required'),
  purpose: Yup.string().required('purpose is required'),
});

export const PhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    // .matches(/^\+\d{1,15}$/, 'Phone number must be in the format +XXXXXXXXXXX'),
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      'Invalid phone number'
    ),
  confirmPhoneNumber: Yup.string()
    .required('Please confirm your phone number')
    .oneOf([Yup.ref('phoneNumber'), null], 'Phone numbers must match'),
  amount: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
  purpose: Yup.string().required('Purpose is required'),
});

export const OthersPhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      'Invalid phone number'
    ),
  receiverName: Yup.string().required('Sender Name is required'),
  amount: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
  purpose: Yup.string().required('Purpose is required'),
});

export const EmailSchema = Yup.object().shape({
  emailAddress: Yup.string().required('Email Address is required'),
  receiverName: Yup.string().required('Sender Name is required'),
  amount: Yup.string().required('Amount is required'),
  purpose: Yup.string().required('purpose is required'),
});
