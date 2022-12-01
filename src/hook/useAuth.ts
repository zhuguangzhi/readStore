import { useDispatch, useSelector } from 'umi';
import { useCallback } from 'react';
import { ConnectState } from '@/models/modelConnect';
import { userState } from '@/models/user';
import { getStorage, removeStorage, setStorage } from '@/common/publicFn';
import { TOKEN } from '@/constants';
import { authorProps } from '@/type/user';

export const useAuth = () => {
  const dispatch = useDispatch();
  const setToken = useCallback(
    (token: string) => {
      dispatch({
        type: 'userModel/setToken',
        payload: token,
      });
      setStorage(TOKEN, token);
    },
    [dispatch],
  );
  const setUserInfo = useCallback(
    (p: authorProps) => {
      dispatch({
        type: 'userModel/setUserInfo',
        payload: p,
      });
    },
    [dispatch],
  );

  const { token, userInfo } = useSelector(
    (state: ConnectState) => state.userModel,
  ) as userState;
  return {
    userInfo,
    token,
    setToken,
    setUserInfo,
  };
};
export const getToken = () => getStorage(TOKEN);
// 清除token
export const clearToken = () => removeStorage(TOKEN);
