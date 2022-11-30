// 封装axios--------------------------------------------------------------------------------------

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { cleanObject } from '@/utils/publicFn';
import { message } from 'antd';

export interface ResponseData<T> {
  status_code: number;
  message: string;
  data: T;
  status?: number;
}
// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState(response: AxiosResponse) {
  // 如果http状态码正常，则直接返回数据
  if (response.status >= 400) {
    message.error(response.data.message);
  }
}

async function apiAxios<T>(
  method: string,
  url: string,
  params: unknown,
  header?: { [key: string]: unknown },
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
      //TODO: 添加未登录状态拦截

      if (response.status === 200) {
        // 请求成功
        return response;
      }
      // 请求状态不为成功时
      message.error(response.data.message);

      return Promise.reject(new Error(response.data.message));
    },
    (error: AxiosError) => {
      message.error(error.message);

      return Promise.reject(error);
    },
  );
  // end

  if (!header) {
    header = {};
  }
  // TODO: 使用dva配置token
  const token = '';
  header = {
    ...header,
    token: token ? `Bearer ${token}` : '',
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
  const result: Promise<T> = new Promise((resolve, reject) => {
    return axios(httpDefault)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((response: AxiosResponse) => {
        errorState(response);
        return reject(response);
      });
  });
  return await result;
}

// T 返回结果类型
export default {
  get: <T>(
    url: string,
    params: { [key: string]: unknown },
    header?: { [key: string]: unknown },
  ) =>
    apiAxios<T>(
      'GET',
      url + '?' + qs.stringify(cleanObject(params)),
      {},
      header,
    ),
  post: <T>(url: string, params: object, header?: { [key: string]: unknown }) =>
    apiAxios<T>('POST', url, params, header),
  put: <T>(url: string, params: object, header?: { [key: string]: unknown }) =>
    apiAxios<T>('PUT', url, params, header),
  delete: <T>(
    url: string,
    params: object,
    header?: { [key: string]: unknown },
  ) => apiAxios<T>('DELETE', url, params, header),
  patch: <T>(
    url: string,
    params: object,
    header?: { [key: string]: unknown },
  ) => apiAxios<T>('PATCH', url, params, header),
};
