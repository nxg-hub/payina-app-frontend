import axios from 'axios';
export default axios.create({
<<<<<<< HEAD
  // https://payina-be-6f08cdfb4414.herokuapp.com/api/v1/auth/login
  baseURL: import.meta.env.VITE_LOGIN_USER_ENDPOINT,
});
=======
  // https://payina-be.onrender.com/api/v1/auth/login
  baseURL: `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_USER_ENDPOINT}`,
})
>>>>>>> 148817b9c2e105953b149dee281016ff554df531
