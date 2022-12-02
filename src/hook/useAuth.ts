import { useDispatch, useSelector } from 'umi';
import { useCallback } from 'react';
import { ConnectState } from '@/models/modelConnect';
import { userState } from '@/models/user';
import { getStorage, removeStorage, setStorage } from '@/common/publicFn';
import { Bus_ClearUserInfo, TOKEN } from '@/constants';
import { authorProps } from '@/type/user';
import EventBus from '@/common/EventBus';

export const useAuth = () => {
  const dispatch = useDispatch();
  const setToken = useCallback(
    (token: string | null) => {
      dispatch({
        type: 'userModel/setToken',
        payload: token,
      });
      setStorage(TOKEN, token);
    },
    [dispatch],
  );
  const setUserInfo = useCallback(
    (p: authorProps | null) => {
      dispatch({
        type: 'userModel/setUserInfo',
        payload: p,
      });
    },
    [dispatch],
  );
  const setLoginPopup = useCallback(
    (p: boolean) => {
      dispatch({
        type: 'userModel/setLoginPopup',
        payload: p,
      });
    },
    [dispatch],
  );

  const userModel = useSelector(
    (state: ConnectState) => state.userModel,
  ) as userState;

  return {
    ...userModel,
    setToken,
    setUserInfo,
    setLoginPopup,
  };
};

export const getToken = () => getStorage(TOKEN);
// 清除token
export const clearToken = () => {
  removeStorage(TOKEN);
  EventBus.emit(Bus_ClearUserInfo);
};
