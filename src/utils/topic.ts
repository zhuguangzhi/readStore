import { pageRequestProps } from '@/type/book';
import { useQuery } from 'react-query';
import { ErrorCheck, Topic } from '@/common/api';
import {
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
