import { useDispatch, useSelector } from 'umi';
import { useCallback } from 'react';
import { ConnectState } from '@/models/modelConnect';
import { userState } from '@/models/user';
import { getStorage, removeStorage, setStorage } from '@/common/publicFn';
import { Bus_ClearUserInfo, TOKEN, UserInfo } from '@/constants';
import { authorInfoProps, authorProps } from '@/type/user';
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
      setStorage(UserInfo, p);
    },
    [dispatch],
  );
  const setAuthorInfo = useCallback(
    (p: authorInfoProps | null) => {
      dispatch({
        type: 'userModel/setAuthorInfo',
        payload: p,
      });
      setStorage(UserInfo, p);
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

  const setLoadingModel = useCallback(
    (loading: boolean) => {
      dispatch({
        type: `global/${loading ? 'openLoading' : 'closeLoading'}`,
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
    setAuthorInfo,
    setLoginPopup,
    setLoadingModel,
  };
};

export const getToken = () => getStorage(TOKEN);
// 清除token
export const clearToken = () => {
  EventBus.emit(Bus_ClearUserInfo);
  removeStorage(TOKEN);
  removeStorage(UserInfo);
};
