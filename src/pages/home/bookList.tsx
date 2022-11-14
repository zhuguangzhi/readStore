import React, { useState } from 'react';
import { TabBar } from '@/components/module/tabBar';
import { bookProps } from '@/type/book';
import { BookItem } from '@/pages/home/components/bookItem';
import './style/bookList.less';
import { testBookData } from '@/assets/testData';

export const BookList = () => {
  const [bookList] = useState<bookProps[]>([...testBookData]);
  const tabBarList = [
    { label: '推荐', key: 'recommend' },
    { label: 'VIP精选', key: 'vipPush' },
    { label: '新书', key: 'newBook' },
  ];
  return (
    <div className={'book_list'}>
      <TabBar
        className={'tab_bar'}
        tabs={tabBarList}
        defaultSelect={'recommend'}
      />
      <BookItem bookList={bookList} />
    </div>
  );
};
