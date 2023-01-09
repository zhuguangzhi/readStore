import React, { useState } from 'react';
import { ReadStep, stepItemsProps } from '@/components/module/ReadStep';
import { Contract } from '@/pages/authorAdmin/components/contractManagerStep/contract';
import { bookInfoProps } from '@/type/book';
import './styles/contractManager.less';
import { AuthorInfoAudit } from '@/pages/authorAdmin/components/contractManagerStep/authorInfoAudit';
import { ContractSign } from '@/pages/authorAdmin/components/contractManagerStep/contractSign';
import { ContractFinish } from '@/pages/authorAdmin/components/contractManagerStep/contractFinish';

type contractManagerProps = {
  bookInfo: bookInfoProps | null;
  closeModel: Function;
};
export const ContractManager = ({
  bookInfo,
  closeModel,
}: contractManagerProps) => {
  const [currentStep, setStep] = useState(4);
  const stepItems: stepItemsProps[] = [
    {
      label: '签约申请',
      stepElement: (
        <Contract
          bookInfo={bookInfo}
          setStep={() => setStep(currentStep + 1)}
          contractStatus={2}
        />
      ),
    },
    {
      label: '信息审核',
      stepElement: (
        <AuthorInfoAudit
          setStep={() => setStep(currentStep + 1)}
          auditStatus={2}
        />
      ),
    },
    { label: '签署合同', stepElement: <ContractSign isSign={1} /> },
    { label: '完成', stepElement: <ContractFinish closeModel={closeModel} /> },
  ];
  return (
    <div className={'contractManager'}>
      <p className={'contractManager_title'}>签约管理</p>
      <ReadStep stepItems={stepItems} currentStep={currentStep} />
    </div>
  );
};
