import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://kstu-projects-default-rtdb.firebaseio.com/'
});

export default axiosApi;