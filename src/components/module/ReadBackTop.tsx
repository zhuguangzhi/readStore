import { BackTop, BackTopProps } from 'antd';
import React from 'react';

{
  /*  回到顶部*/
}
export const ReadBackTop = ({ ...props }: BackTopProps) => {
  return (
    <BackTop
      target={() => document.querySelector('.webContainer') as HTMLElement}
      visibilityHeight={1200}
      style={{ right: '100px', bottom: '100px' }}
      {...props}
    />
  );
};
