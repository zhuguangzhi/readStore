// 封装axios--------------------------------------------------------------------------------------

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { cleanObject } from '@/common/publicFn';
import { message } from 'antd';
import { getToken } from '@/hook/useAuth';

export interface ResponseData<T> {
  status_code: number;
  message: string;
  data: T;
  error_code?: string; // 错误码
  error_msg?: string; // 错误信息
  error_user_msg?: string; // 错误信息
}

async function apiAxios<T>(
  method: string,
  url: string,
  params: unknown,
  header?: { [key: string]: unknown },
  useToken: boolean = true,
) {
  // 添加请求拦截器
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      //请求拦截自定义
      return config;
    },
    (error: AxiosError) => {
      message.error('请求发送失败');
      return Promise.reject(error);
    },
  );
  // 添加响应拦截器
  axios.interceptors.response.use(
    (response: AxiosResponse<ResponseData<T>>) => {
      if (response.status !== 200) return Promise.reject();
      if (response.data.status_code === 200) {
        // 请求成功
        return response;
      }
      // 请求状态不为成功时
      return response;
    },
    (error: AxiosError) => {
      message.error('请求异常');

      return Promise.reject(error);
    },
  );
  // end

  if (!header) {
    header = {};
  }

  // 从store中获取token
  const token = getToken();
  header = {
    ...header,
    Authorization: token && useToken ? `Bearer ${token}` : '',
    'Content-Type': header['Content-Type']
      ? header['Content-Type']
      : 'application/json;charset=utf-8',
  };

  const httpDefault = {
    headers: {},
    method: method,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' ? params : null,
    data:
      method === 'POST' ||
      method === 'PUT' ||
      method === 'DELETE' ||
      method === 'PATCH'
        ? params
        : {},
    timeout: 30000,
  };

  // 如果headers中还需要其他信息可以在这边合并
  httpDefault.headers = {
    ...header,
  };
  const result: Promise<T> = new Promise((resolve) => {
    return axios(httpDefault)
      .then((res) => {
        return resolve(res.data);
      })
      .catch(() => {
        return null;
      });
  });
  return await result;
}

// T 返回结果类型
export default {
  get: <T>(
    url: string,
    params: object,
    useToken?: boolean,
    header?: { [key: string]: unknown },
  ) =>
    apiAxios<T>(
      'GET',
      url +
        '?' +
        qs.stringify(cleanObject(params as { [key: string]: unknown })),
      {},
      header,
      useToken,
    ),

  post: <T>(
    url: string,
    params: object,
    useToken?: boolean,
    header?: { [key: string]: unknown },
  ) => apiAxios<T>('POST', url, params, header, useToken),

  put: <T>(
    url: string,
    params: object,
    useToken?: boolean,
    header?: { [key: string]: unknown },
  ) => apiAxios<T>('PUT', url, params, header, useToken),

  delete: <T>(
    url: string,
    params: object,
    useToken?: boolean,
    header?: { [key: string]: unknown },
  ) => apiAxios<T>('DELETE', url, params, header, useToken),

  patch: <T>(
    url: string,
    params: object,
    useToken?: boolean,
    header?: { [key: string]: unknown },
  ) => apiAxios<T>('PATCH', url, params, header, useToken),
};
