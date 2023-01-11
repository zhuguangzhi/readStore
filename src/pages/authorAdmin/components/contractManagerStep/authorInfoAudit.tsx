import React from 'react';
import { IconFont } from '@/components/IconFont';
import { Button, message } from 'antd';
import './style/authorInfoAudit.less';
import {
  useAuditInfoStep,
  useAuthorInfoAudit,
} from '@/utils/authorAdmin/signApply';

type AuthorInfoAuditProps = {
  bookId: number | undefined;
  setStep: Function;
  auditStatus: 1 | 2 | 3; //1未审核 2审核中 3完成
};
export const AuthorInfoAudit = ({
  setStep,
  bookId,
  auditStatus,
}: AuthorInfoAuditProps) => {
  const { mutate: auditInfo, isLoading: auditLoading } = useAuthorInfoAudit();
  // 下一步
  const { mutate: stepAuthorInfo } = useAuditInfoStep();
  // 提交申请
  const onAuditInfo = () => {
    if (!bookId) {
      message.error('请稍后重试');
      return;
    }
    auditInfo({ book_id: bookId });
  };
  const onStepAudit = () => {
    if (!bookId) {
      message.error('请稍后重试');
      return;
    }
    setStep();
    stepAuthorInfo({
      book_id: bookId,
    });
  };
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
        <Button
          className={'contractManager_btn'}
          loading={auditLoading}
          onClick={onAuditInfo}
        >
          提交审核
        </Button>
      ) : auditStatus === 2 ? (
        <Button className={'contractManager_btn contractManager_disabledBtn'}>
          审核中...
        </Button>
      ) : (
        <Button className={'contractManager_btn'} onClick={onStepAudit}>
          下一步
        </Button>
      )}
    </div>
  );
};
