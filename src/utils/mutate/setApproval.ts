import { QueryClient } from 'react-query';
import { approvalProps, bookExtension, readBookInfoProps } from '@/type/book';
import { homeBookListProps } from '@/type/home';
import { topicBookListProps } from '@/type/topic';

type approvalMutateProps = {
  target: approvalProps;
  queryClient: QueryClient;
};
export const setApprovalMutate = {
  home: ({ target, queryClient }: approvalMutateProps) => {
    queryClient.setQueriesData(['home'], (old?: homeBookListProps) => {
      if (!old) return {} as homeBookListProps;
      return {
        ...old,
        data: old.data.map((item) => {
          if (item.id === target.book_id) {
            item.is_user_approval = target.is_approval;
            const currentApproval = (item.book_extension as bookExtension)
              .all_approval;
            (item.book_extension as bookExtension).all_approval =
              target.is_approval === 1
                ? currentApproval + 1
                : currentApproval - 1;
          }
          return item;
        }),
      };
    });
  },
  readBookInfo: ({ queryClient, target }: approvalMutateProps) => {
    queryClient.setQueriesData(
      [`readBookInfo${target.book_id}`],
      (old?: readBookInfoProps) => {
        let arr = old ? old : ({} as readBookInfoProps);
        arr.is_user_approval = target.is_approval;
        return arr;
      },
    );
  },
  topicBookList: ({ queryClient, target }: approvalMutateProps) => {
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
