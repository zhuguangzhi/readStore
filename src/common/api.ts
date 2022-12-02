import http, { ResponseData } from '@/common/http';
import { approvalProps } from '@/type/book';
import {
  accountLoginProps,
  authorProps,
  checkCodeProps,
  loginResultProps,
  phoneLoginProps,
  sendCodeProps,
  sendCodeResultProps,
} from '@/type/user';
import { clearToken } from '@/hook/useAuth';

export const ErrorCheck = <T>(val: ResponseData<T> | null) => {
  if (val?.status_code === 200) return true;
  // token校验失败
  // API_COMM_011  未登录或登录状态失效
  // API_COMM_012 token不正确
  if (
    val?.error_code === 'API_COMM_011' ||
    val?.error_code === 'API_COMM_012'
  ) {
    // 清空token
    clearToken();
  }
  return false;
};

const apiUrl = 'http://localhost:8000/proxy/api';
export const Home = {
  //首页书本推荐
  getHomeBook: <T>() => http.get<T>(`${apiUrl}/chart`, {}, false),
  //轮播书本
  getSwiperBook: <T>() => http.get<T>(`${apiUrl}/chart/banner`, {}, false),
  //新闻
  getNews: <T>() => http.get<T>(`${apiUrl}/chart/index/5`, {}, false),
  //风向标
  getVane: <T>() => http.get<T>(`${apiUrl}/chart/index/6`, {}, false),
  //作者推荐
  getAuthorRecommend: <T>() =>
    http.get<T>(`${apiUrl}/chart/index/7`, {}, false),
  //热门话题
  getTopicList: <T>() => http.get<T>(`${apiUrl}/chart/index/8`, {}, false),
};
export const Book = {
  //点赞
  approval: <T>(p: approvalProps) =>
    http.post<T>(`${apiUrl}/bookApproval/store`, p),
};
export const User = {
  // 刷新token
  refreshToken: () =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/refreshToken`,
      {},
    ),
  // 手机号登陆
  phoneLogin: (p: phoneLoginProps) =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/phoneLogin`,
      p,
      false,
    ),
  // 账号密码登陆
  accountLogin: (p: accountLoginProps) =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/accountLogin`,
      p,
      false,
    ),
  // 获取用户信息
  getUserInfo: () =>
    http.post<ResponseData<authorProps>>(`${apiUrl}/users/info`, {}),
  // 发送验证码
  sendCode: (p: sendCodeProps) =>
    http.post<ResponseData<sendCodeResultProps>>(
      `${apiUrl}/captcha/send`,
      p,
      false,
    ),
  // 校验验证码
  checkCode: (p: checkCodeProps) => http.post(`${apiUrl}/captcha/verify`, p),
};
