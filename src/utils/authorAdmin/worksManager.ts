import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthorBook, ErrorCheck } from '@/common/api';
import { bookInfoProps, createBooksProps, pageRequestProps } from '@/type/book';
import {
  chapterDetailsProps,
  creatChapterProps,
  worksListProps,
} from '@/type/authorAdmin/worksManager';
import router from '@/hook/url';
import { message } from 'antd';
import { WorksChapterId, WorksId } from '@/constants/url';

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
        router.push('/admin/works/bookContainer', {
          [WorksId]: val.data.book_id,
          [WorksChapterId]: val.data.chapter_id,
        });
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
  if (!p.chapter_id)
    return {
      data: undefined,
      isLoading: false,
    };
  console.log('chapter_id', p.chapter_id);
  return useQuery<chapterDetailsProps, Error>(['getChapterDetails', p], () =>
    AuthorBook.worksChapterDetails(p).then((value) => {
      console.log('chapter_id11111111111', p.chapter_id);
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 删除作品
export const useDeleteWorks = (call?: Function) => {
  const queryClient = useQueryClient();
  const queryKey = ['getWorks'];
  return useMutation(
    ['delWorks'],
    (p: { id: number }) => AuthorBook.deleteAuthorBook(p),
    {
      onSuccess() {
        queryClient.invalidateQueries(queryKey);
        call?.();
      },
      onMutate(target) {
        let previousItems;
        queryClient.setQueriesData(queryKey, (old?: worksListProps) => {
          console.log('old', queryClient.getQueriesData(queryKey));
          previousItems = { ...old };
          return {
            page_info: old?.page_info,
            data: old?.data.filter((item) => item.id !== target.id),
          } as worksListProps;
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
// // 创建章节
// export const useCreateChapter = ()=>{
//     return useMutation(
//         ['createChapter'],
//         (p:creatChapterProps)=>AuthorBook.createWorksChapter(p),
//         {
//             onSuccess(val){
//                 if (!ErrorCheck(val))return;
//                 message.success("创建成功")
//             }
//         }
//     )
// }
//编辑章节
export const useEditChapter = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ['editChapter'],
    (p: creatChapterProps) => AuthorBook.editWorksChapter(p),
    {
      onSuccess(val) {
        if (!ErrorCheck(val)) return;
        queryClient.invalidateQueries(['getChapterDetails']);
        message.success('修改成功');
      },
    },
  );
};
