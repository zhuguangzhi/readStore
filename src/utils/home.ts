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

// 获取书本推荐
export const useHomeChart = (call: Function, userInfo: authorProps | null) => {
  return useQuery<homeChartProps[], Error>(['home', userInfo], () => {
    return Home.getHomeBook<ResponseData<homeChartProps[]>>().then((value) => {
      ErrorCheck(value);
      call();
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
    Home.getTopicList<ResponseData<topicProps>>().then((value) => value.data),
  );
};

// 点赞、取消点赞 TODO: 乐观更新没有生效
export const useModifyApproval = (tabIndex: number) => {
  const queryClient = useQueryClient();
  const queryKey = ['home'];
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
        let previousItems;
        // @ts-ignore
        queryClient.setQueriesData(queryKey, (old: homeChartProps[]) => {
          // //存储旧数据
          previousItems = old ? [...(old as homeChartProps[])] : [];
          let arr = old ? [...(old as homeChartProps[])] : [];
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
    },
  );
};
