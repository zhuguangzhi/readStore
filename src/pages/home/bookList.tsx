import React, { useEffect, useState } from 'react';
import { TabBar, tabProps } from '@/components/module/tabBar';
import { BookItem } from '@/pages/home/components/bookItem';
import './style/bookList.less';
import { useHomeChart } from '@/utils/home';
import { homeChartProps } from '@/type/home';
import { connect } from '@@/exports';
import { Dispatch } from 'umi';
import { useMounted } from '@/hook';

const BookList = ({ dispatch }: { dispatch: Dispatch }) => {
  const [bookList, setBookList] = useState<homeChartProps | null>(null);
  const [, setTabIndex] = useState(0);
  const tabBarList = [
    { label: '推荐', key: 'recommend' },
    { label: 'VIP精选', key: 'vipPush' },
    { label: '新书', key: 'newBook' },
  ];
  //点赞
  // const {mutate:setApproval} = useModifyApproval(currentTabIndex)
  const { data: chartData } = useHomeChart((type) => loading(type));

  //触发loading
  const loading = (type: 'openLoading' | 'closeLoading') => {
    dispatch({
      type: 'global/' + type,
      payload: {
        loading: type === 'openLoading',
      },
    });
  };
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
  useEffect(() => {
    tabChange(tabBarList[0]);
  }, [chartData]);

  useMounted(() => {
    loading('openLoading');
  });
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
export default connect()(BookList);
