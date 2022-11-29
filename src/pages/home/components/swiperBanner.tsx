import Slider, { Settings } from 'react-slick';
import React, { useRef, useState } from 'react';
import { swiperDuration } from '@/assets/config';
import { useMounted } from '@/hook';
import { IconFont } from '@/components/IconFont';
import { bookInfoProps } from '@/type/book';

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

type SliderProps = {
  swiperBookInfo: bookInfoProps[] | null;
  className?: string;
};
export const SwiperBanner = ({ swiperBookInfo, className }: SliderProps) => {
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
    <div className={className}>
      <div className={'home_carousel_desc'}>
        <p className={'font_24 font_bold'}>
          {swiperBookInfo?.[currentSwiperIndex].name}
        </p>
        <p style={{ width: '100%' }} className={'font_16 textOverflow'}>
          {swiperBookInfo?.[currentSwiperIndex].description}
        </p>
      </div>
      <Slider {...swiperOptions} className={'home_carousel_book'}>
        {swiperBookInfo?.map((book, index) => {
          return (
            <img
              key={book.id}
              className={`home_carousel_book_image ${
                currentSwiperIndex === index ? ' image_select' : ''
              }`}
              onMouseOver={() => {
                clearInterval(timer.current as NodeJS.Timer);
                setScrollIndex(index);
              }}
              onMouseOut={() => {
                renderTimer(index % (swiperOptions.slidesToScroll as number));
              }}
              src={book.cover_url}
              alt={book.name}
            />
          );
        })}
      </Slider>
    </div>
  );
};
