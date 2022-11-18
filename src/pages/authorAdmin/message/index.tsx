import React from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Tabs } from 'antd';
import { MessageBox } from '@/pages/authorAdmin/message/messageBox';

const SubIcon = () => (
  <IconFont width={'31px'} height={'35px'} icon={'tongzhi'} />
);
export default () => {
  // 标签栏
  const tabList = [
    {
      label: '全部',
      key: 'all',
      children: <MessageBox />,
    },
    {
      label: '系统通知',
      key: 'system',
      children: <MessageBox />,
    },
    {
      label: '审核通知',
      key: 'audit',
      children: <MessageBox />,
    },
    {
      label: '签约通知',
      key: 'contract',
      children: <MessageBox />,
    },
    {
      label: '收入通知',
      key: 'income',
      children: <MessageBox />,
    },
    {
      label: '活动通知',
      key: 'active',
      children: <MessageBox />,
    },
  ];
  return (
    <div className={''}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'消息通知'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container'}>
        <Tabs defaultActiveKey="1" items={tabList} tabBarGutter={57} />
      </div>
    </div>
  );
};
