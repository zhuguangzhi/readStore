import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Book, ErrorCheck } from '@/common/api';
import { authorProps } from '@/type/user';
import { rankBookInfoProps, rankParamProps } from '@/type/book';
import { addBookCaseMutate } from '@/utils/mutate/setBookMutate';

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
  tabIndex?: number,
) => {
  const queryClient = useQueryClient();
  return useMutation((p: { book_id: number }) => Book.addBookCase(p), {
    onSuccess(val) {
      if (ErrorCheck(val)) queryClient.invalidateQueries([queryType]);
    },
    onMutate(target) {
      let previousItems = queryClient.getQueryData([queryType]);
      addBookCaseMutate?.[queryType](target, queryClient, tabIndex);
      return { previousItems };
    },
    //错误回滚
    onError(error, newItem, context) {
      queryClient.setQueriesData([queryType], context?.previousItems);
    },
  });
};
