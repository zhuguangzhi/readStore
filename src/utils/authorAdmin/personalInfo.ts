import { useQuery } from 'react-query';
import { AuthorPersonal, ErrorCheck } from '@/common/api';
import { authorPersonalProps } from '@/type/user';

// 获取作者个人信息
export const useGetPersonalInfo = () => {
  return useQuery<authorPersonalProps>(['getAuthorPersonalInfo'], () =>
    AuthorPersonal.getPersonalInfo().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
