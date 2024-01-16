import * as Yup from 'yup';



export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Must be 8 characters or more').required('Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password is required'),
  
});
