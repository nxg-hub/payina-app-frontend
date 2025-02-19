import * as Yup from 'yup';

export const FormSchemas = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  complaint: Yup.string().required('Complaint is required'),
  screenshot: Yup.mixed().required('Screenshot is required'),
});