import React, { useEffect, useState } from 'react';
import { TabBar, tabProps } from '@/components/module/tabBar';
import { BookItem } from '@/pages/home/components/bookItem';
import './style/bookList.less';
import {
  useDelBookCase,
  useGetHomeChartList,
  useModifyApproval,
} from '@/utils/home';
import { homeBookListProps } from '@/type/home';
import { useAuth } from '@/hook/useAuth';
import { useMounted } from '@/hook';
import router from '@/hook/url';
import { OpenComment, TopicId } from '@/constants/url';
import { globalState } from '@/models/global';
import { useAddBookCase } from '@/utils/rank';
import { scrollToBottom, setArrayForId, toRead } from '@/common/publicFn';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/modelConnect';

export const tabBarList = [
  { label: '推荐', key: 'recommend' },
  { label: 'VIP精选', key: 'vipPush' },
  { label: '新书', key: 'newBook' },
];
type BookListProps = {
  saveScroll: (disPatchParam?: { [key: string]: unknown }) => void;
};
const BookList = ({ saveScroll }: BookListProps) => {
  const pageSize = 10;
  const disPatch = useDispatch();
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;

  const [bookList, setBookList] = useState<homeBookListProps['data'] | null>(
    globalState.homeTab.bookList,
  );
  const [page, setPage] = useState(1);
  const [currentTabIndex, setTabIndex] = useState<2 | 3 | 4>(
    globalState.homeTab.tab,
  );
  const { userInfo, setLoadingModel } = useAuth();
  //点赞
  const { mutate: setApproval } = useModifyApproval('home');
  const { data: chartData, isLoading: chartLoading } = useGetHomeChartList(
    userInfo,
    {
      page: page,
      page_size: pageSize,
      chart_place: currentTabIndex,
    },
  );

  // 去话题
  const toTopic = (topicId: number, index: number) => {
    saveScroll({
      tab: tabBarList[index],
    });
    router.push('/topicInfo', { [TopicId]: topicId });
  };
  // 加入书架
  const { mutate: addBookCase } = useAddBookCase('home');
  // 移出书架
  const { mutate: deleteBooks } = useDelBookCase();

  // tabBarList 选择改变
  const tabChange = (tab: tabProps) => {
    const index = tab.key === 'recommend' ? 2 : tab.key === 'vipPush' ? 3 : 4;
    setTabIndex(index);
    setPage(1);
    setBookList(null);
    disPatch({
      type: 'global/setHomeTab',
      payload: {
        tab: index,
      },
    });
    // setBookList(chartData[index]);
  };

  // 加入书架？移出书架
  const bookOperation = (bookId: number, type: 1 | 2) => {
    if (type === 1) addBookCase({ book_id: bookId });
    else deleteBooks({ book_id: String(bookId) });
  };

  useEffect(() => {
    const webContainerRef = document.querySelector(
      '.webContainer',
    ) as HTMLElement;
    webContainerRef.onscroll = () => {
      scrollToBottom(300, () => {
        const total = chartData?.page_info?.total || 0;
        if (page * pageSize >= total) return;
        setPage(page + 1);
      });
    };
    // 数据处理
    if (!chartData)
      // bookShelfData.toString() === bookShelf.data.toString()
      return;
    const val = setArrayForId([...(bookList || []), ...chartData.data]);
    disPatch({
      type: 'global/setHomeTab',
      payload: {
        bookList: val,
      },
    });
    setBookList(val);
  }, [chartData]);
  useEffect(() => {
    setLoadingModel(chartLoading);
  }, [chartLoading]);
  useMounted(() => {
    (document.querySelector('.webContainer') as HTMLElement).scrollTop =
      globalState.homeTab.scroll;
    disPatch({
      type: 'global/setHomeTab',
      payload: {
        scroll: 0,
      },
    });
  });
  return (
    <div className={'book_list'}>
      <TabBar
        className={'tab_bar'}
        tabs={tabBarList}
        defaultSelect={tabBarList[currentTabIndex - 2].key}
        selectChange={tabChange}
      />
      <BookItem
        bookList={bookList}
        onApprove={(param) => setApproval(param)}
        onClick={(book) => toRead(book.chapter_id, book.id)}
        clickTitle={(topicId) =>
          topicId ? toTopic(topicId, currentTabIndex) : ''
        }
        onComment={(book) => {
          toRead(book.chapter_id, book.id, { [OpenComment]: 1 });
        }}
        onAddBookCase={(bookId, type) => bookOperation(bookId, type)}
      />
    </div>
  );
};
export default BookList;
