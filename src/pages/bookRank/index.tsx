import React, { useState } from 'react';
import './style/index.less';
import { BookBox } from '@/pages/bookRank/bookBox';
import { testBookRankData } from '@/assets/testData';

export default () => {
  const slideList = [
    { key: 'hot', label: '大热榜', subTitle: '根据七天内阅读人气进行排行' },
    { key: 'free', label: '免费榜', subTitle: '根据七天内阅读人气进行排行' },
    {
      key: 'finish',
      label: '完本榜',
      subTitle: '根据七天内的点赞，收藏，人气进行综合排行',
    },
    {
      key: 'approval',
      label: '高赞榜',
      subTitle: '根据七天内点赞人气进行排行',
    },
    {
      key: 'comment',
      label: '热评榜',
      subTitle: '根据七天内评论最多的进行排行',
    },
  ];
  const [sideIndex, setSide] = useState(0);

  return (
    <div className={'bookRank'}>
      {/*侧边栏*/}
      <div className={'bookRank_side'}>
        <p>热门排行榜</p>
        {slideList.map((item, index) => {
          return (
            <p
              className={index === sideIndex ? 'sideSelect' : ''}
              key={item.key}
              onClick={() => setSide(index)}
            >
              {item.label}
            </p>
          );
        })}
      </div>
      {/*    内容*/}
      <div className={'bookRank_container'}>
        {/*header头*/}
        <div className={'bookRank_container_header'}>
          <span className={'font_20'} style={{ marginRight: '17px' }}>
            {slideList[sideIndex].label}
          </span>
          <span className={'font_12 color_99'}>
            {slideList[sideIndex].subTitle}
          </span>
        </div>
        {/*  书籍  */}
        <BookBox bookList={testBookRankData} />
      </div>
    </div>
  );
};
