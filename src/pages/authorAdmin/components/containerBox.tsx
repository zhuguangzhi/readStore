import React, { ReactElement } from 'react';
import './styles/containerBox.less';

export type containerBoxProps = {
  title: string;
  topRightChild?: ReactElement; //头部右上角插槽
  children: ReactElement; //内容实例
};

export const ContainerBox = ({
  title,
  topRightChild,
  children,
}: containerBoxProps) => {
  return (
    <div className={'containerInfoBox'}>
      <div className={'justify_between containerInfoBox_title'}>
        <span className={'font_16'}>{title}</span>
        {topRightChild}
      </div>
      {children}
    </div>
  );
};
