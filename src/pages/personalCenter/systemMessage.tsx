import React from 'react';
import { IconFont } from '@/components/IconFont';
import './style/systemMessage.less';

export default () => {
  return (
    <div className={'system'}>
      <div className={'system_header'}>
        <div className={'flex flex_align'}>
          <i className={'system_header_messageIcon'}></i>
          <span style={{ color: '#333333' }}>消息通知</span>
        </div>
        <div className={'flex flex_align cursor'}>
          <IconFont
            icon={'clear'}
            marginRight={'9px'}
            width={'18px'}
            height={'21px'}
          />
          <span className={'font_14'}>全部已读</span>
        </div>
      </div>
    </div>
  );
};
