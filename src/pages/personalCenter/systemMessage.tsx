import React, { useEffect, useState } from 'react';
import { IconFont } from '@/components/IconFont';
import './style/systemMessage.less';
import {
  useGetSystemMessage,
  useReadAllMessage,
  useReadMessage,
} from '@/utils/personalCenter';
import { useAuth } from '@/hook/useAuth';
import { setArrayForId } from '@/common/publicFn';
import { messageListProps } from '@/type/personalCenter';
import { PullLoad } from '@/components/module/PullLoad';
import { UseNode } from '@/components/UseNode';
import moment from 'moment';
import { useMounted } from '@/hook';
import { DefaultNoData } from '@/components/defaultNoData';

export default () => {
  // 条数
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [messageList, setMessageList] = useState<messageListProps[]>([]);
  const { data: messageData } = useGetSystemMessage({
    message_type: 0,
    page,
    page_size: pageSize,
  });
  const [noData, setNoData] = useState(false);
  // 当前展开消息的id
  const [currentShowId, setCurrentShowId] = useState(-1);
  // 单个已读
  const { mutate: readMessage } = useReadMessage();
  // 全部
  const { mutate: readAllMessage } = useReadAllMessage();
  const { setLoadingModel } = useAuth();
  // 控制消息显隐
  const controlMessage = (id: number, isRead: 1 | 2) => {
    if (id === currentShowId) {
      setCurrentShowId(-1);
      return;
    }
    setCurrentShowId(id);
    if (isRead === 1) return;
    readMessage({ id });
  };
  // 点击消息
  const clickMessage = (message: messageListProps) => {
    if (message.is_read === 1 || message.content.length > 40) return;
    readMessage({ id: message.id });
  };
  // 获取更多
  const getMore = () => {
    if (!messageData || pageSize * page >= messageData.page_info.total) return;
    setPage(page + 1);
  };

  useMounted(() => {
    setLoadingModel(true);
  });
  useEffect(() => {
    if (!messageData) return;
    if (messageData.data.length === 0 && messageList.length === 0)
      setNoData(true);
    else setNoData(false);
    setLoadingModel(false);
    const arr = setArrayForId([...messageList, ...messageData.data]);
    setMessageList(arr);
  }, [messageData]);
  return (
    <div className={'system'}>
      <div className={'system_header'}>
        <div className={'flex flex_align'}>
          <i className={'system_header_messageIcon'}></i>
          <span style={{ color: '#333333' }}>消息通知</span>
        </div>
        <div
          className={'flex flex_align cursor'}
          onClick={() => readAllMessage()}
        >
          <IconFont
            icon={'clear'}
            marginRight={'9px'}
            width={'18px'}
            height={'21px'}
          />
          <span className={'font_14'}>全部已读</span>
        </div>
      </div>
      {noData ? (
        <DefaultNoData
          type={'noData'}
          text={'暂无通知'}
          className={'system_noData'}
        />
      ) : (
        <PullLoad
          page={page}
          total={messageData?.page_info.total || 0}
          pageSize={pageSize}
          bottomHeight={100}
          onBottom={getMore}
        >
          <div className={'system_message'}>
            {messageList.map((message) => {
              return (
                <div
                  className={'system_message_item'}
                  key={message.id}
                  onClick={() => clickMessage(message)}
                >
                  <p className={'system_message_item_title'}>
                    <UseNode rIf={message.is_read === 2}>
                      <i></i>
                    </UseNode>
                    <span className={'SYBold'}>{message.title}</span>
                  </p>
                  {/*  内容*/}
                  <p style={{ position: 'relative' }}>
                    <span>
                      {currentShowId === message.id
                        ? message.content
                        : `${message.content.substring(0, 40)}`}
                    </span>
                    <UseNode rIf={message.content.length > 40}>
                      <span
                        className={'system_message_item_btn'}
                        onClick={() =>
                          controlMessage(message.id, message.is_read)
                        }
                      >
                        {currentShowId === message.id ? '收起全部' : '查看全部'}
                      </span>
                    </UseNode>
                    <UseNode rIf={currentShowId !== message.id}>
                      <span className={'system_message_item_time'}>
                        {moment(message.create_time).format('YYYY/MM/DD HH:mm')}
                      </span>
                    </UseNode>
                  </p>
                </div>
              );
            })}
          </div>
        </PullLoad>
      )}
    </div>
  );
};
