import React from 'react';
import { IconFont } from '@/components/IconFont';
import { Button } from 'antd';
import './style/authorInfoAudit.less';

type AuthorInfoAuditProps = {
  setStep: Function;
  auditStatus: 1 | 2 | 3; //1未审核 2审核中 3完成
};
export const AuthorInfoAudit = ({
  setStep,
  auditStatus,
}: AuthorInfoAuditProps) => {
  return (
    <div className={'authorInfoAudit'}>
      <div className={'authorInfoAudit_title'}>
        <IconFont
          className={'authorInfoAudit_icon'}
          icon={'isAudit'}
          width={'15px'}
          height={'15px'}
        />
        <span>认证信息</span>
      </div>
      <div className={'authorInfoAudit_box'}>
        <div className={'authorInfoAudit_box_item'}>
          <IconFont
            className={'authorInfoAudit_icon'}
            icon={'audit'}
            width={'15px'}
            height={'15px'}
          />
          <span>身份证认证</span>
        </div>
        <div className={'authorInfoAudit_box_item'}>
          <IconFont
            className={'authorInfoAudit_icon'}
            icon={'audit'}
            width={'15px'}
            height={'15px'}
          />
          <span>银行卡认证</span>
        </div>
        <div className={'authorInfoAudit_box_item'}>
          <IconFont
            className={'authorInfoAudit_icon'}
            icon={'audit'}
            width={'15px'}
            height={'15px'}
          />
          <span>其他信息认证</span>
        </div>
      </div>
      {auditStatus === 1 ? (
        <Button className={'contractManager_btn'}>提交审核</Button>
      ) : auditStatus === 2 ? (
        <Button className={'contractManager_btn contractManager_disabledBtn'}>
          审核中...
        </Button>
      ) : (
        <Button className={'contractManager_btn'} onClick={() => setStep()}>
          下一步
        </Button>
      )}
    </div>
  );
};
