import React, { useEffect, useState } from 'react';
import { TabBar, tabProps } from '@/components/module/tabBar';
import { BookItem } from '@/pages/home/components/bookItem';
import './style/bookList.less';
import { useHomeChart, useModifyApproval } from '@/utils/home';
import { homeChartProps } from '@/type/home';
import { useAuth } from '@/hook/useAuth';
import { useMounted } from '@/hook';

const BookList = () => {
  const [bookList, setBookList] = useState<homeChartProps | null>(null);
  const [currentTabIndex, setTabIndex] = useState(0);
  const { userInfo, setLoadingModel } = useAuth();
  const tabBarList = [
    { label: '推荐', key: 'recommend' },
    { label: 'VIP精选', key: 'vipPush' },
    { label: '新书', key: 'newBook' },
  ];
  //点赞
  const { mutate: setApproval } = useModifyApproval(currentTabIndex);
  const { data: chartData } = useHomeChart(
    () => setLoadingModel(false),
    userInfo,
  );

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
    setLoadingModel(true);
  });
  useEffect(() => {
    tabChange(tabBarList[0]);
  }, [chartData]);
  return (
    <div className={'book_list'}>
      <TabBar
        className={'tab_bar'}
        tabs={tabBarList}
        defaultSelect={'recommend'}
        selectChange={tabChange}
      />
      <BookItem bookList={bookList} onApprove={(param) => setApproval(param)} />
    </div>
  );
};
export default BookList;
