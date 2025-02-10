import * as Yup from 'yup';

export const PayrollSchema = Yup.object().shape({
  jobRoleTitle: Yup.string().required('Job role is required'),
  basicSalary: Yup.number().required('Basic salary is required'),
  
});

export const EmployeeSchema = Yup.object().shape({
  employeeName: Yup.string().required('Name is required'),
  employeeRole: Yup.string().required("Employee's role is required"),
  employmentDetails: Yup.object().shape({
    employeeId: Yup.string().required("Employee's ID is required"),
    employmentDate: Yup.date().required('Employement Date is required'),
  }),
  employeeEmailAddress: Yup.string().required('Email is required'),

  accountDetails: Yup.object().shape({
    nameOfBank: Yup.string().required('Bank name is required'),
    accountNumber: Yup.string()
      .matches(/^\d{10}$/, 'Account number must be exactly 10 digits')
      .required('Account number is required'),
    paymentFrequency: Yup.string().required('Frequency of payment is required'),
    automaticPayment: Yup.boolean().required('Automatic payment status is required'),
    paymentDay: Yup.string().required('Payment day is required'),
  }),
});
