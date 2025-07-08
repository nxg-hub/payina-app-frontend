import axios from 'axios';
export default axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_USER_ENDPOINT}`,
});
