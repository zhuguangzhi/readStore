import { Effect, Reducer } from 'umi';

export type globalState = {
  loading: boolean; //加载
};
type globalModelPopup = {
  namespace: 'global';
  state: globalState;
  effects: {
    openLoading: Effect;
    closeLoading: Effect;
  };
  reducers: {
    save: Reducer<globalState>;
  };
};
export default {
  namespace: 'global',
  state: {
    loading: false,
  },
  effects: {
    //打开loading
    *openLoading({}, { put }) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        },
      });
    },
    //关闭loading
    *closeLoading({}, { put }) {
      yield put({
        type: 'save',
        payload: {
          loading: false,
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
} as globalModelPopup;
