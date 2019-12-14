import axios from 'axios';

const api =  axios.create({
  baseURL: 'http://192.168.56.1:3334/'
});

export const ip = "192.168.56.1";

export default api;