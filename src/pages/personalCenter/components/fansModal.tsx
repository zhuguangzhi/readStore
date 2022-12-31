import React, { useCallback, useEffect, useState } from 'react';
import { IconFont } from '@/components/IconFont';
import { Tabs } from 'antd';
import './style/fansModal.less';
import { useGetFansModalList } from '@/utils/personalCenter';
import { useAuth } from '@/hook/useAuth';
import { approvalListProps, fansListProp } from '@/type/user';
import { setArrayForId } from '@/common/publicFn';
import { ApprovalList } from '@/pages/personalCenter/components/approvalList';
import { FansList } from '@/pages/personalCenter/components/fansList';
import { useMounted } from '@/hook';

type TabLabelProps = {
  width?: string;
  height?: string;
  icon: string;
  label: string;
};
const TabLabel = ({ width, height, icon, label }: TabLabelProps) => {
  return (
    <div className={'flex flex_align'}>
      <IconFont icon={icon} width={width} height={height} marginRight={'7px'} />
      <span>{label}</span>
    </div>
  );
};
type FansModalProps = {
  choose: 'fans' | 'attention' | 'approval';
};
export const FansModal = ({ choose }: FansModalProps) => {
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(choose);
  const { data: listData, isLoading: listLoading } = useGetFansModalList({
    type: currentTab,
    page_size: 20,
    page,
  });
  const [noData, setNoData] = useState(false);
  const [list, setList] = useState<fansListProp[] | approvalListProps[]>([]);

  const { setLoadingModel } = useAuth();

  // 获取更多
  const getMore = useCallback(() => {
    if (listLoading || !listData) return;
    if (page * 20 < listData.page_info.total) setPage(page + 1);
  }, [listData, listLoading]);

  useEffect(() => {
    if (!listData) return;
    setLoadingModel(false);
    if (listData.data.length === 0 && list.length === 0) setNoData(true);
    else setNoData(false);
    let arr = [...(list || []), ...listData.data] as
      | fansListProp[]
      | approvalListProps[];
    arr = setArrayForId(arr);
    arr.sort((a, b) => b.id - a.id);
    setList(arr);
  }, [listData]);
  useMounted(() => {
    setLoadingModel(true);
  });

  return (
    <div className={'userInfo_comment fans'}>
      <Tabs
        defaultActiveKey={choose}
        items={[
          {
            label: (
              <TabLabel
                width={'18px'}
                height={'18px'}
                icon={'attention'}
                label={'关注'}
              />
            ),
            key: 'attention',
            children: (
              <FansList
                fansList={list as fansListProp[]}
                total={listData?.page_info.total || 0}
                page={page}
                onBottom={() => getMore}
                noData={noData}
                currentTab={currentTab}
                type={'getAttention'}
                setList={(val) => setList(val)}
              />
            ),
          },
          {
            label: (
              <TabLabel
                width={'21px'}
                height={'21px'}
                icon={'fans'}
                label={'粉丝'}
              />
            ),
            key: 'fans',
            children: (
              <FansList
                fansList={list as fansListProp[]}
                total={listData?.page_info.total || 0}
                page={page}
                onBottom={() => getMore}
                noData={noData}
                currentTab={currentTab}
                type={'getFans'}
              />
            ),
          },
          {
            label: (
              <TabLabel
                width={'15px'}
                height={'15px'}
                icon={'tubiaozhizuomoban'}
                label={'获赞'}
              />
            ),
            key: 'approval',
            children: (
              <ApprovalList
                approvalList={list as approvalListProps[]}
                total={listData?.page_info.total || 0}
                page={page}
                noData={noData}
                onBottom={() => getMore()}
              />
            ),
          },
        ]}
        onChange={(val) => {
          setCurrentTab(val as 'fans' | 'attention' | 'approval');
          setList([]);
          setPage(1);
        }}
      />
    </div>
  );
};
