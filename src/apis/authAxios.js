import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from '~/utils/formatters';
import { refreshTokenApi } from '~/apis';
import { logoutUserApi } from '~/redux/user/userSlice';

// Promise to handle refresh token requests
let refreshTokenPromise = null;

// Access redux store outside a react component
let axiosReduxStore;
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore;
};

// Create an axios instance with default configurations
let authAxiosInstance = axios.create();
authAxiosInstance.defaults.timeout = 1000 * 60 * 10; // Set timeout to 10 minutes
authAxiosInstance.defaults.withCredentials = true; // Accept browser auto-send cookies to API

// Add a request interceptor
authAxiosInstance.interceptors.request.use((request) => {
  interceptorLoadingElements(true);
  return request;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor
authAxiosInstance.interceptors.response.use((response) => {
  interceptorLoadingElements(false);
  return response;
}, (error) => {
  interceptorLoadingElements(false);
  const errorMessage = error?.response?.data?.message;
  const errorStatus = error?.status;
  const originalRequests = error?.config; // Get the original API request

  // Handle 401 Unauthorized error
  if (errorStatus === 401) {
    axiosReduxStore.dispatch(logoutUserApi());
  }
  // Handle 410 Gone error (access token expired)
  else if (errorStatus === 410) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenApi()
        .then(data => {
          return data?.accessToken;
        })
        .catch((error) => {
          axiosReduxStore.dispatch(logoutUserApi());
          return Promise.reject(error);
        })
        .finally(() => {
          refreshTokenPromise = null;
        });
    }

    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then((accessToken) => {
      return authAxiosInstance(originalRequests); // Retry the original request with new token
    });
  }
  else if (errorStatus === 404) {
    window.location.href = '/404';
  }
  else {
    toast.error(errorMessage);
  }

  return Promise.reject(error);
});

export default authAxiosInstance;