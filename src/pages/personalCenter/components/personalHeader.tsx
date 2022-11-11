import { TabBar, TabBarProps } from '@/components/module/tabBar';
import React from 'react';
import { UseNode } from '@/components/UseNode';
import { IconFont } from '@/components/IconFont';
import './style/personalHeader.less';

export interface personalHeaderProps extends TabBarProps {
  useEdit: boolean; //是否使用编辑
  setEdit: (val: boolean) => void; //编辑edit
  onDelete?: () => void;
}
export const PersonalHeader = ({
  useEdit,
  setEdit,
  ...props
}: personalHeaderProps) => {
  return (
    <div className={'personalHeader justify_between'}>
      <TabBar
        {...props}
        tabClassName={'personalHeader_tab'}
        selectClassName={'personalHeader_tabSelect'}
      />
      <div className={'flex'}>
        <UseNode rIf={useEdit}>
          <div className={'personalHeader_delete'}>
            <IconFont icon={'delete'} />
            <span>移除</span>
          </div>
        </UseNode>
        <div
          className={'personalHeader_delete'}
          onClick={() => setEdit(!useEdit)}
          style={{ color: '#474747' }}
        >
          <IconFont icon={'tianxie'} />
          <span>编辑</span>
        </div>
      </div>
    </div>
  );
};
