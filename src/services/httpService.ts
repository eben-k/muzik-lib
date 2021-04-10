import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import qs from 'qs';

const config: AxiosRequestConfig = {
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: 'brackets',
      allowDots: true,
      encodeValuesOnly: true,
    }),
};

export const http = axios.create(config);

export const authHttp = axios.create(config);

authHttp.interceptors.response.use(undefined);

http.interceptors.response.use(undefined);
