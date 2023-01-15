import React, { useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Tabs } from 'antd';
import WorksInfo from '@/pages/authorAdmin/works/worksInfo';
import router, { useSearchParam } from '@/hook/url';
import { WorksChapterId, WorksId } from '@/constants/url';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);

export type worksTabListProps = {
  label: string;
  key: string;
  children?: React.ReactElement;
};
export default () => {
  const [{ [WorksId]: worksId, [WorksChapterId]: chapterId }] = useSearchParam([
    WorksId,
    WorksChapterId,
  ]);
  // 标签栏
  const [tabList, setTabList] = useState<worksTabListProps[]>([
    {
      label: '作品信息',
      key: 'worksInfo',
      children: (
        <WorksInfo setTabList={(val) => setTabList([...tabList, val])} />
      ),
    },
    // {
    //   label: '章节列表',
    //   key: 'sectionList',
    //   children: <SectionList type={'section'} />,
    // },
    // {
    //   label: '草稿箱',
    //   key: 'draftBox',
    //   children: <SectionList type={'draft'} />,
    // },
  ]);
  return (
    <div className={'works'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'作品信息'} subIcon={<SubIcon />} />
      </div>
      {/*    内容*/}
      <main className={'admin_container'}>
        <Tabs
          defaultActiveKey="1"
          items={tabList}
          tabBarGutter={57}
          onTabClick={(key) => {
            if (key === 'addSection')
              router.push('/admin/works/bookContainer', {
                [WorksId]: worksId,
                [WorksChapterId]: chapterId,
              });
          }}
        />
      </main>
    </div>
  );
};
