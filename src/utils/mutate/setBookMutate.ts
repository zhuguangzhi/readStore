import { QueryClient } from 'react-query';
import { rankBookInfoProps } from '@/type/book';

const addBookCase = <T extends rankBookInfoProps>(
  target: addBookCaseProps,
  queryClient: QueryClient,
  type: string,
) => {
  queryClient.setQueriesData([type], (old?: T) => {
    if (!old) return {} as T;
    let data = [
      ...old.data.map((data) =>
        data.id === target.book_id ? { ...data, in_user_case: 1 } : data,
      ),
    ] as T['data'];
    return { ...old, data };
  });
};
type addBookCaseProps = {
  book_id: number;
};
export const addBookCaseMutate = {
  //    排行榜里加入书架
  rank: (target: addBookCaseProps, queryClient: QueryClient) =>
    addBookCase(target, queryClient, 'rank'),
  // 首页加入书架
  home: (target: addBookCaseProps, queryClient: QueryClient) =>
    addBookCase(target, queryClient, 'home'),
  // 话题
  topicBookList: (target: addBookCaseProps, queryClient: QueryClient) =>
    addBookCase(target, queryClient, 'topicBookList'),
};
