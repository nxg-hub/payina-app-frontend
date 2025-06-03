import axios from 'axios';
export default axios.create({
  // https://payina-be-6f08cdfb4414.herokuapp.com/api/v1/auth/login
  baseURL: import.meta.env.VITE_LOGIN_USER_ENDPOINT,
});
