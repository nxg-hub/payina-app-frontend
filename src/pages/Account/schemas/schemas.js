import * as Yup from 'yup';

export const PayrollSchema = Yup.object().shape({
  base_salary: Yup.string().required('Base salary is required'),
  job_role: Yup.string().required('Job role is required'),
  allowance_package: Yup.string().required('Allowance package is required'),
  allowance_pay: Yup.string().required('Allowance pay is required')
});

export const EmployeeSchema = Yup.object().shape({
  employee_name: Yup.string().required('Name is required'),
  employee_role: Yup.string().required("Employee's role is required"),
  bank_name: Yup.string().required('Bank name is required'),
  account_no: Yup.string()  
  .matches(/^\d{10}$/, 'Account number must be exactly 10 digits')  
  .required('Account number is required'),
  employment_date: Yup.date().required('Employment Date is required'),
  frequency_of_payment: Yup.string().required('Frequency of payment is required')
  // isAutomaticPayment: Yup.boolean().required('Automatic payment status is required')
});
