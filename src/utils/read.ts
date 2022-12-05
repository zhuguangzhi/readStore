import { useQuery } from 'react-query';
import { readBookInfoProps, readBookProps } from '@/type/book';
import { Book, ErrorCheck } from '@/common/api';

// 获取书本内容
export const useGetBookContainer = (p: { book_id: number }) => {
  return useQuery<readBookProps, Error>(['bookContainer', p.book_id], () =>
    Book.getBookContainer(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取书本详情
export const useGetBookInfo = (p: { id: number }) => {
  return useQuery<readBookInfoProps, Error>(['readBookInfo', p.id], () =>
    Book.getBookInfo(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
