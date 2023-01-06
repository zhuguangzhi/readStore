import React, { useEffect, useState } from 'react';
import { useGetTopicList } from '@/utils/topic';
import { useAuth } from '@/hook/useAuth';
import { topicListProps } from '@/type/topic';
import { scrollToBottom, setArrayForId } from '@/common/publicFn';
import { DefaultNoData } from '@/components/defaultNoData';
import { NoticeList } from '@/pages/home/noticeList';
import './style/topicList.less';
import { UseNode } from '@/components/UseNode';
import router from '@/hook/url';
import { TopicId } from '@/constants/url';

export default () => {
  const [page, setPage] = useState(1);
  const { data: topicListData, isLoading: topicListLoading } = useGetTopicList({
    page: page,
    page_size: 20,
  });
  const [topicList, setTopicList] = useState<topicListProps['data'] | null>(
    null,
  );
  const { setLoadingModel } = useAuth();
  const [noData, setNoData] = useState(false);
  useEffect(() => {
    setLoadingModel(topicListLoading);
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
  }, [topicListLoading]);
  useEffect(() => {
    if (!topicListData) return;

    let arr = [...(topicList || []), ...topicListData.data];
    if (
      topicListData.data.length === 0 &&
      (!topicList || topicList?.length === 0)
    )
      setNoData(true);
    else setNoData(false);
    //根据id去重
    arr = setArrayForId(arr);
    setTopicList(arr);
  }, [topicListData]);

  const TopicListItem = () => {
    return (
      <div className={'topicList_box cursor'}>
        {topicList?.map((topic, index) => {
          return (
            <div
              key={topic.id}
              className={'topicList_item'}
              onClick={() => router.push('/topicInfo', { [TopicId]: topic.id })}
            >
              {/* 标题*/}
              <div className={'topicList_item_title'}>
                <p>
                  <UseNode rIf={index < 3}>
                    <i className={`topicListIcon${index}`}>
                      {/*<IconFont icon={'hot'}  className={`topicListIcon${index}`}/>*/}
                    </i>
                  </UseNode>
                  <span
                    className={`topicList_item_title_rank topicListRank${index}`}
                  >
                    {index + 1}
                  </span>
                </p>
                <span className={'font_16 font_bold'}>#{topic.title}#</span>
              </div>
              <span className={'font_12 color_99'}>
                已经有{topic.extension.all_attention}进行关注，共有
                {topic.extension.all_read}进行浏览
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className={'topicList'}>
      {noData ? (
        <DefaultNoData type={'noData'} text={'暂时还没有话题哦~'} />
      ) : (
        <TopicListItem />
      )}
      <NoticeList notUseTopic={true} notUseVane={true} notUseWebInfo={true} />
    </div>
  );
};
