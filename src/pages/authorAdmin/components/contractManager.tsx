import React, { useEffect, useState } from 'react';
import { ReadStep, stepItemsProps } from '@/components/module/ReadStep';
import { Contract } from '@/pages/authorAdmin/components/contractManagerStep/contract';
import { bookInfoProps } from '@/type/book';
import './styles/contractManager.less';
import { AuthorInfoAudit } from '@/pages/authorAdmin/components/contractManagerStep/authorInfoAudit';
import { ContractSign } from '@/pages/authorAdmin/components/contractManagerStep/contractSign';
import { ContractFinish } from '@/pages/authorAdmin/components/contractManagerStep/contractFinish';

type contractManagerProps = {
  bookInfo: bookInfoProps | undefined;
  closeModel: Function;
};
export const ContractManager = ({
  bookInfo,
  closeModel,
}: contractManagerProps) => {
  const [currentStep, setStep] = useState<number>(
    bookInfo?.signing_flow.flow || 1,
  );
  const nextStep = () =>
    setStep(currentStep === 4 ? currentStep : currentStep + 1);
  const stepItems: stepItemsProps[] = [
    {
      label: '签约申请',
      stepElement: (
        <Contract
          bookInfo={bookInfo}
          setStep={nextStep}
          contractStatus={bookInfo?.signing_flow.flow_status as 1 | 2 | 3}
        />
      ),
    },
    {
      label: '信息审核',
      stepElement: (
        <AuthorInfoAudit
          bookId={bookInfo?.id}
          setStep={nextStep}
          auditStatus={bookInfo?.signing_flow.flow_status as 1 | 2 | 3}
        />
      ),
    },
    {
      label: '合同申请',
      stepElement: (
        <ContractSign
          bookId={bookInfo?.id}
          isSign={bookInfo?.signing_flow.flow_status as 5 | 6 | 7}
          setStep={nextStep}
        />
      ),
    },
    { label: '完成', stepElement: <ContractFinish closeModel={closeModel} /> },
  ];
  useEffect(() => {
    console.log('bookInfo', bookInfo);
    if (!bookInfo) return;
    setStep(bookInfo.signing_flow.flow);
  }, [bookInfo]);
  return (
    <div className={'contractManager'}>
      <p className={'contractManager_title'}>签约管理</p>
      <ReadStep stepItems={stepItems} currentStep={currentStep} />
    </div>
  );
};
