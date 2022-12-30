import React, { useEffect, useState } from 'react';
import router from '@/hook/url';
import { netName } from '../../../public/config';
import './style/index.less';
import './style/userInfo.less';
import { useAuth } from '@/hook/useAuth';
import { IconFont } from '@/components/IconFont';
import {
  useGetMyBooks,
  useGetMyComment,
  useGetTopicCase,
} from '@/utils/personalCenter';
import { BookLayer } from '@/pages/personalCenter/components/bookLayer';
import { myBookProps } from '@/type/personalCenter';
import { BookId, TopicId } from '@/constants/url';
import { UseNode } from '@/components/UseNode';
import { Tabs } from 'antd';
import { DefaultNoData } from '@/components/defaultNoData';
import { ReadModel } from '@/components/module/ReadModel';
import { EditUserInfo } from '@/components/editUserInfo';

export default () => {
  const { userInfo, setLoadingModel } = useAuth();
  // 修改个人资料弹窗
  const [userInfoModal, setUserInfoModal] = useState(false);
  // 获取书架数据
  const { data: myBooks, isLoading: bookLoading } = useGetMyBooks({
    page: { page: 1, page_size: 7 },
    type: 'getMyBookList',
  });
  // 获取评论数据
  const { data: commentData, isLoading: commentLoading } = useGetMyComment({
    page: 1,
    page_size: 10,
    type: 'myComment',
  });
  // 获取话题数据
  // 获取数据
  const { data: topicData, isLoading: topicLoading } = useGetTopicCase({
    page: 1,
    page_size: 10,
  });
  // 继续阅读
  const goToRead = (book: myBookProps) => {
    router.push('/read', { [BookId]: book.book_id });
  };

  useEffect(() => {
    setLoadingModel(bookLoading || topicLoading || commentLoading);
  }, [commentLoading, topicLoading, bookLoading]);

  // 评论组件
  const CommentComponent = () => {
    return (
      <>
        {(!topicData || topicData.data.length === 0) && !topicLoading ? (
          <DefaultNoData
            className={'userInfo_comment_nodata'}
            type={'noData'}
          />
        ) : (
          <div className={'userInfo_comment_box'}>
            {commentData?.data.map((comment) => {
              return (
                <div key={comment.id} className={'userInfo_comment_box_item'}>
                  <div>
                    <img
                      className={'userInfo_comment_box_item_img'}
                      src={userInfo?.user_image}
                      alt=""
                    />
                    <span className={'font_16 color_99'}>
                      《{comment.book_title}》
                    </span>
                  </div>
                  <div className={'userInfo_comment_box_item_content'}>
                    <span>{comment.content}</span>
                    <p>{comment.create_time}</p>
                  </div>
                </div>
              );
            })}
            <span className={'userInfo_comment_box_tip'}>
              最多仅展示10条评论
            </span>
          </div>
        )}
      </>
    );
  };
  // 话题组件
  const TopicComponent = () => {
    return (
      <>
        {(!commentData || commentData.data.length === 0) && !commentLoading ? (
          <DefaultNoData
            className={'userInfo_comment_nodata'}
            type={'noData'}
          />
        ) : (
          <div className={'userInfo_comment_box'}>
            {topicData?.data.map((topic) => {
              return (
                <div
                  key={topic.book_id}
                  className={'userInfo_comment_box_item cursor'}
                  onClick={() =>
                    router.push('/topicInfo', { [TopicId]: topic.topic_id })
                  }
                >
                  <div>
                    <span className={'font_16 color_99'}>
                      # {topic.topic_title}
                    </span>
                  </div>
                  <div className={'userInfo_comment_box_item_content'}>
                    {/*<span>已经有{topic.extension.all_attention}进行关注，共有*/}
                    {/*    {topic.extension.all_read}进行浏览</span>*/}
                    <span>已经有0进行关注，共有 0进行浏览</span>
                  </div>
                </div>
              );
            })}
            <span className={'userInfo_comment_box_tip'}>
              最多仅展示10条话题
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={'personal userInfo'}>
      {/*    面包屑*/}
      <div className={'personal_breadcrumb'}>
        <span>当前位置：</span>
        <span className={'cursor'} onClick={() => router.push('/home')}>
          {netName}
          {'>'}
        </span>
        <span className={'cursor'}>个人中心</span>
      </div>
      {/*    用户信息*/}
      <div className={'userInfo_box'}>
        <img
          className={'userInfo_box_img'}
          src={userInfo?.user_image_url}
          alt=""
        />
        <div className={'userInfo_box_info'}>
          <div className={'userInfo_box_info_edit'}>
            <span className={'font_20 font_bold'}>{userInfo?.nickname}</span>
            <p onClick={() => setUserInfoModal(true)}>编辑资料</p>
          </div>
          <p className={'color_99 font_14'}>
            {userInfo?.description || '该用户很懒，什么都没留下'}
          </p>
        </div>
        {/*TODO:用户资料数据待完善*/}
        <div className={'userInfo_box_data'}>
          <div className={'userInfo_box_data_item'}>
            <p>21</p>
            <div
              className={
                'flex_align justify_between userInfo_box_data_item_desc'
              }
            >
              <span className={'font_14'}>关注</span>
              <IconFont width={'8px'} height={'8px'} icon={'right'} />
            </div>
          </div>
          <div className={'userInfo_box_data_item'}>
            <p>21</p>
            <div
              className={
                'flex_align justify_between userInfo_box_data_item_desc'
              }
            >
              <span className={'font_14'}>粉丝</span>
              <IconFont width={'8px'} height={'8px'} icon={'right'} />
            </div>
          </div>
          <div className={'userInfo_box_data_item'}>
            <p>21</p>
            <div
              className={
                'flex_align justify_between userInfo_box_data_item_desc'
              }
            >
              <span className={'font_14'}>获赞</span>
              <IconFont width={'8px'} height={'8px'} icon={'right'} />
            </div>
          </div>
        </div>
      </div>
      {/*    我的书架*/}
      <UseNode rIf={myBooks && myBooks.data.length > 0}>
        <div className={'userInfo_bookShelf'}>
          <div className={'userInfo_bookShelf_title'}>
            <div>
              <span>我的书架</span>
              <span className={'userInfo_bookShelf_title_num'}>
                {myBooks?.page_info.total}
              </span>
            </div>
            <div
              className={'userInfo_bookShelf_title_right'}
              onClick={() => router.push('/personal/bookShelf')}
            >
              <span>查看书架</span>
              <IconFont
                width={'11px'}
                height={'11px'}
                marginLeft={'8px'}
                icon={'right'}
              />
            </div>
          </div>
          <div>
            <BookLayer
              bookList={[myBooks?.data || []]}
              edit={false}
              selectIds={[]}
              onDelete={() => {}}
              onCheckBox={() => {}}
              goToRead={goToRead}
            />
          </div>
        </div>
      </UseNode>
      {/*    评论 话题*/}
      <div className={'userInfo_comment'}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: (
                <div className={'flex flex_align'}>
                  <IconFont
                    icon={'comment2'}
                    width={'20px'}
                    height={'20px'}
                    marginRight={'6px'}
                  />
                  <span>评论</span>
                </div>
              ),
              key: 'comment',
              children: <CommentComponent />,
            },
            {
              label: (
                <div className={'flex flex_align'}>
                  <IconFont
                    icon={'topic'}
                    width={'20px'}
                    height={'20px'}
                    marginRight={'6px'}
                  />
                  <span>话题</span>
                </div>
              ),
              key: 'topic',
              children: <TopicComponent />,
            },
          ]}
        />
      </div>
      <ReadModel
        useTitle={false}
        width={525}
        open={userInfoModal}
        closable={true}
        onCancel={() => setUserInfoModal(false)}
      >
        <EditUserInfo onClose={() => setUserInfoModal(false)} />
      </ReadModel>
    </div>
  );
};
