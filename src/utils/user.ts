// 获取风向标
import { useMutation, useQuery } from '@tanstack/react-query';
import { accountLoginProps, authorProps, phoneLoginProps } from '@/type/user';
import { User } from '@/common/api';

// 账号密码登录
export const useAccountLogin = () => {
  return useMutation((p: accountLoginProps) => User.accountLogin(p), {
    onSuccess: (values) => {
      console.log('values', values);
      return values;
    },
  });
  // return useQuery<loginResultProps, Error>(['accountLogin'], () => User.accountLogin(p));
};
// 手机登录
export const usePhoneLogin = () => {
  return useMutation((p: phoneLoginProps) => User.phoneLogin(p), {
    onSuccess: (values) => values,
  });
  // return useQuery<loginResultProps, Error>(['phoneLogin'], () => User.phoneLogin(p));
};
// 获取用户信息
export const useGetUserInfo = () => {
  return useQuery<authorProps, Error>(['getUserInfo'], () =>
    User.getUserInfo(),
  );
};
