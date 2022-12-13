import { pageRequestProps } from '@/type/book';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ErrorCheck, PersonalCenter } from '@/common/api';
import {
  delCommentProps,
  myBookListProps,
  myCommentProps,
} from '@/type/personalCenter';

interface getMyCommentProps extends pageRequestProps {
  type: 'all' | 'myComment' | 'reply';
}
export const useGetMyComment = (p: getMyCommentProps) => {
  let url: 'getAllComment' | 'getMyComment' | 'getMyReply';
  switch (p.type) {
    case 'myComment':
      url = 'getMyComment';
      break;
    case 'all':
      url = 'getAllComment';
      break;
    case 'reply':
      url = 'getMyReply';
      break;
  }
  const param = { page: p.page, page_size: p.page_size };
  return useQuery<myCommentProps, Error>(['myComment', p], () =>
    PersonalCenter[url](param).then((val) => {
      ErrorCheck(val);
      return val.data;
    }),
  );
};

// 删除评论
export const useDelComment = () => {
  const queryClient = useQueryClient();
  const queryKey = ['myComment'];
  return useMutation(
    ['delComment'],
    (p: delCommentProps) => PersonalCenter.delComment(p),
    {
      async onSuccess(val) {
        if (!ErrorCheck(val)) return;
        await queryClient.invalidateQueries(queryKey);
      },
      onMutate(target) {
        let previousItems;
        queryClient.setQueriesData(queryKey, (old?: myCommentProps) => {
          previousItems = old ? { ...old } : {};
          if (!old) return {} as myCommentProps;
          const delIds = target.comment_id?.split(',') || [];
          return {
            page_info: old.page_info,
            data: old.data.filter(
              (item) => !delIds.includes(item.id.toString()),
            ),
          };
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

// 我的书架列表
type useGetMyBooksProps<T> = {
  page: T;
  type: 'getMyBookList' | 'getReadHistory';
};
export const useGetMyBooks = (p: useGetMyBooksProps<pageRequestProps>) => {
  return useQuery<myBookListProps, Error>(['myBooks', p], () =>
    PersonalCenter[p.type](p.page).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};

// 移出我的书架
export const useDelMyBook = () => {
  const queryClient = useQueryClient();
  const queryKey = ['myBooks'];
  return useMutation(
    ['delMyBook'],
    (p: { book_id: string }) => PersonalCenter.delMyBooks(p),
    {
      async onSuccess(val) {
        ErrorCheck(val);
        await queryClient.invalidateQueries(queryKey);
      },
      onMutate(target) {
        let previousItems = queryClient.getQueriesData(queryKey);
        queryClient.setQueriesData(queryKey, (old?: myBookListProps) => {
          if (!old) return {} as myBookListProps;
          const delIds = target.book_id?.split(',') || [];
          return {
            page_info: old.page_info,
            data: old.data.filter(
              (item) => !delIds.includes(item.book_id.toString()),
            ),
          };
        });
        return { previousItems };
      },
      //错误回滚
      onError(error, newItem, context) {
        console.log('context', context);
        queryClient.setQueriesData(queryKey, context?.previousItems);
      },
    },
  );
};
