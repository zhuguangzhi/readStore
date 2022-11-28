import { useQuery } from '@tanstack/react-query';
import {
  authorRecommend,
  homeChartProps,
  newsProps,
  topicProps,
} from '@/type/home';
import { Home } from '@/common/api';

// 获取书本推荐
export const useHomeChart = (params?: {}) => {
  return useQuery<homeChartProps[], Error>(['home', params], () =>
    Home.getHomeBook(),
  );
};
// 获取轮播
export const useGetSwiper = () => {
  return useQuery<homeChartProps, Error>(['swiper'], () =>
    Home.getSwiperBook(),
  );
};
// 获取公告
export const useGetNews = () => {
  return useQuery<newsProps[], Error>(['news'], () => Home.getNews());
};
// 获取风向标
export const useGetVane = () => {
  return useQuery<homeChartProps, Error>(['vane'], () => Home.getVane());
};
//作者推荐
export const useAuthorRecommend = () => {
  return useQuery<authorRecommend, Error>(['authorRecommend'], () =>
    Home.getAuthorRecommend(),
  );
};
//热门话题
export const useGetTopic = () => {
  return useQuery<topicProps, Error>(['getTopic'], () => {
    const res = Home.getTopicList();
    console.log('res', res);
    return res;
  });
};
