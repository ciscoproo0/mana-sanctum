import axios from 'axios';

const apiLibrary = axios.create({
  baseURL: process.env.VUE_APP_API_LIBRARY_URL,
  
});
export default apiLibrary;
