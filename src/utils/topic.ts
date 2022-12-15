import { pageRequestProps } from '@/type/book';
import { useQuery } from 'react-query';
import { ErrorCheck, Topic } from '@/common/api';
import { topCaseProps } from '@/type/topic';

export const useGetTopicCase = (p: pageRequestProps) => {
  return useQuery<topCaseProps, Error>(['topicCase'], () =>
    Topic.getTopicCase(p).then((val) => {
      ErrorCheck(val);
      return val.data;
    }),
  );
};
