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
import { Book, Comment, ErrorCheck, User } from '@/common/api';
import { message } from 'antd';
import {
  attentionUserProps,
  reportOptionProps,
  reportProps,
} from '@/type/user';
import { setAttention } from '@/utils/mutate/setAttention';

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
  return useQuery<readBookInfoProps, Error>([`readBookInfo${p.id}`, p.id], () =>
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
export const useCommentStore = (call?: Function) => {
  const queryClient = useQueryClient();
  return useMutation(
    'commentStore',
    (p: commentStoreRequestProps) => Comment.commentStore(p),
    {
      async onSuccess(val) {
        if (!ErrorCheck(val)) return;
        message.success('发表成功');
        await queryClient.invalidateQueries('readComment');
        call?.();
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
// 获取举报配置
export const useGetReportOption = () => {
  return useQuery<reportOptionProps[], Error>(['getReportOption'], () =>
    User.getReportOption().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 举报
export const useReport = () => {
  return useMutation(['report'], (p: reportProps) => User.reportChapter(p), {
    onSuccess() {
      message.success('感谢您的反馈，我们将尽快核实！');
    },
  });
};
// 关注
export const useAttentionUser = (
  type: 'readBookInfo' | 'getFans' = 'readBookInfo',
  bookId?: number,
) => {
  const queryClient = useQueryClient();
  const queryKey = [type];
  return useMutation(
    ['attentionUser'],
    (p: attentionUserProps) => User.attentionUser(p),
    {
      onSuccess(val, target) {
        if (type === 'readBookInfo') queryClient.invalidateQueries(queryKey);
        if (!ErrorCheck(val)) {
          let query = { ...target };
          query.is_attention = query.is_attention === 1 ? 2 : 1;
          setAttention[type](query, queryClient, bookId);
        }
      },
      onMutate(target) {
        let previousItems = queryClient.getQueriesData(queryKey);
        setAttention[type](target, queryClient, bookId);
        // queryClient.setQueriesData(queryKey,(old?:readBookInfoProps)=>{
        //     if (!old) return {} as readBookInfoProps
        //     return {...old,is_attention:target.is_attention}
        // })
        return { previousItems };
      },
      //错误回滚
      onError(error, newItem, context) {
        queryClient.setQueriesData(queryKey, context?.previousItems);
      },
    },
  );
};
