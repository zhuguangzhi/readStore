import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  authorRecommend,
  homeChartProps,
  newsProps,
  topicProps,
} from '@/type/home';
import { Book, Home } from '@/common/api';
import { approvalProps } from '@/type/book';
// 获取书本推荐
export const useHomeChart = (
  call: (type: 'openLoading' | 'closeLoading') => void,
) => {
  return useQuery<homeChartProps[], Error>(['home'], () =>
    Home.getHomeBook().then((value) => {
      call('closeLoading');
      return value;
    }),
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

// 点赞、取消点赞
export const useModifyApproval = (tabIndex: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['approval'];
  return useMutation((param: approvalProps) => Book.approval(param), {
    //请求成功时则刷新，触发home
    onSuccess: () => queryClient.invalidateQueries(['home']),
    //    实现乐观更新
    onMutate(target) {
      let previousItems;
      queryClient.setQueriesData(queryKey, (old?: homeChartProps[]) => {
        //存储旧数据
        let arr = (previousItems = old ? [...old] : []);
        if (arr.length > 0) {
          arr[tabIndex].data = arr[tabIndex].data.map((data) =>
            data.id === target.book_id
              ? { ...data, is_user_approval: target.is_approval }
              : data,
          );
          return arr;
        }
        return old;
      });
      return { previousItems };
    },
    //错误回滚
    onError(error, newItem, context) {
      queryClient.setQueriesData(queryKey, context?.previousItems);
    },
  });
};
