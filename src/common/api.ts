import http from '@/common/http';
import {
  authorRecommend,
  homeChartProps,
  newsProps,
  topicProps,
} from '@/type/home';
import { approvalProps } from '@/type/book';

const apiUrl = 'http://localhost:8000/proxy/api';
export const Home = {
  getHomeBook: () => http.get<homeChartProps[]>(`${apiUrl}/chart`, {}), //首页书本推荐
  getSwiperBook: () => http.get<homeChartProps>(`${apiUrl}/chart/banner`, {}), //轮播书本
  getNews: () => http.get<newsProps[]>(`${apiUrl}/chart/index/5`, {}), //新闻
  getVane: () => http.get<homeChartProps>(`${apiUrl}/chart/index/6`, {}), //风向标
  getAuthorRecommend: () =>
    http.get<authorRecommend>(`${apiUrl}/chart/index/7`, {}), //作者推荐
  getTopicList: () => http.get<topicProps>(`${apiUrl}/chart/index/8`, {}), //热门话题
};
export const Book = {
  approval: (p: approvalProps) => http.post(`${apiUrl}/bookApproval/store`, p), //点赞
};
