import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthorPersonal, ErrorCheck } from '@/common/api';
import { authorPersonalProps } from '@/type/user';
import {
  authorMessageProps,
  authorMessageRequestProps,
  bankVerifyProps,
  contractListProps,
  faceVerifyProps,
  modifyAuthorBaseInfoProps,
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
// 身份证认证
export const useSignFaceVerify = (call?: Function) => {
  return useMutation(
    ['signFaceVerify'],
    (p: faceVerifyProps) => AuthorPersonal.signFaceVerify(p),
    {
      onSuccess(val) {
        window.open(val.data.link);
        if (ErrorCheck(val)) call?.();
      },
    },
  );
};
// 查看身份证认证信息
export const useGetSignFaceVerifyInfo = (call?: Function) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['getSignFaceVerifyInfo'],
    (p: { user_id: string }) => AuthorPersonal.getSignFaceVerifyInfo(p),
    {
      onSuccess(val) {
        if (!ErrorCheck(val)) return;
        call?.();
        queryClient.invalidateQueries(['getAuthorPersonalInfo']);
      },
    },
  );
};
// 查看银行卡信息
export const useGetBankInfo = () => {
  return useMutation(
    ['getBankInfo'],
    (p: { user_id: string }) => AuthorPersonal.getBankVerifyInfo(p),
    {
      onSuccess(val) {
        ErrorCheck(val);
      },
    },
  );
};
// 银行卡认证
export const useBankVerify = (call?: Function) => {
  return useMutation(
    ['BankVerify'],
    (p: bankVerifyProps) => AuthorPersonal.bankVerify(p),
    {
      onSuccess(val) {
        if (ErrorCheck(val)) call?.();
      },
    },
  );
};
// 修改用户基本信息
export const useModifyAuthorBaseInfo = (call?: Function) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['modifyAuthorBaseInfo'],
    (p: modifyAuthorBaseInfoProps) => AuthorPersonal.modifyAuthorBaseInfo(p),
    {
      onSuccess(val) {
        if (!ErrorCheck(val)) return;
        call?.();
        queryClient.invalidateQueries(['getAuthorPersonalInfo']);
      },
    },
  );
};

// 获取作者消息
export const useGetAuthorMessage = (p: authorMessageRequestProps) => {
  return useQuery<authorMessageProps>(['getAuthorMessage', p], () =>
    AuthorPersonal.authorMessage(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
