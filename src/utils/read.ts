import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  commentRequestProps,
  commentStoreRequestProps,
  readBookInfoProps,
  readBookProps,
  readComponentProps,
  replyRequestProps,
  replyStoreRequestProps,
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
// 评论的回复
export const useReply = () => {
  const queryClient = useQueryClient();
  return useMutation('replyStore', (p: replyRequestProps) => Comment.reply(p), {
    async onSuccess(val) {
      if (!ErrorCheck(val)) return;
      message.success('发表成功');
      await queryClient.invalidateQueries('readComment');
    },
  });
};
// 回复回复的回复
export const useCommentStore = () => {
  const queryClient = useQueryClient();
  return useMutation(
    'replyStore',
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
