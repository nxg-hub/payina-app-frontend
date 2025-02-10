import * as Yup from 'yup';

export const FormSchemas = Yup.object().shape({
  fullName: Yup.string().required('First Name is required'),
  email: Yup.string().required('email is required'),
  phoneNumber: Yup.string().required('phoneNumber is required'),
  complaint: Yup.string().required('message is required'),
  screenshot: Yup.mixed().required('Screenshot is required'),
});
