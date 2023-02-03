import React from 'react';
import { messageListProps } from '@/type/personalCenter';
import { UseNode } from '@/components/UseNode';
import moment from 'moment/moment';
import { DefaultNoData } from '@/components/defaultNoData';

const MessageBoxStyle: React.CSSProperties = {
  width: '100%',
  height: '112px',
  background: '#FFFFFF',
  boxShadow: '0 2px 32px 0 rgba(4,0,0,0.1)',
  borderRadius: '20px',
  marginTop: '18px',
  padding: '27px 40px',
  boxSizing: 'border-box',
};

type MessageBoxProps = {
  messageList: messageListProps[] | undefined;
  currentShowId: number;
  setCurrentShowId: (id: number) => void;
};
export const MessageBox = ({
  messageList,
  currentShowId,
  setCurrentShowId,
}: MessageBoxProps) => {
  // 占位符转文字
  const messageFormat = (value: string, message: messageListProps) => {
    let text: string = JSON.parse(JSON.stringify(value));
    message.link.forEach((item) => {
      text = text.replace(
        '%s',
        `<span style="color: #3464e0;cursor:pointer" onclick=linkClick(${item.target_page})>${item.title}</span>`,
      );
    });
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <>
      {messageList && messageList.length === 0 ? (
        <DefaultNoData
          type={'authorNoData'}
          text={'暂无消息'}
          className={'font_18'}
          style={{
            width: '300px',
            height: '300px',
            margin: '100px auto 0 auto',
            textAlign: 'center',
          }}
        />
      ) : (
        <div>
          {messageList?.map((message) => {
            return (
              <div
                key={message.id}
                className={'justify_between flex_column'}
                style={MessageBoxStyle}
              >
                <p className={'font_20 font_bold'}>{message.title}</p>
                <div className={'font_18 justify_between'}>
                  <p>
                    {currentShowId === message.id
                      ? messageFormat(message.content, message)
                      : messageFormat(
                          message.content.substring(0, 40),
                          message,
                        )}
                    <UseNode rIf={message.content.length > 40}>
                      <span
                        style={{
                          display: 'inline-block',
                          marginLeft: '22px',
                          color: '#3464e0',
                        }}
                        className={'cursor'}
                        onClick={() =>
                          setCurrentShowId(
                            message.id === currentShowId ? -1 : message.id,
                          )
                        }
                      >
                        {currentShowId === message.id ? '收起全部' : '查看全部'}
                      </span>
                    </UseNode>
                  </p>
                  <UseNode rIf={currentShowId !== message.id}>
                    <span className={'system_message_item_time'}>
                      {moment(message.create_time).format('YYYY/MM/DD HH:mm')}
                    </span>
                  </UseNode>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
