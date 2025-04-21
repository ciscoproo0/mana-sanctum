import axios from 'axios';

const apiSensei = axios.create({
  baseURL: process.env.VUE_APP_API_SENSEI_URL,
});

export default apiSensei;
