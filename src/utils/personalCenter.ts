import { pageRequestProps } from '@/type/book';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ErrorCheck, PersonalCenter, Topic, User } from '@/common/api';
import {
  delCommentProps,
  myBookListProps,
  myCommentProps,
  personalMessageProps,
} from '@/type/personalCenter';
import { topCaseProps } from '@/type/topic';
import {
  fansApprovalProps,
  authorInfoProps,
  editInfoProps,
  fansProps,
  vipRechargeProps,
  authorProps,
  payProps,
} from '@/type/user';

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
// 作者信息
export const useGetAuthorInfo = (p: { id: number }) => {
  return useQuery<authorInfoProps, Error>(['getAuthorInfo', p], () =>
    PersonalCenter.getAuthorInfo(p).then((value) => {
      ErrorCheck(value);
      return value.data;
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
        queryClient.setQueriesData(queryKey, (old?: myCommentProps) => {
          previousItems = old ? { ...old } : {};
          if (!old) return {} as myCommentProps;
          const delIds = target.comment_id?.split(',') || [];
          return {
            page_info: old.page_info,
            data: old.data.filter(
              (item) => !delIds.includes(item.id.toString()),
            ),
          };
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

// 我的书架列表
type useGetMyBooksProps<T> = {
  page: T;
  type: 'getMyBookList' | 'getReadHistory';
};
export const useGetMyBooks = (p: useGetMyBooksProps<pageRequestProps>) => {
  return useQuery<myBookListProps, Error>(['myBooks', p], () =>
    PersonalCenter[p.type](p.page).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};

// 移出我的书架
export const useDelMyBook = (
  type: 'topicCase' | 'myBooks',
  delType: 'bookShelf' | 'history',
  call?: Function,
) => {
  const queryClient = useQueryClient();
  const queryKey = [type];
  const url = delType === 'bookShelf' ? 'delMyBooks' : 'delMyBooksHistory';
  return useMutation(
    ['delMyBook'],
    (p: { book_id: string }) => PersonalCenter[url](p),
    {
      async onSuccess(val) {
        ErrorCheck(val);
        await queryClient.invalidateQueries(queryKey);
      },
      onMutate(target) {
        let previousItems = queryClient.getQueriesData(queryKey);
        queryClient.setQueriesData(queryKey, (old?: myBookListProps) => {
          if (!old) return {} as myBookListProps;
          const delIds = target.book_id?.split(',') || [];
          call?.();
          return {
            page_info: old.page_info,
            data: old.data.filter(
              (item) => !delIds.includes(item.book_id.toString()),
            ),
          };
        });
        return { previousItems };
      },
      //错误回滚
      onError(error, newItem, context) {
        console.log('context', context);
        queryClient.setQueriesData(queryKey, context?.previousItems);
      },
    },
  );
};
// 获取话题书架
interface useGetTopicCaseProps extends pageRequestProps {
  type: 'topicShelf' | 'topicHistory';
}
export const useGetTopicCase = (p: useGetTopicCaseProps) => {
  const url = p.type === 'topicHistory' ? 'getTopicHistory' : 'getTopicCase';
  return useQuery<topCaseProps, Error>(['topicCase', p], () =>
    Topic[url](p).then((val) => {
      ErrorCheck(val);
      return val.data;
    }),
  );
};
// 修改个人信息
export const useEditInfo = (call?: (param: editInfoProps) => void) => {
  let param: editInfoProps;
  return useMutation(
    ['editUserInfo'],
    (p: editInfoProps) => {
      param = { ...p };
      return User.editInfo(p);
    },
    {
      onSuccess(val) {
        if (!ErrorCheck(val)) return;
        call?.(param);
      },
    },
  );
};

// 获取粉丝、关注框的信息
interface getFansModalListProps extends pageRequestProps {
  type: 'fans' | 'attention' | 'approval';
}
export const useGetFansModalList = (p: getFansModalListProps) => {
  type resProps = fansProps | fansApprovalProps;
  let url: 'getFans' | 'getAttention' | 'getApprovalList';
  let queryKey: string = 'getFans';
  switch (p.type) {
    case 'fans': {
      url = 'getFans';
      queryKey = url;
      break;
    }
    case 'attention': {
      url = 'getAttention';
      queryKey = url;
      break;
    }
    case 'approval': {
      url = 'getApprovalList';
      queryKey = url;
      break;
    }
  }
  return useQuery<resProps, Error>([queryKey, p], () =>
    PersonalCenter[url](p).then((value) => value.data),
  );
};

// 获取消息列表 message_type 消息类型( 0：全部  1：系统通知  2：审核通知  3：签约通知  4：收入通知  5：活动通知 ）
export const useGetSystemMessage = (
  p: pageRequestProps & { message_type: number },
) => {
  return useQuery<personalMessageProps, Error>(['getPersonalMessage', p], () =>
    PersonalCenter.getSystemMessage(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 消息已读
export const useReadMessage = () => {
  const queryClient = useQueryClient();
  const queryKey = ['getPersonalMessage'];
  return useMutation(
    ['readMessage'],
    (p: { id: number }) => PersonalCenter.readMessageForId(p),
    // (p:{id:number})=> User.getUserInfo(),
    {
      onSuccess(val) {
        ErrorCheck(val);
        queryClient.invalidateQueries(queryKey);
      },
      onMutate(target) {
        let previousItems;
        queryClient.setQueriesData(queryKey, (old?: personalMessageProps) => {
          previousItems = old;
          if (!old) return {} as personalMessageProps;
          const data = old.data.map((item) => {
            if (item.id === target.id) item.is_read = 1;
            return item;
          });
          return {
            ...old,
            data,
          };
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
// 已读全部消息
export const useReadAllMessage = () => {
  const queryClient = useQueryClient();
  const queryKey = ['getPersonalMessage'];
  return useMutation(
    ['readAllMessage'],
    () => PersonalCenter.readAllMessage(),
    {
      onSuccess(val) {
        ErrorCheck(val);
        queryClient.invalidateQueries(queryKey);
      },
      onMutate() {
        let previousItems;
        queryClient.setQueriesData(queryKey, (old?: personalMessageProps) => {
          previousItems = old;
          if (!old) return {} as personalMessageProps;
          const data = old.data.map((item) => {
            item.is_read = 1;
            return item;
          });
          return {
            ...old,
            data,
          };
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

// 获取vip金额配置
export const useGetVipMoneyList = (userInfo: authorProps | null) => {
  return useQuery<vipRechargeProps[], Error>(['getMoneyList', userInfo], () =>
    PersonalCenter.getVipMoneyOption().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 充值
export const useToPay = (call?: Function) => {
  return useMutation(['pay'], (p: payProps) => PersonalCenter.pay(p), {
    onSuccess(val) {
      if (!ErrorCheck(val)) return;
      const html = window.open();
      html?.document.write(val.data);
      call?.();
    },
  });
};
