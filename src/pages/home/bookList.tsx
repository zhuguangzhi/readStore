import React, { useEffect, useState } from 'react';
import { TabBar, tabProps } from '@/components/module/tabBar';
import { BookItem } from '@/pages/home/components/bookItem';
import './style/bookList.less';
import { useDelBookCase, useHomeChart, useModifyApproval } from '@/utils/home';
import { homeChartProps } from '@/type/home';
import { useAuth } from '@/hook/useAuth';
import { useMounted } from '@/hook';
import router from '@/hook/url';
import { OpenComment, TopicId } from '@/constants/url';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import { useAddBookCase } from '@/utils/rank';
import { toRead } from '@/common/publicFn';

export const tabBarList = [
  { label: '推荐', key: 'recommend' },
  { label: 'VIP精选', key: 'vipPush' },
  { label: '新书', key: 'newBook' },
];
type BookListProps = {
  saveScroll: (disPatchParam?: { [key: string]: unknown }) => void;
};
const BookList = ({ saveScroll }: BookListProps) => {
  const disPatch = useDispatch();
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;

  const [bookList, setBookList] = useState<homeChartProps | null>(
    globalState.homeTab.bookList,
  );
  const [currentTabIndex, setTabIndex] = useState(0);
  const { userInfo, setLoadingModel } = useAuth();
  //点赞
  const { mutate: setApproval } = useModifyApproval('home', currentTabIndex);
  const { data: chartData } = useHomeChart(userInfo);

  // 去话题
  const toTopic = (topicId: number, index: number) => {
    saveScroll({
      tab: tabBarList[index],
    });
    router.push('/topicInfo', { [TopicId]: topicId });
  };
  // 加入书架
  const { mutate: addBookCase } = useAddBookCase('home', currentTabIndex);
  // 移出书架
  const { mutate: deleteBooks } = useDelBookCase(currentTabIndex);

  // tabBarList 选择改变
  const tabChange = (tab: tabProps) => {
    if (chartData === undefined) return false;
    setLoadingModel(false);
    const index = tab.key === 'recommend' ? 0 : tab.key === 'vipPush' ? 1 : 2;
    setTabIndex(index);
    setBookList(chartData[index]);
    disPatch({
      type: 'global/setHomeTab',
      payload: {
        bookList: chartData[index],
      },
    });
  };

  // 加入书架？移出书架
  const bookOperation = (bookId: number, type: 1 | 2) => {
    if (type === 1) addBookCase({ book_id: bookId });
    else deleteBooks({ book_id: String(bookId) });
  };

  useEffect(() => {
    setLoadingModel(true);
    tabChange(globalState.homeTab.tab);
  }, [chartData]);
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
        defaultSelect={tabBarList[currentTabIndex].key}
        selectChange={tabChange}
      />
      <BookItem
        bookList={bookList?.data || null}
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
