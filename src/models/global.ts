import { Effect, Reducer } from 'umi';
import { tabProps } from '@/components/module/tabBar';
import { tabBarList } from '@/pages/home/bookList';
import { homeChartProps } from '@/type/home';

export type globalState = {
  loading: boolean; //加载
  homeTab: {
    scroll: number;
    tab: tabProps;
    bookList: homeChartProps | null;
    noticeList: {
      top: number;
      height: string;
    };
  }; //首页tab信息
  openCommentBox: boolean; //是否打开评论框
};
type globalModelPopup = {
  namespace: 'global';
  state: globalState;
  effects: {
    openLoading: Effect;
    closeLoading: Effect;
    setHomeTab: Effect;
    setCommentBox: Effect;
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
      tab: tabBarList[0],
      bookList: null,
      noticeList: {
        top: 0,
        height: '',
      },
    },
    openCommentBox: false,
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
    *setCommentBox({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          openCommentBox: payload,
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
