import React, { useEffect, useRef, useState } from 'react';
import { NoticeBox } from '@/pages/home/components/noticeBox';
import { IconFont } from '@/components/IconFont';
import { UseNode } from '@/components/UseNode';
import './style/noticeList.less';
import { WebInfo } from '@/components/WebInfo';
import router from '@/hook/url';
import {
  useAuthorRecommend,
  useGetNews,
  useGetTopic,
  useGetVane,
} from '@/utils/home';
import { authorPenName, NewsId, TopicId } from '@/constants/url';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import { useDispatch, useSelector } from 'umi';
import { toRead } from '@/common/publicFn';

const NewsIcon = () => (
  <IconFont
    icon={'fuzhushuxian'}
    width={'17px'}
    height={'17px'}
    color={'var(--themeColor)'}
  />
);
const VaneIcon = () => (
  <IconFont
    icon={'huo'}
    width={'17px'}
    height={'17px'}
    color={'var(--themeColor)'}
  />
);
const AuthorIcon = () => (
  <IconFont
    icon={'tubiaozhizuomoban'}
    width={'15px'}
    height={'15px'}
    color={'var(--themeColor)'}
  />
);
const TopicIcon = () => (
  <IconFont icon={'remen'} width={'17px'} height={'17px'} />
);
type NoticeListProps = {
  notUseNews?: boolean;
  notUseVane?: boolean;
  notUseTopic?: boolean;
  notUseAuthor?: boolean;
  notUseWebInfo?: boolean;
  saveScroll?: (disPatchParam?: { [key: string]: unknown }) => void;
};
export const NoticeList = ({
  notUseNews,
  notUseVane,
  notUseTopic,
  notUseAuthor,
  notUseWebInfo,
  saveScroll,
}: NoticeListProps) => {
  const disPatch = useDispatch();
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  const noticeRef = useRef<HTMLDivElement>(null);
  const [noticeHeight, setNoticeHeight] = useState({
    ...globalState.homeTab.noticeList,
  });
  //新闻公告列表
  const { data: newList, isLoading: newLoad } = useGetNews();
  //风向标列表
  const { data: vaneList, isLoading: vaneLoad } = useGetVane();
  //作者推荐
  const { data: authorRecommend, isLoading: authorLoad } = useAuthorRecommend();
  //话题
  const { data: topicList, isLoading: topicLoad } = useGetTopic();
  //当前风向标所指索引
  const [currenVaneIndex, setVaneIndex] = useState(0);

  useEffect(() => {
    if (newLoad || vaneLoad || authorLoad || topicLoad) return;
    let top =
      document.body.clientHeight - (noticeRef.current?.clientHeight || 0) - 12;
    let height: 'auto' | '100%';
    if (
      (noticeRef.current?.clientHeight || 0) <
      document.body.clientHeight - 20 - 79
    ) {
      top = 0;
      height = 'auto';
    } else {
      height = '100%';
    }
    setNoticeHeight({ top, height });
    disPatch({
      type: 'global/setHomeTab',
      payload: {
        noticeList: { top, height },
      },
    });
  }, [newLoad, vaneLoad, authorLoad, topicLoad]);

  return (
    <div
      style={{
        marginLeft: '17px',
        top: `${noticeHeight.top}px`,
        height: `${noticeHeight.height}`,
      }}
      className={'position_sticky'}
      ref={noticeRef}
    >
      <UseNode rIf={!notUseNews}>
        <NoticeBox title={'新闻公告'} Icon={<NewsIcon />} useMore={false}>
          <div className={'news'}>
            {newList?.map((news) => {
              return (
                <p
                  className={'news_item textOverflow'}
                  key={news.id}
                  onClick={() => {
                    router.push('/home/news', { [NewsId]: news.id });
                    saveScroll?.();
                  }}
                >
                  <span className={'font_500 SYMedium'}>【公告】</span>
                  <span>{news.title}</span>
                </p>
              );
            })}
          </div>
        </NoticeBox>
      </UseNode>
      <UseNode rIf={!notUseVane}>
        <NoticeBox title={'风向标'} Icon={<VaneIcon />}>
          <div className={'vane'}>
            {vaneList?.data.map((vane, index) => {
              return (
                <div
                  key={index}
                  className={'flex vane_item'}
                  onMouseOver={() => setVaneIndex(index)}
                  onClick={() => toRead(vane.chapter_id, vane.id)}
                >
                  {/*    排名*/}
                  <span className={'font_18 vane_rank'}>{index + 1}</span>
                  <div className={'vane_book'}>
                    <p
                      style={{ width: '100%' }}
                      className={'textOverflow color_33'}
                    >
                      {vane.name}
                    </p>
                    <UseNode rIf={currenVaneIndex === index}>
                      <div className={'flex vane_book_details'}>
                        <img
                          className={'vane_book_image'}
                          src={vane.cover_url}
                          alt="封面"
                        />
                        <div style={{ flex: 1, width: '20px' }}>
                          <p
                            style={{ width: '100%' }}
                            className={'font_14 textOverflow SYMedium'}
                          >
                            {vane.name}
                          </p>
                          <p
                            className={'font_12 vane_book_description color_99'}
                          >
                            {vane.description}
                          </p>
                        </div>
                      </div>
                    </UseNode>
                  </div>
                </div>
              );
            })}
            <p
              onClick={() => router.push('/bookRank')}
              className={'vane_all cursor'}
            >
              查看完整榜单
            </p>
          </div>
        </NoticeBox>
      </UseNode>
      <UseNode rIf={!notUseAuthor}>
        <NoticeBox title={'作者推荐'} Icon={<AuthorIcon />}>
          <div className={'author'}>
            {authorRecommend?.data.map((author, index) => {
              return (
                <div
                  className={'author_item'}
                  key={index}
                  onClick={() => {
                    router.push('/books', { [authorPenName]: author.pen_name });
                    saveScroll?.();
                  }}
                >
                  <img
                    className={'author_item_photo'}
                    src={author.user_image_url}
                    alt=""
                  />
                  <p className={'author_item_name'}>{author.pen_name}</p>
                  <p className={'author_item_tag'}>
                    {author.chart_description}
                  </p>
                </div>
              );
            })}
          </div>
        </NoticeBox>
      </UseNode>
      <UseNode rIf={!notUseTopic}>
        <NoticeBox
          title={'热门话题'}
          Icon={<TopicIcon />}
          useMore={true}
          onSelectMore={() => router.push('/topicList')}
        >
          <div className={'news'}>
            {topicList?.data.map((topic, index) => {
              return (
                <p
                  key={index}
                  className={'news_item textOverflow'}
                  onClick={() => {
                    router.push('/topicInfo', { [TopicId]: topic.topic_id });
                    saveScroll?.();
                  }}
                >
                  <span className={'font_500 SYMedium'}>【话题】</span>
                  <span>{topic.title}</span>
                </p>
              );
            })}
          </div>
        </NoticeBox>
      </UseNode>
      <UseNode rIf={!notUseWebInfo}>
        <WebInfo />
      </UseNode>
    </div>
  );
};
