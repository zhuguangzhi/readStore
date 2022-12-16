import React, { useEffect, useState } from 'react';
import router, { useSearchParam } from '@/hook/url';
import { BookId, TopicId } from '@/constants/url';
import { useGetTopicBookList, useGetTopicDetail } from '@/utils/topic';
import { useAuth } from '@/hook/useAuth';
import { topicBookListProps } from '@/type/topic';
import { translateNumber } from '@/utils/format';
import { NoticeList } from '@/pages/home/noticeList';
import './style/topicInfo.less';
import { BookItem } from '@/pages/home/components/bookItem';
import { useModifyApproval } from '@/utils/home';
import { useDispatch } from '@@/exports';
import { useAddBookCase } from '@/utils/rank';
import { scrollToBottom } from '@/common/publicFn';

export default () => {
  const disPatch = useDispatch();
  const [{ [TopicId]: topicId }] = useSearchParam([TopicId]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<1 | 2>(1);
  const [topicBooks, setTopicBooks] = useState<topicBookListProps['data']>([]);
  // 获取话题信息
  const { data: topicDetail, isLoading: detailLoading } = useGetTopicDetail({
    id: Number(topicId),
  });
  //  获取话题列表
  const { data: topicListData, isLoading: listLoading } = useGetTopicBookList({
    page,
    page_size: 20,
    sort_type: sortType,
    topic_id: Number(topicId),
  });
  const { setLoadingModel } = useAuth();
  //点赞
  const { mutate: setApproval } = useModifyApproval('topicBookList');
  // 加入书架
  const { mutate: addBookCase } = useAddBookCase('topicBookList');
  // 修改排序
  const changeSort = (type: 1 | 2) => {
    if (sortType === type) return;
    setSortType(type);
    setTopicBooks([]);
  };

  useEffect(() => {
    setLoadingModel(listLoading || detailLoading);
    const webContainerRef = document.querySelector(
      '.webContainer',
    ) as HTMLElement;
    webContainerRef.onscroll = () => {
      scrollToBottom(300, () => {
        const total = topicListData?.page_info?.total || 0;
        if (page * 10 >= total) return;
        setPage(page + 1);
      });
    };
    // (document.getElementsByClassName('webContainer') as HTMLElement ).onscroll= ()=>{}
  }, [listLoading, detailLoading]);
  useEffect(() => {
    console.log('topicListData', topicListData);
    if (!topicListData) return;
    setTopicBooks(topicListData.data);
  }, [topicListData]);
  return (
    <div className={'topicInfo'}>
      <div className={'topicInfo_box'}>
        {/* 话题标题*/}
        <div className={'topicInfo_box_header'}>
          <img
            className={'topicInfo_box_header_img'}
            src={topicDetail?.cover_url}
            alt=""
          />
          <div className={'topicInfo_box_header_info'}>
            <p className={'font_16 font_bold'}>#{topicDetail?.title}#</p>
            <p
              className={'font_12 color_99 flex flex_align'}
              style={{ marginTop: '10px' }}
            >
              <span>{topicListData?.page_info.total}本小说</span>
              <span className={'topicInfo_box_header_info_point'}>·</span>
              <span>
                {translateNumber(
                  topicDetail?.extension.all_attention || 0,
                  false,
                )}
                关注
              </span>
              <span className={'topicInfo_box_header_info_point'}>·</span>
              <span>
                {translateNumber(topicDetail?.extension.all_read || 0, false)}
                阅读
              </span>
            </p>
          </div>
          {/*    关注按钮*/}
          <div
            className={'topicInfo_box_header_btn'}
            style={{
              backgroundColor:
                topicDetail?.is_user_attention === 1 ? 'white' : '',
            }}
          >
            {topicDetail?.is_user_attention === 1 ? (
              <span style={{ color: 'var(--themeColor)' }}>取消关注</span>
            ) : (
              <span>关注话题</span>
            )}
          </div>
        </div>
        {/*    修改排序*/}
        <div className={'topicInfo_box_sort'}>
          <p>
            <span
              style={{ color: sortType === 1 ? 'var(--themeColor)' : '' }}
              onClick={() => changeSort(1)}
            >
              默认
            </span>
            <span
              style={{ color: sortType === 2 ? 'var(--themeColor)' : '' }}
              onClick={() => changeSort(2)}
            >
              最新
            </span>
          </p>
          <p className={'color_99 font_12'}>
            全部内容（{topicListData?.page_info.total || 0}）
          </p>
        </div>
        {/*    内容*/}
        <div className={'topicInfo_box_container'}>
          <BookItem
            bookList={topicBooks}
            onApprove={(param) => setApproval(param)}
            onClick={(book) => router.push('/read', { [BookId]: book.id })}
            onComment={(book) => {
              router.push('/read', { [BookId]: book.id });
              disPatch({ type: 'global/setCommentBox', payload: true });
            }}
            onAddBookCase={(bookId) => addBookCase({ book_id: bookId })}
          />
        </div>
      </div>
      <NoticeList
        notUseWebInfo={true}
        notUseTopic={true}
        notUseNews={true}
        notUseAuthor={true}
      />
    </div>
  );
};
