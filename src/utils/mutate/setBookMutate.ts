import { QueryClient } from 'react-query';
import { homeChartProps } from '@/type/home';
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
  home: (
    target: addBookCaseProps,
    queryClient: QueryClient,
    tabIndex: number | undefined,
  ) => {
    queryClient.setQueriesData(['home'], (old?: homeChartProps[]) => {
      let arr = old ? [...old] : [];
      if (arr.length > 0 && tabIndex !== undefined) {
        arr[tabIndex].data = arr[tabIndex].data.map((data) =>
          data.id === target.book_id ? { ...data, in_user_case: 1 } : data,
        );
        return arr;
      }
      return [];
    });
  },
  topicBookList: (target: addBookCaseProps, queryClient: QueryClient) =>
    addBookCase(target, queryClient, 'topicBookList'),
};
