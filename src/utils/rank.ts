// 获取书本推荐
import { useQuery } from 'react-query';
import { Book, ErrorCheck } from '@/common/api';
import { ResponseData } from '@/common/http';
import { authorProps } from '@/type/user';
import { rankBookInfoProps, rankParamProps } from '@/type/book';

export const useGetBookRank = (
  call: Function,
  p: rankParamProps,
  userInfo: authorProps | null,
) => {
  return useQuery<ResponseData<rankBookInfoProps>, Error>(
    ['rank', p.rank_type, userInfo],
    () =>
      Book.rank(p).then((value) => {
        call();
        ErrorCheck(value);
        return value;
      }),
  );
};
