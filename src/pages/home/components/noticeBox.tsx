import React, { ReactElement } from 'react';
import { IconFont } from '@/components/IconFont';
import './style/noticeBox.less';
import { UseNode } from '@/components/UseNode';

export type NoticeBoxProps = {
  Icon: ReactElement;
  title: string;
  children: ReactElement;
  useMore?: boolean;
  onSelectTitle?: () => void;
  onSelectMore?: () => void;
};
export const NoticeBox = ({
  Icon,
  title,
  children,
  ...props
}: NoticeBoxProps) => {
  return (
    <div className={'notice'}>
      {/*    头部*/}
      <div className={'notice_header'}>
        {/*    图标*/}
        {Icon}
        <span
          className={'font_16 font_bold notice_header_title'}
          onClick={() => props.onSelectTitle?.()}
        >
          {title}
        </span>
        <UseNode rIf={props.useMore}>
          <div
            onClick={() => props.onSelectMore?.()}
            className={'notice_header_more'}
          >
            <span>更多</span>
            <IconFont width={'9px'} height={'9px'} icon={'right'} />
          </div>
        </UseNode>
      </div>
      {/*    内容*/}
      {children}
    </div>
  );
};
