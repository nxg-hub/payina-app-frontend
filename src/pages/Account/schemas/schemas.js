import * as Yup from 'yup';

export const PayrollSchema = Yup.object().shape({
  basicSalary: Yup.string().required('Base salary is required'),
  jobRoleTitle: Yup.string().required('Job role is required'),
  allowancePackageName: Yup.string().required('Allowance package is required'),
  allowancePay: Yup.string().required('Allowance pay is required'),
});

export const EmployeeSchema = Yup.object().shape({
  employeeName: Yup.array().of(Yup.string().required('Name is required')),
  // employeeName: Yup.string().required('Name is required'),
  employeeRole: Yup.string().required("Employee's role is required"),
  bankName: Yup.string().required('Bank name is required'),
  accountNumber: Yup.string()
    .matches(/^\d{10}$/, 'Account number must be exactly 10 digits')
    .required('Account number is required'),
  employementDate: Yup.date().required('Employement Date is required'),
  paymentFrequency: Yup.string().required('Frequency of payment is required'),
  // isAutomaticPayment: Yup.boolean().required('Automatic payment status is required')
});
