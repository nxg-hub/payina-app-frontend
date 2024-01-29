import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Must be 8 characters or more').required('Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password is required'),
  
});

export const BusinessDetailsSchema = Yup.object().shape({
  business_name: Yup.string().required('Please enter your business name'),
  business_registered: Yup.array().required('Please select an option'),
  business_address: Yup.array().required('Please select an option'),
  business_category: Yup.string().required('Please select a business category'),
  business_type: Yup.string().required('Please select a business type'),
  business_number: Yup.string().required('Business Registration Number is Required'),
  tax_number: Yup.string().required('Tax Identification Number is Required')
})

export const HomeAddressSchema = Yup.object().shape({
  house_number: Yup.string().required('House Number is Required').max(3, 'Please enter a valid house number'),
  street_name: Yup.string().required('Please enter your street name'),
  // state: Yup.string().required('Select your state'),
  country: Yup.string().required('Select your country'),
  lga: Yup.string().required('Select your local government'),
})

export const BusinessAddressSchema = Yup.object().shape({
  business_number: Yup.string().required('Business Adress Number is Required').max(3, 'Please enter a valid business address number'),
  business_street_name: Yup.string().required('Please enter your business street name'),
  business_lga: Yup.string().required('Select your local government'),
})

export const ProofOfResidence = Yup.object().shape({
  document_type: Yup.string().required('Please select document type'),

})

export const BusinessAddressVerification = Yup.object().shape({
  business_confirm_document: Yup.string().required('Please select document type'),

})