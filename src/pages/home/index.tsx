import React from 'react';

import './style/home.less';
import BookList from '@/pages/home/bookList';
import { NoticeList } from '@/pages/home/noticeList';
import { SwiperBanner } from '@/pages/home/components/swiperBanner';
import { useGetSwiper } from '@/utils/home';
import { useDispatch } from 'umi';
import { ReadBackTop } from '@/components/module/ReadBackTop';

const Index = () => {
  const disPatch = useDispatch();
  //  获取swiper信息
  const { data: swiperData } = useGetSwiper();
  // 去往指定页面
  const saveScroll = (param?: { [key: string]: unknown }) => {
    disPatch({
      type: 'global/setHomeTab',
      payload: {
        scroll: (document.querySelector('.webContainer') as HTMLElement)
          .scrollTop,
        ...param,
      },
    });
  };

  return (
    <div className={'home'}>
      {/*banner*/}
      <SwiperBanner
        swiperBookInfo={
          swiperData && swiperData.data.length > 0 ? swiperData.data : null
        }
        swiperBannerUrl={swiperData?.banner_image_url}
        className={'home_carousel'}
      />
      {/*  container*/}
      <main
        className={'justify_between'}
        style={{ marginBottom: '12px', position: 'relative' }}
      >
        <BookList saveScroll={saveScroll} />
        <NoticeList saveScroll={saveScroll} />
      </main>
      <ReadBackTop />
    </div>
  );
};
export default Index;
