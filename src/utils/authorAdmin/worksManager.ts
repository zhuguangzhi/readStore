import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthorBook, ErrorCheck } from '@/common/api';
import { bookInfoProps, createBooksProps, pageRequestProps } from '@/type/book';
import {
  chapterDetailsProps,
  worksListProps,
} from '@/type/authorAdmin/worksManager';
import router from '@/hook/url';
import { message } from 'antd';

export const useGetWorks = (p: pageRequestProps) => {
  return useQuery<worksListProps, Error>(['getWorks'], () =>
    AuthorBook.getAuthorBook(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取作品详情
export const uesGetAuthorBookDetails = (p: { id: number }) => {
  if (!p.id)
    return {
      data: null,
      isLoading: false,
    };
  return useQuery<bookInfoProps, Error>(['authorBookDetails', p], () =>
    AuthorBook.getAuthorBookDetails(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
//创建作品
export const useCreateAuthorBook = (closeLoad: Function) => {
  return useMutation(
    ['createAuthorBook'],
    (p: createBooksProps) => AuthorBook.createAuthorBook(p),
    {
      async onSuccess(val) {
        ErrorCheck(val);
        await closeLoad();
        router.push('/admin/bookContainer');
      },
    },
  );
};
//修改作品
export const useModifyAuthorBook = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ['createAuthorBook'],
    (p: createBooksProps) => AuthorBook.editAuthorBook(p),
    {
      async onSuccess(val) {
        if (!ErrorCheck(val)) return;
        await queryClient.invalidateQueries(['authorBookDetails']);
        message.success('修改成功');
      },
    },
  );
};

// 获取章节详情
export const useGetChapterDetails = (p: {
  book_id: number;
  chapter_id?: number;
}) => {
  return useQuery<chapterDetailsProps, Error>(['getChapterDetails'], () =>
    AuthorBook.worksChapterDetails(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
