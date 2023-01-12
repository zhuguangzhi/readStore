import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  authorRecommend,
  homeChartProps,
  newsProps,
  topicProps,
} from '@/type/home';
import { Book, ErrorCheck, Home } from '@/common/api';
import { approvalProps } from '@/type/book';
import { ResponseData } from '@/common/http';
import { authorProps } from '@/type/user';
import { setApprovalMutate } from '@/utils/mutate/setApproval';

// 获取书本推荐
export const useHomeChart = (userInfo: authorProps | null) => {
  return useQuery<homeChartProps[], Error>(['home', userInfo?.id], () => {
    return Home.getHomeBook<ResponseData<homeChartProps[]>>().then((value) => {
      ErrorCheck(value);
      return value.data;
    });
  });
};
// 获取轮播
export const useGetSwiper = () => {
  return useQuery<homeChartProps, Error>(['swiper'], () =>
    Home.getSwiperBook<ResponseData<homeChartProps>>().then((val) => {
      ErrorCheck(val);
      return val.data;
    }),
  );
};
// 获取公告
export const useGetNews = () => {
  return useQuery<newsProps[], Error>(['news'], () =>
    Home.getNews<ResponseData<newsProps[]>>().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取风向标
export const useGetVane = () => {
  return useQuery<homeChartProps, Error>(['vane'], () =>
    Home.getVane<ResponseData<homeChartProps>>().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
//作者推荐
export const useAuthorRecommend = () => {
  return useQuery<authorRecommend, Error>(['authorRecommend'], () =>
    Home.getAuthorRecommend<ResponseData<authorRecommend>>().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
//热门话题
export const useGetTopic = () => {
  return useQuery<topicProps, Error>(['getTopic'], () =>
    Home.getHotTopicList<ResponseData<topicProps>>().then(
      (value) => value.data,
    ),
  );
};

// 点赞、取消点赞
export const useModifyApproval = (
  type: 'home' | 'readBookInfo' | 'topicBookList',
  tabIndex?: number,
) => {
  const queryClient = useQueryClient();
  const queryKey = [type];
  return useMutation(
    'approval',
    (param: approvalProps) => Book.approval<ResponseData<{}>>(param),
    {
      //请求成功时则刷新，触发home
      onSuccess: (val) => {
        queryClient.invalidateQueries(queryKey);
        ErrorCheck(val);
      },
      //    实现乐观更新
      onMutate: function (target) {
        let previousItems = queryClient.getQueryData(type);
        setApprovalMutate[type](target, queryClient, tabIndex);
        return { previousItems };
      },
      //错误回滚
      onError(error, newItem, context) {
        queryClient.setQueriesData(queryKey, context?.previousItems);
      },
    },
  );
};

// 公告详情
export const useGetNewsInfo = (id: number) => {
  return useQuery<newsProps, Error>(['news', id], () =>
    Home.getNewsInfo(id).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
