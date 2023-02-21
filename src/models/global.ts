import { Effect, Reducer } from 'umi';
import { homeBookListProps } from '@/type/home';

export type globalState = {
  loading: boolean; //加载
  homeTab: {
    scroll: number;
    tab: 2 | 3 | 4;
    bookList: homeBookListProps['data'] | null;
    noticeList: {
      top: number;
      height: string;
    };
  }; //首页tab信息
  openVipModel: boolean; //vip弹窗
};
type globalModelPopup = {
  namespace: 'global';
  state: globalState;
  effects: {
    openLoading: Effect;
    closeLoading: Effect;
    setHomeTab: Effect;
    setVipModel: Effect;
  };
  reducers: {
    save: Reducer<globalState>;
  };
};
export default {
  namespace: 'global',
  state: {
    loading: false,
    homeTab: {
      scroll: 0,
      tab: 2,
      bookList: null,
      noticeList: {
        top: 0,
        height: '',
      },
    },
    openVipModel: false,
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
    *setHomeTab({ payload }, { put, select }) {
      // @ts-ignore
      const homeTabState = yield select((state) => state.global.homeTab);
      yield put({
        type: 'save',
        payload: {
          homeTab: {
            ...homeTabState,
            ...payload,
          },
        },
      });
    },
    *setVipModel({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          openVipModel: payload,
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
