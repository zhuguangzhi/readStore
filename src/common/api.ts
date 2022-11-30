import http from '@/common/http';
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

const apiUrl = 'http://localhost:8000/proxy/api';
export const Home = {
  //首页书本推荐
  getHomeBook: <T>() => http.get<T>(`${apiUrl}/chart`, {}),
  //轮播书本
  getSwiperBook: <T>() => http.get<T>(`${apiUrl}/chart/banner`, {}),
  //新闻
  getNews: <T>() => http.get<T>(`${apiUrl}/chart/index/5`, {}),
  //风向标
  getVane: <T>() => http.get<T>(`${apiUrl}/chart/index/6`, {}),
  //作者推荐
  getAuthorRecommend: <T>() => http.get<T>(`${apiUrl}/chart/index/7`, {}),
  //热门话题
  getTopicList: <T>() => http.get<T>(`${apiUrl}/chart/index/8`, {}),
};
export const Book = {
  //点赞
  approval: (p: approvalProps) => http.post(`${apiUrl}/bookApproval/store`, p),
};
export const User = {
  // 手机号登陆
  phoneLogin: (p: phoneLoginProps) =>
    http.post<loginResultProps>(`${apiUrl}/auth/phoneLogin`, p),
  // 账号密码登陆
  accountLogin: (p: accountLoginProps) =>
    http.post<loginResultProps>(`${apiUrl}/auth/accountLogin`, p),
  // 获取用户信息
  getUserInfo: () => http.post<authorProps>(`${apiUrl}/users/info`, {}),
  // 发送验证码
  sendCode: (p: sendCodeProps) =>
    http.post<sendCodeResultProps>(`${apiUrl}/captcha/send`, p),
  // 校验验证码
  checkCode: (p: checkCodeProps) => http.post(`${apiUrl}/captcha/verify`, p),
};
