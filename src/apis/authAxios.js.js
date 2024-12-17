import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from '~/utils/formatters';

let authAxiosInstance = axios.create();
authAxiosInstance.defaults.timeout = 1000 * 60 * 10;
authAxiosInstance.defaults.withCredentials = true;

// Add a request interceptor
authAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  interceptorLoadingElements(true);
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
authAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  interceptorLoadingElements(false);
  return response;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  interceptorLoadingElements(false);
  const errorMessage = error?.response?.data?.message;
  const errorStatus = error?.status;
  if (errorStatus !== 410) {
    toast.error(errorMessage);
  }

  return Promise.reject(error);
});

export default authAxiosInstance;