import React, { useEffect, useState } from 'react';
import './style/index.less';
import { BookBox } from '@/pages/bookRank/bookBox';
import { useGetBookRank } from '@/utils/rank';
import { useAuth } from '@/hook/useAuth';
import { toRead } from '@/common/publicFn';
import { DefaultNoData } from '@/components/defaultNoData';

const slideList = [
  { key: 1, label: '大热榜', subTitle: '根据七天内阅读人气进行排行' },
  { key: 2, label: '免费榜', subTitle: '根据七天内阅读人气进行排行' },
  {
    key: 3,
    label: '完本榜',
    subTitle: '根据七天内的点赞，收藏，人气进行综合排行',
  },
  {
    key: 4,
    label: '高赞榜',
    subTitle: '根据七天内点赞人气进行排行',
  },
  {
    key: 5,
    label: '热评榜',
    subTitle: '根据七天内评论最多的进行排行',
  },
];
export default () => {
  const { userInfo, setLoadingModel } = useAuth();
  const [sideOption, setSide] = useState({
    channelType: 2 as 1 | 2, //频道类型( 1：男频  2：女频 ）
    rankIndex: 0,
  });
  const { data: rankBookData, isLoading } = useGetBookRank(
    () => setLoadingModel(false),
    {
      channel_type: sideOption.channelType,
      rank_type: slideList[sideOption.rankIndex].key,
      page: 1,
      page_size: 9999,
    },
    userInfo,
  );

  useEffect(() => {
    if (isLoading) setLoadingModel(isLoading);
  }, [sideOption.rankIndex]);
  return (
    <div className={'bookRank'}>
      {/*侧边栏*/}
      <div className={'bookRank_side position_sticky'} style={{ top: 0 }}>
        <div>
          <p className={'SYMedium'}>女生排行榜</p>
          {slideList.map((item, index) => {
            const { channelType, rankIndex } = sideOption;
            return (
              <p
                className={
                  `2-${index}` === `${channelType}-${rankIndex}`
                    ? 'sideSelect'
                    : 'color_b2'
                }
                key={item.key}
                onClick={() => {
                  setSide((val) => ({
                    ...val,
                    channelType: 2,
                    rankIndex: index,
                  }));
                }}
              >
                {item.label}
              </p>
            );
          })}
        </div>
        <div>
          <p className={'SYMedium'}>男生排行榜</p>
          {slideList.map((item, index) => {
            const { channelType, rankIndex } = sideOption;
            return (
              <p
                className={
                  `1-${index}` === `${channelType}-${rankIndex}`
                    ? 'sideSelect'
                    : 'color_b2'
                }
                key={item.key}
                onClick={() => {
                  setSide((val) => ({
                    ...val,
                    channelType: 1,
                    rankIndex: index,
                  }));
                }}
              >
                {item.label}
              </p>
            );
          })}
        </div>
      </div>
      {/*    内容*/}
      <div className={'bookRank_container'}>
        {/*header头*/}
        <div className={'bookRank_container_header'}>
          <span className={'font_20 SYMedium'} style={{ marginRight: '17px' }}>
            {slideList[sideOption.rankIndex].label}
          </span>
          <span className={'font_12 color_99'}>
            {slideList[sideOption.rankIndex].subTitle}
          </span>
        </div>
        {/*  书籍  */}
        {!isLoading && rankBookData?.data.length === 0 ? (
          <DefaultNoData
            type={'noData'}
            className={'bookRank_container_noData'}
          />
        ) : (
          <BookBox
            bookList={rankBookData}
            toRead={(book) => toRead(book.chapter_id, book.id)}
          />
        )}
      </div>
    </div>
  );
};
