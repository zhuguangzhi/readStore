import React, { useEffect, useState } from 'react';
import { TabBar, tabProps } from '@/components/module/tabBar';
import { BookItem } from '@/pages/home/components/bookItem';
import './style/bookList.less';
import { useHomeChart } from '@/utils/home';
import { homeChartProps } from '@/type/home';

export const BookList = () => {
  const [bookList, setBookList] = useState<homeChartProps | null>(null);
  const tabBarList = [
    { label: '推荐', key: 'recommend' },
    { label: 'VIP精选', key: 'vipPush' },
    { label: '新书', key: 'newBook' },
  ];
  const { data: chartData } = useHomeChart();

  // tabBarList 选择改变
  const tabChange = (tab: tabProps) => {
    if (chartData === undefined) return false;
    switch (tab.key) {
      case 'recommend':
        setBookList(chartData[0]);
        break;
      case 'vipPush':
        setBookList(chartData[1]);
        break;
      case 'newBook':
        setBookList(chartData[2]);
        break;
    }
  };
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
      <BookItem bookList={bookList} />
    </div>
  );
};
