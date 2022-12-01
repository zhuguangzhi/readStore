import { Effect, Reducer } from 'umi';
import { authorProps } from '@/type/user';

export type userState = {
  userInfo: authorProps | null; //用户信息
  token: string | null; //token
};
type userModelPopup = {
  namespace: 'userModel';
  state: userState;
  effects: {
    setUserInfo: Effect;
    setToken: Effect;
  };
  reducers: {
    save: Reducer<userModelPopup>;
  };
};
export default {
  namespace: 'userModel',
  state: {
    userInfo: null,
    token: null,
  },
  effects: {
    //打开loading
    *setUserInfo({ payload }, { put }) {
      console.log('token执行', payload);
      yield put({
        type: 'save',
        payload: {
          userInfo: payload,
        },
      });
    },
    //关闭loading
    *setToken({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          token: payload,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
} as userModelPopup;
