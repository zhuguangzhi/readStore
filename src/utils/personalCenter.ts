import { pageRequestProps } from '@/type/book';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ErrorCheck, PersonalCenter } from '@/common/api';
import {
  delCommentProps,
  myCommentDataProps,
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
        queryClient.setQueriesData(queryKey, (old) => {
          previousItems = old;
          const arr = old
            ? { ...(old as myCommentProps) }
            : { data: [] as myCommentDataProps[] };
          const delIds = target.comment_id?.split(',') || [];
          arr.data.forEach((data, index) => {
            if (delIds.includes(data.id.toString())) {
              arr.data.splice(index, 1);
            }
          });
          console.log('arr', arr);
          return arr;
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
