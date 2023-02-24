import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Book, ErrorCheck } from '@/common/api';
import { authorProps } from '@/type/user';
import { rankBookInfoProps, rankParamProps } from '@/type/book';

// 获取书本推荐
export const useGetBookRank = (
  call: Function,
  p: rankParamProps,
  userInfo: authorProps | null,
) => {
  return useQuery<rankBookInfoProps, Error>(
    ['rank', p.rank_type, p.channel_type, userInfo?.id],
    () =>
      Book.rank(p).then((value) => {
        call();
        ErrorCheck(value);
        return value.data;
      }),
  );
};
// 加入书架
export const useAddBookCase = (
  queryType: 'rank' | 'home' | 'topicBookList',
) => {
  const queryClient = useQueryClient();
  const setQuery = <T extends rankBookInfoProps>(
    target: { book_id: number },
    type: 1 | 2,
  ) => {
    queryClient.setQueriesData([queryType], (old?: T) => {
      let arr = old ? { ...old } : ({} as T);
      if (arr.data.length > 0) {
        arr.data = arr.data.map((data) =>
          data.id === target.book_id ? { ...data, in_user_case: type } : data,
        );
      }
      return arr;
    });
  };
  return useMutation((p: { book_id: number }) => Book.addBookCase(p), {
    onSuccess(val, target) {
      if (ErrorCheck(val)) return;
      // 报错了，归位
      setQuery(target, 2);
    },
    onMutate(target) {
      let previousItems = queryClient.getQueryData([queryType]);
      setQuery(target, 1);
      // addBookCaseMutate?.[queryType](target, queryClient);
      return { previousItems };
    },
    //错误回滚
    onError(error, newItem, context) {
      queryClient.setQueriesData([queryType], context?.previousItems);
    },
  });
};
