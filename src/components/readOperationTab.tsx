import React from 'react';
import { IconFont } from '@/components/IconFont';
import { Popover } from 'antd';
import './style/readOperation.less';

type ReadOperationTabProps = {
  bookId: number | undefined;
  isApproval: 1 | 2;
  commentChange: Function;
  onApproval: Function;
  onInput: Function;
};

export const ReadOperationTab = ({
  isApproval,
  onApproval,
  onInput,
  ...props
}: ReadOperationTabProps) => {
  const ReportBtn = () => {
    return <div className={'readOperation_reportBtn'}>举报</div>;
  };
  return (
    <div className={'readOperation'}>
      <div className={'readOperation_input'} onClick={() => onInput()}>
        发表评论
      </div>
      <p onClick={() => onApproval()}>
        <IconFont
          icon={isApproval === 2 ? 'xihuan' : 'support'}
          width={'24px'}
          height={'24px'}
        />
        <span>点赞</span>
      </p>
      <p onClick={() => props.commentChange()}>
        <IconFont icon={'comment2'} width={'26px'} height={'26px'} />
        <span>评论</span>
      </p>
      <p>
        <IconFont icon={'forward'} width={'24px'} height={'24px'} />
        <span>分享</span>
      </p>
      <Popover content={ReportBtn} placement={'rightTop'} trigger="hover">
        <p>
          <IconFont icon={'more'} width={'32px'} height={'32px'} />
        </p>
      </Popover>
    </div>
  );
};
