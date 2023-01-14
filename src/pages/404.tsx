import React from 'react';
import { DefaultNoData } from '@/components/defaultNoData';

export default () => {
  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundColor: '#FFFFFF' }}
      className={'flex flex_justify'}
    >
      <DefaultNoData
        type={'404'}
        style={{
          marginTop: '100px',
          width: '400px',
          height: '400px',
          textAlign: 'center',
        }}
        text={''}
      />
    </div>
  );
};
