import { useQuery } from 'react-query';
import { AuthorPersonal, ErrorCheck } from '@/common/api';
import { authorPersonalProps } from '@/type/user';
import {
  contractListProps,
  requestContractProps,
} from '@/type/authorAdmin/personalInfo';

// 获取作者个人信息
export const useGetPersonalInfo = () => {
  return useQuery<authorPersonalProps>(['getAuthorPersonalInfo'], () =>
    AuthorPersonal.getPersonalInfo().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取合同列表
export const useGetContractList = (p: requestContractProps) => {
  return useQuery<contractListProps, Error>(['getContractList', p], () =>
    AuthorPersonal.getContractList(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
