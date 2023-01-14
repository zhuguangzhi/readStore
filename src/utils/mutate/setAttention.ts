import { QueryClient } from 'react-query';
import { attentionUserProps, fansProps } from '@/type/user';
import { readBookInfoProps } from '@/type/book';

export const setAttention = {
  readBookInfo: (
    target: attentionUserProps,
    queryClient: QueryClient,
    bookId?: number,
  ) => {
    queryClient.setQueriesData(
      [`readBookInfo${bookId}`],
      (old?: readBookInfoProps) => {
        if (!old) return {} as readBookInfoProps;
        return { ...old, is_attention: target.is_attention };
      },
    );
  },
  getFans: (target: attentionUserProps, queryClient: QueryClient) => {
    queryClient.setQueriesData(['getFans'], (old?: fansProps) => {
      if (!old) return {} as fansProps;
      return {
        page_info: old.page_info,
        data: old.data.map((item) => {
          if (item.user_id === target.attention_user_id)
            item.is_attention = target.is_attention;
          return item;
        }),
      };
    });
  },
};
