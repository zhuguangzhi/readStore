import { Effect, Reducer } from 'umi';
import { tabProps } from '@/components/module/tabBar';
import { tabBarList } from '@/pages/home/bookList';
import { booksThemeProps } from '@/type/book';

export type globalState = {
  loading: boolean; //加载
  homeTab: {
    scroll: number;
    tab: tabProps;
  }; //首页tab信息
  bookRankIndex: number; //排行榜索引
  bookLibraryConfig: {
    readKey: 0 | 1 | 2; //选中读者key
    subThemeId: booksThemeProps['id'] | null; //选中二级主题id
    status: {
      bookState: 0 | 1 | 2; //书的连载状态
      slot: 3 | 4; //排序状态
    }; //选中状态key
    textKey: 0; //选中字数key
  }; //书库配置信息
  openCommentBox: boolean; //是否打开评论框
};
type globalModelPopup = {
  namespace: 'global';
  state: globalState;
  effects: {
    openLoading: Effect;
    closeLoading: Effect;
    setHomeTab: Effect;
    setNookRankIndex: Effect;
    setBookLibrary: Effect;
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
    },
    bookRankIndex: 0,
    bookLibraryConfig: {
      readKey: 0,
      subThemeId: null,
      status: {
        bookState: 0,
        slot: 3,
      }, //选中状态key
      textKey: 0,
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
    *setHomeTab({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          homeTab: payload,
        },
      });
    },
    *setNookRankIndex({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          bookRankIndex: payload,
        },
      });
    },
    *setBookLibrary({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          bookLibraryConfig: payload,
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
