import React, { useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';

import './style/home.less';
import { bookProps } from '@/type/book';
import { IconFont } from '@/components/IconFont';
import { swiperDuration } from '@/assets/config';
import { useMounted } from '@/hook';
import { BookList } from '@/pages/home/bookList';
import { NoticeList } from '@/pages/home/noticeList';
import { testBookData } from '@/assets/testData';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SampleNextArrow = (props: any) => {
  return (
    <IconFont
      className={'cursor'}
      onClick={props.onClick}
      icon={'right-white'}
      width={'20px'}
      height={'36px'}
    />
  );
};
/* eslint-disable  @typescript-eslint/no-explicit-any */
const SamplePrevArrow = (props: any) => {
  return (
    <IconFont
      className={'cursor'}
      onClick={props.onClick}
      icon={'left-white'}
      width={'20px'}
      height={'36px'}
    />
  );
};

const Index = () => {
  //swiper内容信息
  const [swiperBookInfo] = useState<Partial<bookProps>[]>([...testBookData]);
  //swiper 当前scroll的索引
  const [currentSwiperIndex, setScrollIndex] = useState<number>(0);
  //setInterval实例
  let timer = useRef<NodeJS.Timer | null>(null);
  //滑片滚动
  const swiperChange = (next: number) => {
    setScrollIndex(next);
    renderTimer();
  };

  //  swiper配置项
  const swiperOptions: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => swiperChange(next),
  };

  const renderTimer = (index = 0) => {
    if (timer.current) clearInterval(timer.current);
    // swiper突起切换函数
    let step = index;
    timer.current = setInterval(() => {
      if (step >= 3) {
        setScrollIndex((val) => val - 3);
        step = 0;
      } else {
        step++;
        setScrollIndex((val) => val + 1);
      }
    }, swiperDuration * 1000);
  };

  useMounted(() => {
    renderTimer();
    return () => {
      clearInterval(timer.current as NodeJS.Timer);
    };
  });

  return (
    <div className={'home'}>
      {/*banner*/}
      <div className={'home_carousel'}>
        <div className={'home_carousel_desc'}>
          <p className={'font_24 font_bold'}>
            {swiperBookInfo[currentSwiperIndex].title}
          </p>
          <p style={{ width: '100%' }} className={'font_16 textOverflow'}>
            {swiperBookInfo[currentSwiperIndex].abstract}
          </p>
        </div>
        <Slider {...swiperOptions} className={'home_carousel_book'}>
          {swiperBookInfo.map((book, index) => {
            return (
              <img
                key={book.id}
                className={`home_carousel_book_image 
                     ${currentSwiperIndex === index ? ' image_select' : ''}`}
                onMouseOver={() => {
                  clearInterval(timer.current as NodeJS.Timer);
                  setScrollIndex(index);
                }}
                onMouseOut={() => {
                  renderTimer(index % (swiperOptions.slidesToScroll as number));
                }}
                src={book.face}
                alt={book.title}
              />
            );
          })}
        </Slider>
      </div>
      {/*  container*/}
      <main className={'justify_between'} style={{ marginBottom: '12px' }}>
        <BookList />
        <NoticeList />
      </main>
    </div>
  );
};
export default Index;
