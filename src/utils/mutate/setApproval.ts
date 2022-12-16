import { QueryClient } from 'react-query';
import { approvalProps, readBookInfoProps } from '@/type/book';
import { homeChartProps } from '@/type/home';
import { topicBookListProps } from '@/type/topic';

export const setApprovalMutate = {
  home: (
    target: approvalProps,
    queryClient: QueryClient,
    tabIndex?: number,
  ) => {
    queryClient.setQueriesData(['home'], (old?: homeChartProps[]) => {
      let arr = old ? [...(old as homeChartProps[])] : [];
      if (arr.length > 0 && tabIndex !== undefined) {
        arr[tabIndex].data = arr[tabIndex].data.map((data) =>
          data.id === target.book_id
            ? { ...data, is_user_approval: target.is_approval }
            : data,
        );
        return arr;
      }
      return [];
    });
  },
  readBookInfo: (target: approvalProps, queryClient: QueryClient) => {
    queryClient.setQueriesData(['readBookInfo'], (old?: readBookInfoProps) => {
      let arr = old ? old : ({} as readBookInfoProps);
      arr.is_user_approval = target.is_approval;
      return arr;
    });
  },
  topicBookList: (target: approvalProps, queryClient: QueryClient) => {
    queryClient.setQueriesData(
      ['topicBookList'],
      (old?: topicBookListProps) => {
        if (!old) return {} as topicBookListProps;
        const data = old?.data.map((item) => {
          if (item.id === target.book_id)
            item.is_user_approval = target.is_approval;
          return item;
        });
        return {
          page_info: old?.page_info,
          data,
        };
      },
    );
  },
};
