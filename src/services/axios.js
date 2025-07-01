import axios from 'axios';
export default axios.create({
  // https://payina-be.onrender.com/api/v1/auth/login
  baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_USER_ENDPOINT}`,
});
