import { handleError } from "./configurations";
import axios from "axios";

export const URL = "https://fishgalaxy-server.onrender.com/api";
// export const URL = "http://localhost:3000/api";
export const CloudinaryURL = "https://res.cloudinary.com/dkm2bwlao/image/upload"

const apiInstance = axios.create({
  baseURL: URL,
});

// Response interceptor
apiInstance.interceptors.response.use((response) => {
  // You can modify the response data here
  return response.data;
});

export const commonReduxRequest = async (
  method,
  route,
  body,
  config,
  rejectWithValue
) => {
  let requestConfig = {
    method,
    url: route,
    data: body,
    headers: config,
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);

    return response;
  } catch (error) {
    console.log(error);
    return handleError(error, rejectWithValue);
  }
};

export const commonRequest = async (method, route, body, config) => {
  let requestConfig = {
    method,
    url: route,
    data: body,
    headers: config,
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
