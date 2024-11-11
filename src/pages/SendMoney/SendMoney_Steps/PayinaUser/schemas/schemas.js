import * as Yup from 'yup';

export const RecieverSchema = Yup.object().shape({
  payinaTag: Yup.string().required('Payina Tag is required'),
  confirmPayinaTag: Yup.string().required('Receiver Name Confirmation is required'),
});

export const AmountSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
  purpose: Yup.string().required('purpose is required'),
});

export const TransactionSchema = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
  purpose: Yup.string().required('purpose is required'),
});
