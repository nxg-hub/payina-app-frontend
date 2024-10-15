import { useNavigate } from 'react-router-dom';

const handlePaystackCallback = (onSuccess, onError) => (response) => {
  if (response.status === 'success') {
    onSuccess(response);
  } else {
    onError(response);
  }
};

export default handlePaystackCallback;