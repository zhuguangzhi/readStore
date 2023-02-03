import React from 'react';
import { IconFont } from '@/components/IconFont';
import { Button } from 'antd';

export const Finish = ({
  onCancel,
  text,
}: {
  onCancel: Function;
  text?: string;
}) => {
  return (
    <div style={{ marginBottom: '50px' }}>
      <div className={'flex flex_column flex_justify flex_align'}>
        <IconFont
          icon={'finish1'}
          width={'51px'}
          height={'51px'}
          color={'#14B263'}
        />
        <p
          className={'SYMedium font_500 font_16'}
          style={{ marginTop: '26px' }}
        >
          {text}
        </p>
      </div>
      <Button
        className={'readModal_footerBtn'}
        shape="round"
        type={'primary'}
        onClick={() => onCancel()}
      >
        关闭
      </Button>
    </div>
  );
};
