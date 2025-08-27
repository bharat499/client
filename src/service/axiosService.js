import React from 'react';
import axios from "axios";
import ApiEndPoint from "../service/apiUrls.json";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const axiosService = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});


axiosService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);




const postApiWithData = async (urls, data) => {
  try {
    const response = await axiosService.post(urls, data);
    return response?.data;
  } catch (error) {
    return error;
  }
};
const putData = async (urls, data) => {
  try {
    const response = await axiosService.put(urls, data);
    return response?.data;
  } catch (error) {
  
    return error;
  }
};
const deleteRecord = async (urls) => {
  try {
    const response = await axiosService.delete(urls);
    return response?.data;
  } catch (error) {
  
    return error;
  }
};
// Function for making GET requests
const getAppData = async (urls) => {
  try {
    const response = await axiosService.get(urls);
   
    return response?.data;
  } catch (error) {
  
    return error;
  }
};

export {axiosService, ApiEndPoint,putData, getAppData, postApiWithData,deleteRecord};

