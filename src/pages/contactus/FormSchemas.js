import * as Yup from 'yup';

export const FormSchemas = Yup.object().shape({
  customerName: Yup.string().required('Name is required'),
  customerEmail: Yup.string().required('email is required'),
  phoneNumber: Yup.string().required('phoneNumber is required'),
  description: Yup.string().required('complaints is required'),
  // screenshot: Yup.mixed().required('Screenshot is required'),
});