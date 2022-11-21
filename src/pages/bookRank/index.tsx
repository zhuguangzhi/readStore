import React, { useState } from 'react';
import './style/index.less';
import { BookBox } from '@/pages/bookRank/bookBox';
import { testBookRankData } from '@/assets/testData';

export default () => {
  const slideList = [
    { key: 'read', label: '阅读榜', subTitle: '根据七天内阅读人数进行排行' },
    { key: 'free', label: '免费榜', subTitle: '根据七天内阅读人数进行排行' },
    {
      key: 'recommend',
      label: '推荐榜',
      subTitle: '根据七天内推荐人数进行排行',
    },
    { key: 'comment', label: '评价榜', subTitle: '根据七天内评价人数进行排行' },
    { key: 'finish', label: '完结榜', subTitle: '根据七天内阅读人数进行排行' },
    { key: 'serial', label: '连载榜', subTitle: '根据七天内阅读人数进行排行' },
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
