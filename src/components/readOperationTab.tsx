import React, { useState } from 'react';
import { IconFont } from '@/components/IconFont';
import { Popover } from 'antd';
import './style/readOperation.less';
import { ReadModel } from '@/components/module/ReadModel';
import { Report } from '@/components/report';
import { copy } from '@/common/publicFn';
import { netUrl } from '../../public/config';
import { BookId } from '@/constants/url';

type ReadOperationTabProps = {
  bookId: number | undefined;
  bookName: string | undefined;
  chapterId: number | undefined;
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
  const [openReport, setOpenReport] = useState(false);

  const ReportBtn = () => {
    return (
      <div
        className={'readOperation_reportBtn'}
        onClick={() => setOpenReport(true)}
      >
        举报
      </div>
    );
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
      <p
        onClick={() =>
          copy(
            `【${props.bookName}】 ${netUrl}/read?${[BookId]}=${props.bookId}`,
          )
        }
      >
        <IconFont icon={'forward'} width={'24px'} height={'24px'} />
        <span>分享</span>
      </p>
      <Popover content={ReportBtn} placement={'rightTop'} trigger="hover">
        <p>
          <IconFont icon={'more'} width={'32px'} height={'32px'} />
        </p>
      </Popover>
      <ReadModel
        useTitle={false}
        open={openReport}
        width={'560px'}
        onCancel={() => setOpenReport(false)}
      >
        <Report bookId={props.bookId || 0} chapterId={props.chapterId || 0} />
      </ReadModel>
    </div>
  );
};
