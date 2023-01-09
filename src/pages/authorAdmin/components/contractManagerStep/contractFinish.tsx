import React, { useEffect } from 'react';
import { IconFont } from '@/components/IconFont';
import { Button } from 'antd';

type ContractFinishProps = {
  closeModel: Function;
};
export const ContractFinish = ({ closeModel }: ContractFinishProps) => {
  useEffect(() => {
    console.log('执行');
  }, []);
  return (
    <div className={'contractFinish f_a_c flex_column'}>
      <IconFont
        icon={'finish'}
        color={'#00AB3D'}
        width={'81px'}
        height={'81px'}
      />
      <p style={{ marginTop: '29px' }} className={'color_99'}>
        签署完成，三秒钟后自动关闭页面
      </p>
      <Button className={'contractManager_btn'} onClick={() => closeModel()}>
        签署完成
      </Button>
    </div>
  );
};
