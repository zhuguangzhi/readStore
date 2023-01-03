import React, { useEffect, useState } from 'react';
import './style/index.less';
import { BookBox } from '@/pages/bookRank/bookBox';
import { useGetBookRank } from '@/utils/rank';
import { useAuth } from '@/hook/useAuth';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import { BookId } from '@/constants/url';
import router from '@/hook/url';
import { useMounted } from '@/hook';

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
  const dispatch = useDispatch();
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  const { userInfo, setLoadingModel } = useAuth();
  const [sideIndex, setSide] = useState(globalState.bookRank.rankIndex);
  const { data: rankBookData, isLoading } = useGetBookRank(
    () => setLoadingModel(false),
    {
      rank_type: slideList[sideIndex].key,
      page: 1,
      page_size: 9999,
    },
    userInfo,
  );

  const setDispatch = (index?: number, scroll?: number) => {
    dispatch({
      type: 'global/setBookRank',
      payload: {
        rankIndex: index ? index : sideIndex,
        scroll: scroll ? scroll : globalState.bookRank.scroll,
      },
    });
  };
  const toRead = (id: number) => {
    router.push('/read', { [BookId]: id });
    setDispatch(
      sideIndex,
      (document.querySelector('.webContainer') as HTMLElement).scrollTop,
    );
  };
  useEffect(() => {
    if (isLoading) setLoadingModel(isLoading);
  }, [sideIndex]);
  useMounted(() => {
    (document.querySelector('.webContainer') as HTMLElement).scrollTop =
      globalState.bookRank.scroll;
  });
  return (
    <div className={'bookRank'}>
      {/*侧边栏*/}
      <div className={'bookRank_side position_sticky'} style={{ top: 0 }}>
        <p className={'SYMedium'}>热门排行榜</p>
        {slideList.map((item, index) => {
          return (
            <p
              className={index === sideIndex ? 'sideSelect' : 'color_b2'}
              key={item.key}
              onClick={() => {
                setSide(index);
                setDispatch(index);
              }}
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
          <span className={'font_20 SYMedium'} style={{ marginRight: '17px' }}>
            {slideList[sideIndex].label}
          </span>
          <span className={'font_12 color_99'}>
            {slideList[sideIndex].subTitle}
          </span>
        </div>
        {/*  书籍  */}
        <BookBox bookList={rankBookData} toRead={toRead} />
      </div>
    </div>
  );
};
