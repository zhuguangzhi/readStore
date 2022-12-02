import React from 'react';

import './style/home.less';
import BookList from '@/pages/home/bookList';
import { NoticeList } from '@/pages/home/noticeList';
import { SwiperBanner } from '@/pages/home/components/swiperBanner';
import { useGetSwiper } from '@/utils/home';

const Index = () => {
  //  获取swiper信息
  const { data: swiperData } = useGetSwiper();
  return (
    <div className={'home'}>
      {/*banner*/}
      <SwiperBanner
        swiperBookInfo={
          swiperData && swiperData.data.length > 0 ? swiperData.data : null
        }
        className={'home_carousel'}
      />
      {/*  container*/}
      <main className={'justify_between'} style={{ marginBottom: '12px' }}>
        <BookList />
        <NoticeList />
      </main>
    </div>
  );
};
export default Index;
