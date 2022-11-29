import React, { useState } from 'react';
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

const NewsIcon = () => (
  <IconFont
    icon={'fuzhushuxian'}
    width={'17px'}
    height={'17px'}
    color={'#FA6400'}
  />
);
const VaneIcon = () => (
  <IconFont icon={'huo'} width={'17px'} height={'17px'} color={'#FA6400'} />
);
const AuthorIcon = () => (
  <IconFont
    icon={'tubiaozhizuomoban'}
    width={'15px'}
    height={'15px'}
    color={'#FA6400'}
  />
);
const TopicIcon = () => (
  <IconFont icon={'remen'} width={'17px'} height={'17px'} />
);
export const NoticeList = () => {
  //新闻公告列表
  const { data: newList } = useGetNews();
  //风向标列表
  const { data: vaneList } = useGetVane();
  //作者推荐
  const { data: authorRecommend } = useAuthorRecommend();
  //话题
  const { data: topicList } = useGetTopic();
  //当前风向标所指索引
  const [currenVaneIndex, setVaneIndex] = useState(0);

  return (
    <div style={{ marginLeft: '17px' }}>
      <NoticeBox title={'新闻公告'} Icon={<NewsIcon />} useMore={false}>
        <div className={'news'}>
          {newList?.map((news) => {
            return (
              <p className={'news_item textOverflow'} key={news.id}>
                <span className={'font_bold'}>【公告】</span>
                <span>{news.title}</span>
              </p>
            );
          })}
        </div>
      </NoticeBox>
      <NoticeBox title={'风向标'} Icon={<VaneIcon />}>
        <div className={'vane'}>
          {vaneList?.data.map((vane, index) => {
            return (
              <div
                key={index}
                className={'flex vane_item'}
                onMouseOver={() => setVaneIndex(index)}
              >
                {/*    排名*/}
                <span className={'font_18 vane_rank'}>{index + 1}</span>
                <div className={'vane_book'}>
                  <p style={{ width: '100%' }} className={'textOverflow'}>
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
                          className={'font_14 textOverflow'}
                        >
                          {vane.name}
                        </p>
                        <p className={'font_12 vane_book_description'}>
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
      <NoticeBox title={'作者推荐'} Icon={<AuthorIcon />}>
        <div className={'author'}>
          {authorRecommend?.data.map((author, index) => {
            return (
              <div className={'author_item'} key={index}>
                <img
                  className={'author_item_photo'}
                  src={author.user_image}
                  alt=""
                />
                <p className={'author_item_name'}>{author.name}</p>
                <p className={'author_item_tag'}>{author.chart_description}</p>
              </div>
            );
          })}
        </div>
      </NoticeBox>
      <NoticeBox title={'热门话题'} Icon={<TopicIcon />} useMore={false}>
        <div className={'news'}>
          {topicList?.data.map((topic, index) => {
            return (
              <p key={index} className={'news_item textOverflow'}>
                <span className={'font_bold'}>【话题】</span>
                <span>{topic.title}</span>
              </p>
            );
          })}
        </div>
      </NoticeBox>
      <WebInfo />
    </div>
  );
};
