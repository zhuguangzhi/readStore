import React from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Tabs } from 'antd';
import WorksInfo from '@/pages/authorAdmin/works/worksInfo';
import SectionList from '@/pages/authorAdmin/works/sectionList';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);

export default () => {
  // 标签栏
  const tabList = [
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
      label: '上传章节',
      key: 'addSection',
    },
  ];
  return (
    <div className={'works'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'作品信息'} subIcon={<SubIcon />} />
      </div>
      {/*    内容*/}
      <main className={'admin_container'}>
        <Tabs defaultActiveKey="1" items={tabList} tabBarGutter={57} />
      </main>
    </div>
  );
};
