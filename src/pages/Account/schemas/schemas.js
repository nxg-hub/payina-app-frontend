import * as Yup from 'yup';

export const PayrollSchema = Yup.object().shape({
  base_salary: Yup.string().required('Base salary is required'),
  job_role: Yup.string().required('Job role is required')
});

export const EmployeeSchema = Yup.object().shape({
  employee_name: Yup.string().required('Name is required'),
  employee_role: Yup.string().required("Employee's role is required"),
  bank_name: Yup.string().required("Bank name is required"),
  account_no: Yup.string().min(10, 'Please enter a valid account number').max(10, 'Please enter a valid account number').required("Bank name is required")
});
