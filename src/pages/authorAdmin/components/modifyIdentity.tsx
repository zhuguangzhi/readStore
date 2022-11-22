import React from 'react';
import { ReadModel } from '@/components/module/ReadModel';
import { ReadStep, stepItemsProps } from '@/components/module/ReadStep';
import { ModalProps } from 'antd';
import { Identity } from '@/pages/authorAdmin/components/verify/identity';

interface ModifyIdentityProps extends ModalProps {
  isFinish: boolean;
}
export const ModifyIdentity = ({ isFinish, ...props }: ModifyIdentityProps) => {
  const stepItems: stepItemsProps[] = [
    { label: '手机号码验证', stepElement: <span></span> },
    { label: '填写身份证信息', stepElement: <Identity /> },
    { label: '填写完成', stepElement: <span></span> },
  ];

  return (
    <ReadModel
      width={800}
      useTitle={true}
      title={isFinish ? '身份信息修改' : '身份信息绑定'}
      {...props}
    >
      <ReadStep stepItems={stepItems} currentStep={2} />
    </ReadModel>
  );
};
