import React from 'react';
import { IconFont } from '@/components/IconFont';
import './styles/infoItem.less';

export type InfoItemListProps = {
  label: string;
  isFinish: boolean; //是否完成
  value?: string; //值
  btnChild?: React.ReactElement; //按钮插槽
};
type InfoItemProps = {
  title: string;
  list: InfoItemListProps[];
};

export const InfoItem = ({ title, list }: InfoItemProps) => {
  return (
    <div className={'infoItem'}>
      <p className={'infoItem_title'}>{title}</p>
      {list.map((item, index) => {
        return (
          <div key={title + index} className={'infoItem_list'}>
            <div className={'infoItem_list_label'}>
              <IconFont
                icon={item.isFinish ? 'pass' : 'noPass'}
                width={'22px'}
                height={'22px'}
              />
              <span>{item.label}</span>
              <span className={'color_99 font_14'}>{item.value}</span>
            </div>
            {/*按钮*/}
            <div className={'infoItem_list_btn'}>{item.btnChild}</div>
          </div>
        );
      })}
    </div>
  );
};
