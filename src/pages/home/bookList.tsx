import React, { useEffect, useState } from 'react';
import { TabBar, tabProps } from '@/components/module/tabBar';
import { BookItem } from '@/pages/home/components/bookItem';
import './style/bookList.less';
import { useHomeChart, useModifyApproval } from '@/utils/home';
import { homeChartProps } from '@/type/home';
import { useAuth } from '@/hook/useAuth';
import { useMounted } from '@/hook';
import router from '@/hook/url';
import { BookId, TopicId } from '@/constants/url';
import { useDispatch, useSelector } from 'umi';
import { globalState } from '@/models/global';
import { ConnectState } from '@/models/modelConnect';
import { useAddBookCase } from '@/utils/rank';

export const tabBarList = [
  { label: '推荐', key: 'recommend' },
  { label: 'VIP精选', key: 'vipPush' },
  { label: '新书', key: 'newBook' },
];
const BookList = () => {
  const disPatch = useDispatch();
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  const [bookList, setBookList] = useState<homeChartProps | null>(null);
  const [currentTabIndex, setTabIndex] = useState(0);
  const { userInfo, setLoadingModel } = useAuth();
  //点赞
  const { mutate: setApproval } = useModifyApproval('home', currentTabIndex);
  const { data: chartData } = useHomeChart(
    () => setLoadingModel(false),
    userInfo,
  );

  // 阅读
  const readBook = (bookId: number, index: number) => {
    disPatch({
      type: 'global/setHomeTab',
      payload: {
        scroll: document.documentElement.scrollTop,
        tab: tabBarList[index],
      },
    });
    router.push('/read', { [BookId]: bookId });
  };
  // 加入书架
  const { mutate: addBookCase } = useAddBookCase('home', currentTabIndex);

  // tabBarList 选择改变
  const tabChange = (tab: tabProps) => {
    if (chartData === undefined) return false;
    switch (tab.key) {
      case 'recommend':
        setTabIndex(0);
        setBookList(chartData[0]);
        break;
      case 'vipPush':
        setTabIndex(1);
        setBookList(chartData[1]);
        break;
      case 'newBook':
        setTabIndex(2);
        setBookList(chartData[2]);
        break;
    }
  };
  useMounted(() => {
    document.body.scrollTop = globalState.homeTab.scroll;
    setLoadingModel(true);
  });
  useEffect(() => {
    tabChange(globalState.homeTab.tab);
  }, [chartData]);
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
        onClick={(book) => readBook(book.id, currentTabIndex)}
        onComment={(book) => {
          readBook(book.id, currentTabIndex);
          disPatch({ type: 'global/setCommentBox', payload: true });
        }}
        clickTitle={(topicId) =>
          topicId ? router.push('/topicInfo', { [TopicId]: topicId }) : ''
        }
        onAddBookCase={(bookId) => addBookCase({ book_id: bookId })}
      />
    </div>
  );
};
export default BookList;
