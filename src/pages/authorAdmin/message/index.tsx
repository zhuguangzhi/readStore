import React, { useEffect, useMemo, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Tabs } from 'antd';
import { MessageBox } from '@/pages/authorAdmin/message/messageBox';
import { ReadPagination } from '@/components/module/ReadPagination';
import { useGetAuthorMessage } from '@/utils/authorAdmin/personalInfo';
import { useAuth } from '@/hook/useAuth';

const SubIcon = () => (
  <IconFont width={'31px'} height={'35px'} icon={'tongzhi'} />
);
export default () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  // 当前点开消息的id
  const [currentMessageId, setMessageId] = useState(-1);

  const { data: messageData, isLoading: messageLoading } = useGetAuthorMessage({
    page,
    page_size: pageSize,
    message_type: currentTab,
  });
  const messageBoxParams = useMemo(() => {
    return {
      currentShowId: currentMessageId,
      setCurrentShowId: setMessageId,
      messageList: messageData?.data,
    };
  }, [currentMessageId, messageData]);
  // 标签栏
  const tabList = [
    {
      label: '全部',
      key: '0',
      children: <MessageBox {...messageBoxParams} />,
    },
    // {
    //   label: '系统通知',
    //   key: '1',
    //   children: <MessageBox />,
    // },
    {
      label: '审核通知',
      key: '2',
      children: <MessageBox {...messageBoxParams} />,
    },
    {
      label: '签约通知',
      key: '3',
      children: <MessageBox {...messageBoxParams} />,
    },
    {
      label: '收入通知',
      key: '4',
      children: <MessageBox {...messageBoxParams} />,
    },
    // {
    //   label: '活动通知',
    //   key: '5',
    //   children: <MessageBox />,
    // },
  ];
  const { setLoadingModel } = useAuth();

  useEffect(() => {
    setLoadingModel(messageLoading);
  }, [messageLoading]);

  return (
    <div className={''}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'消息通知'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container'}>
        <Tabs
          defaultActiveKey="1"
          items={tabList}
          tabBarGutter={57}
          onChange={(val) => {
            setPage(1);
            setCurrentTab(Number(val) as 0 | 1 | 2 | 3 | 4 | 5);
          }}
        />
        <ReadPagination
          current={page}
          pageSize={pageSize}
          hideOnSinglePage={true}
          total={messageData?.page_info.total || 0}
          onChange={(val) => setPage(val)}
          style={{ marginTop: '20px' }}
        />
      </div>
    </div>
  );
};
