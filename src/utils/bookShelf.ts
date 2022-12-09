import { useQuery } from 'react-query';
import { Book, ErrorCheck } from '@/common/api';
import {
  bookCategoryProps,
  bookLibraryRequestProps,
  rankBookInfoProps,
} from '@/type/book';

// 获取分类
export const useGetBookCategory = (p: {
  channel_type?: 0 | 1 | 2;
  pid?: number;
}) => {
  return useQuery<bookCategoryProps[], Error>(['bookCategory', p], () =>
    Book.getBookCategory(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取书库列表
export const useGetBookLibrary = (p: bookLibraryRequestProps) => {
  return useQuery<rankBookInfoProps, Error>(['bookLibrary', p], () =>
    Book.getBookLibrary(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
