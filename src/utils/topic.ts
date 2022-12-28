import { pageRequestProps } from '@/type/book';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ErrorCheck, Topic } from '@/common/api';
import {
  attentionTopicProps,
  topicBookListProps,
  topicDetailsProps,
  topicListProps,
  topicListRequestProps,
} from '@/type/topic';

//获取话题列表
export const useGetTopicList = (p: pageRequestProps) => {
  return useQuery<topicListProps, Error>(['topicList', p.page], () =>
    Topic.getTopicList(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取话题详情
export const useGetTopicDetail = (p: { id: number }) => {
  return useQuery<topicDetailsProps, Error>(['topicDetail', p.id], () =>
    Topic.getTopicDetails(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取话题列表
export const useGetTopicBookList = (p: topicListRequestProps) => {
  return useQuery<topicBookListProps, Error>(['topicBookList', p], () =>
    Topic.getTopicBookList(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 关注话题
export const useAttentionTopic = () => {
  const queryClient = useQueryClient();
  const queryKey = ['topicDetail'];
  return useMutation(
    ['attentionTopic'],
    (p: attentionTopicProps) => Topic.attentionTopic(p),
    {
      async onSuccess(val) {
        if (!ErrorCheck(val)) return;
        await queryClient.invalidateQueries(queryKey);
      },
      onMutate(target) {
        let previousItems;
        queryClient.setQueriesData(queryKey, (old?: topicDetailsProps) => {
          previousItems = { ...old };
          return {
            ...old,
            is_user_attention: target.is_attention,
          } as topicDetailsProps;
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
