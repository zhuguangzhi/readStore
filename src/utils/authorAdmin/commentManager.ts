import { adminCommentRequestProps } from '@/type/authorAdmin/commentManager';
import { AuthorComment, ErrorCheck } from '@/common/api';
import { useQuery } from 'react-query';
import { readComponentProps } from '@/type/book';

export const useGetAdminComment = (p: adminCommentRequestProps) => {
  return useQuery<readComponentProps, Error>(['adminComment', p], () =>
    AuthorComment.getCommentList(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
