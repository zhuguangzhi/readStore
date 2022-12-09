import React, { ReactElement, useEffect, useState } from 'react';
import './style/tabBar.less';
import { UseNode } from '@/components/UseNode';

export type tabProps = {
  key: string;
  label: string;
};
export type TabBarProps = {
  tabs: tabProps[];
  defaultSelect: tabProps['key'];
  selectChange?: (tab: tabProps) => void;
  className?: string;
  selectClassName?: string; //选中时样式
  tabClassName?: string; //标签样式
  useIcon?: boolean; //是否使用图标
  Icon?: ReactElement; //选中时展示的图标
};

export const TabBar = ({
  tabs,
  defaultSelect,
  selectChange,
  className,
  ...props
}: TabBarProps) => {
  const [select, setSelect] = useState(defaultSelect);
  useEffect(() => {
    setSelect(defaultSelect);
  }, [defaultSelect]);
  const onClick = (tab: tabProps) => {
    setSelect(tab.key);
    selectChange?.(tab);
  };
  return (
    <ul className={`my_tab_bar ${className}`}>
      {tabs.map((tab) => {
        return (
          <li
            onClick={() => onClick(tab)}
            key={tab.key}
            className={`tab_list ${props.tabClassName} ${
              select === tab.key
                ? props.selectClassName + ' tab_list_select'
                : ''
            }`}
          >
            <UseNode rIf={props.useIcon && select === tab.key}>
              {props.Icon ? props.Icon : <i className={'tab_list_icon'} />}
            </UseNode>
            {tab.label}
          </li>
        );
      })}
    </ul>
  );
};
