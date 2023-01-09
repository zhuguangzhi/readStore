import React from 'react';
import { UseNode } from '@/components/UseNode';
import { Button } from 'antd';

type ContractSignProps = {
  isSign: 1 | 2; //1 未签署 2:签署中
};
export const ContractSign = ({ isSign }: ContractSignProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <UseNode rIf={isSign === 1}>
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
        {isSign === 1 ? (
          <Button className={'contractManager_btn'}>合同签署</Button>
        ) : (
          <Button className={'contractManager_btn contractManager_disabledBtn'}>
            签署中...
          </Button>
        )}
      </div>
    </div>
  );
};
