import Axios, { AxiosRequestConfig } from 'axios';
import { environment } from '../environments/environment.json';

const axios = Axios.create({
    withCredentials: true,
  
});

export const get: typeof axios.get = (url: string, config: AxiosRequestConfig) => {
    return axios.get(url, config);
};

export const post: typeof axios.post = (url: string, data: any, config: AxiosRequestConfig) => {
    return axios.post(url, data, config);
};

export const request = (config: AxiosRequestConfig) => {
    return axios.request(config);
};
