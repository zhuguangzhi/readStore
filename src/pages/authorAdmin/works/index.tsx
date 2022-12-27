import React, { useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Tabs } from 'antd';
import WorksInfo from '@/pages/authorAdmin/works/worksInfo';
import SectionList from '@/pages/authorAdmin/works/sectionList';
import router, { useSearchParam } from '@/hook/url';
import { WorksChapterId, WorksId } from '@/constants/url';
import { useMounted } from '@/hook';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);

export default () => {
  const [{ [WorksId]: worksId, [WorksChapterId]: chapterId }] = useSearchParam([
    WorksId,
    WorksChapterId,
  ]);
  // 标签栏
  const [tabList, setTabList] = useState([
    {
      label: '作品信息',
      key: 'worksInfo',
      children: <WorksInfo />,
    },
    // {
    //   label: '章节列表',
    //   key: 'sectionList',
    //   children: <SectionList type={'section'} />,
    // },
    {
      label: '草稿箱',
      key: 'draftBox',
      children: <SectionList type={'draft'} />,
    },
    {
      label: '上传文章',
      key: 'addSection',
    },
  ]);
  useMounted(() => {
    if (worksId) return;
    const arr = [...tabList];
    arr.splice(1, 2);
    setTabList(arr);
  });
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
