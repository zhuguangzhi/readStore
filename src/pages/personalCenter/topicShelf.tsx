import React, { useEffect, useState } from 'react';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import { DelPopup } from '@/pages/personalCenter/utils';
import { useAuth } from '@/hook/useAuth';
import { topCaseProps } from '@/type/topic';
import { PullLoad } from '@/components/module/PullLoad';
import { TopicShelfItem } from '@/pages/personalCenter/components/topicShelfItem';
import ReadPopup from '@/components/module/ReadPopup';
import { useDelMyBook, useGetTopicCase } from '@/utils/personalCenter';
import { DefaultNoData } from '@/components/defaultNoData';
import './style/topicShelf.less';

const tabBars = [
  { key: 'topicShelf', label: '话题书架' },
  { key: 'topicHistory', label: '话题历史' },
];
export default () => {
  const [page, setPage] = useState(1);
  const [defaultNoData, setNoData] = useState(false);
  const [currentTab, setTab] = useState(tabBars[0].key);
  const [topicCaseList, setTopicList] = useState<topCaseProps['data'] | null>(
    null,
  );
  const [edit, setEdit] = useState(false);
  // 移出书架
  const { mutate: deleteBooks } = useDelMyBook('topicCase');
  // 删除 确认弹窗
  const [popupOption, setPopupOption] = useState({
    ids: [] as number[],
    open: false,
    title: '',
  });
  // 操作实例
  const delPopup = new DelPopup(popupOption, setPopupOption);
  // 获取数据
  const { data: topicData, isLoading: topicLoading } = useGetTopicCase({
    page,
    page_size: 10,
  });
  const { setLoadingModel } = useAuth();

  const confirmDelete = () => {
    deleteBooks({ book_id: popupOption.ids.join(',') });
    setPopupOption((val) => ({ ...val, open: false }));
    setTopicList([]);
  };
  const getMore = () => {
    if (page * 10 < (topicData?.page_info.total || 0)) {
      setPage((val) => val++);
    }
  };

  useEffect(() => {
    setLoadingModel(topicLoading);
  }, [topicLoading]);

  useEffect(() => {
    if (
      topicData?.data.length === 0 &&
      (!topicCaseList || topicCaseList.length === 0)
    )
      setNoData(true);
    else setNoData(false);
    if (
      !topicData ||
      (topicCaseList && topicData.data.toString() === topicCaseList.toString())
    )
      return;

    let arr = [...(topicCaseList || []), ...topicData.data];

    //根据id去重
    let map = new Map();
    for (let item of arr) {
      if (!map.has(item.book_id)) {
        map.set(item.book_id, item);
      }
    }
    arr = [...map.values()];
    setTopicList(arr);
  }, [topicData]);

  return (
    <div className={'topicShelf'}>
      {/*头*/}
      <PersonalHeader
        useEdit={edit}
        setEdit={setEdit}
        tabs={tabBars}
        defaultSelect={currentTab}
        selectChange={(val) => {
          setTab(val.key);
          setPage(1);
          setTopicList(null);
        }}
        useIcon={true}
        onDelete={() => delPopup.onDelChange('所选书籍')}
      />
      {defaultNoData ? (
        <DefaultNoData
          className={'topicShelf_nodata'}
          type={'noData'}
          text={'去添加一个话题吧~'}
        />
      ) : (
        <PullLoad
          page={page}
          total={topicData?.page_info.total || 0}
          pageSize={10}
          bottomHeight={100}
          onBottom={getMore}
        >
          <TopicShelfItem
            data={topicCaseList || []}
            isEdit={edit}
            onChangeCheckBox={delPopup.onChangeCheckBox}
            checkIds={popupOption.ids}
          />
        </PullLoad>
      )}
      {/*删除*/}
      <ReadPopup
        onClose={delPopup.clearPopup}
        title={`确定移除${popupOption.title}`}
        open={popupOption.open}
        showClose={true}
        onOk={confirmDelete}
      >
        <p>移出后可重新添加哦！</p>
      </ReadPopup>
    </div>
  );
};
