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
  businessName: Yup.string().required('Please enter your business name'),
  business_registered: Yup.array().required('Please select an option'),
  business_address: Yup.array().required('Please select an option'),
  businessCategory: Yup.string().required('Please select a business category'),
  businesstype: Yup.string().required('Please select a business type'),
  businessRegNumber: Yup.string(),
  tin_No: Yup.string()
})

export const HomeAddressSchema = Yup.object().shape({
  houseNumber: Yup.string().required('House Number is Required').max(3, 'Please enter a valid house number'),
  street: Yup.string().required('Please enter your street name'),
  state: Yup.string().required('Select your state'),
  // country: Yup.string().required('Select your country'),
  lga: Yup.string().required('Select your local government'),
})

export const BusinessAddressSchema = Yup.object().shape({
  businessHouseNumber: Yup.string().required('Business Adress Number is Required').max(3, 'Please enter a valid business address number'),
  businessStreetName: Yup.string().required('Please enter your business street name'),
  businessLGA: Yup.string().required('Select your local government'),
  businessState: Yup.string().required('Please enter your business state')
})

export const ProofOfResidence = Yup.object().shape({
  document_type: Yup.string().required('Please select document type'),

})

export const BusinessAddressVerification = Yup.object().shape({
  business_confirm_document: Yup.string().required('Please select document type'),

})