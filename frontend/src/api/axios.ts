import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // URL of the backend server
});

export default instance;
