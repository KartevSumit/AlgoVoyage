import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const apiConnector = async (
  
  method: Method,
  url: string,
  data?: Record<string, any> | null,
  headers?: Record<string, string> | null,
  params?: Record<string, any> | null

): Promise<AxiosResponse<any>> => {
  
  const config: AxiosRequestConfig = {
    method: method as AxiosRequestConfig['method'],
    url,
    data: data ?? undefined,
    headers: headers ?? undefined,
    params: params ?? undefined,
  };

  return axios.request(config);
};
