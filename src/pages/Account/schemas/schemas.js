import * as Yup from 'yup';

export const PayrollSchema = Yup.object().shape({
  base_salary: Yup.string().required('Base salary is required')
});
