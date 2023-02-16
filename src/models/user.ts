import { Effect, Reducer } from 'umi';
import { authorInfoProps, authorPersonalProps, authorProps } from '@/type/user';

export type userState = {
  userInfo: authorProps | null; //用户信息
  authorInfo: authorInfoProps | null; //作者书籍信息
  authorPersonalInfo: authorPersonalProps | null; //作者个人信息
  token: string | null; //token
  loginPopup: boolean; //是否打开登陆弹窗
};
type userModelPopup = {
  namespace: 'userModel';
  state: userState;
  effects: {
    setUserInfo: Effect;
    setAuthorInfo: Effect;
    setAuthorPersonalInfo: Effect;
    setToken: Effect;
    setLoginPopup: Effect;
  };
  reducers: {
    save: Reducer<userModelPopup>;
  };
};
export default {
  namespace: 'userModel',
  state: {
    userInfo: null,
    authorInfo: null,
    authorPersonalInfo: null,
    token: null,
    loginPopup: false,
  },
  effects: {
    *setUserInfo({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          userInfo: payload,
        },
      });
    },
    *setAuthorInfo({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          authorInfo: payload,
        },
      });
    },
    *setAuthorPersonalInfo({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          authorPersonalInfo: payload,
        },
      });
    },
    //设置登陆弹窗
    *setLoginPopup({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          loginPopup: payload,
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
