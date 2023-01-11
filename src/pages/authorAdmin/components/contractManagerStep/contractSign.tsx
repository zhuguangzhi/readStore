import React from 'react';
import { UseNode } from '@/components/UseNode';
import { Button, message } from 'antd';
import { useApplyContract } from '@/utils/authorAdmin/signApply';

type ContractSignProps = {
  bookId: number | undefined;
  isSign: 5 | 6 | 7; //5 未签署 6:签署中 7合同签署完成
  setStep: Function;
};
export const ContractSign = ({
  isSign,
  setStep,
  bookId,
}: ContractSignProps) => {
  const { mutate: applyContract, isLoading: contractLoading } =
    useApplyContract();
  // 提交申请
  const onApplyContract = () => {
    if (!bookId) {
      message.error('请稍后重试');
      return;
    }
    applyContract({ book_id: bookId });
  };
  return (
    <div style={{ position: 'relative' }}>
      <UseNode rIf={isSign === 5}>
        <p
          style={{
            position: 'absolute',
            top: '41px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          点击下方的“合同签署”按钮，我们将会把合同发送到你手机上
        </p>
      </UseNode>
      <div style={{ marginTop: '86px', width: '100%' }} className={'flex'}>
        {isSign === 5 ? (
          <Button
            className={'contractManager_btn'}
            loading={contractLoading}
            onClick={onApplyContract}
          >
            合同申请
          </Button>
        ) : isSign === 6 ? (
          <Button className={'contractManager_btn contractManager_disabledBtn'}>
            签署中...
          </Button>
        ) : (
          <Button className={'contractManager_btn'} onClick={() => setStep()}>
            下一步
          </Button>
        )}
      </div>
    </div>
  );
};
