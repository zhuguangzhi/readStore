import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  commentApprovalProps,
  commentProps,
  commentReply,
  commentReplyRequestProps,
  commentRequestProps,
  commentStoreRequestProps,
  readBookInfoProps,
  readBookProps,
  readComponentProps,
  replyRequestProps,
  replyStoreProps,
  replyStoreRequestProps,
  saveReadHistoryProps,
} from '@/type/book';
import { Book, Comment, ErrorCheck } from '@/common/api';
import { message } from 'antd';

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
// 获取评论内容
export const useGetCommentData = (p: commentRequestProps) => {
  return useQuery<readComponentProps, Error>(['readComment', p], () =>
    Comment.getComment(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取评论的回复
export const useGetCommentReply = (setData: Function) => {
  return useMutation(
    ['commentReply'],
    (p: commentReplyRequestProps) => Comment.getCommentReply(p),
    {
      onSuccess(val) {
        ErrorCheck(val);
        setData([...val.data.data]);
      },
    },
  );
  // return useQuery<commentReply,Error>(['commentReply',p],()=>
  //         Comment.getCommentReply(p).then((value)=>{
  //         ErrorCheck(value);
  //         return value.data;
  //     })
  // )
};
// 回复回复的回复
export const useReplyStore = () => {
  const queryClient = useQueryClient();
  return useMutation(
    'replyStore',
    (p: replyStoreRequestProps) => Comment.replyStore(p),
    {
      async onSuccess(val) {
        if (!ErrorCheck(val)) return;
        message.success('发表成功');
        await queryClient.invalidateQueries('readComment');
      },
    },
  );
};
// 发表评论的回复
export const useReply = () => {
  const queryClient = useQueryClient();
  return useMutation('reply', (p: replyRequestProps) => Comment.reply(p), {
    async onSuccess(val) {
      if (!ErrorCheck(val)) return;
      message.success('发表成功');
      await queryClient.invalidateQueries('readComment');
    },
  });
};
// 发表评论
export const useCommentStore = () => {
  const queryClient = useQueryClient();
  return useMutation(
    'commentStore',
    (p: commentStoreRequestProps) => Comment.commentStore(p),
    {
      async onSuccess(val) {
        if (!ErrorCheck(val)) return;
        message.success('发表成功');
        await queryClient.invalidateQueries('readComment');
      },
    },
  );
};
// 评论或回复de点赞
export const useCommentApproval = () => {
  const queryClient = useQueryClient();
  let queryKey = [] as string[];
  return useMutation(
    ['commentApproval'],
    (p: commentApprovalProps) => Comment.commentApproval(p),
    {
      onSuccess(val) {
        ErrorCheck(val);
      },
      onMutate(target) {
        let previousItems;
        queryKey = [target.comment_type === 1 ? 'readComment' : 'commentReply'];
        queryClient.setQueriesData(queryKey, (old) => {
          previousItems = old;
          let arr = { ...(old as commentReply | readComponentProps) };
          arr.data = arr.data.map((item) => {
            if (item.id === target.comment_id)
              item.is_user_approval = target.is_approval;
            return item;
          }) as replyStoreProps[] | commentProps[];
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
// 保存阅读记录
export const useSaveReadHistory = () => {
  return useMutation(
    ['saveReadHistory'],
    (p: saveReadHistoryProps) => Book.saveReadHistory(p),
    {
      onSuccess(val) {
        ErrorCheck(val);
      },
    },
  );
};
