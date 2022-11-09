import React, { useState } from 'react';
import './style/tabBar.less';

type tabProps = {
  key: string;
  label: string;
};
export type TabBarProps = {
  tabs: tabProps[];
  defaultSelect: tabProps['key'];
  selectChange?: (tab: tabProps) => void;
  className?: string;
};

export const TabBar = ({
  tabs,
  defaultSelect,
  selectChange,
  className,
}: TabBarProps) => {
  const [select, setSelect] = useState(defaultSelect);
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
            className={`tab_list ${
              select === tab.key ? 'tab_list_select' : ''
            }`}
          >
            {tab.label}
          </li>
        );
      })}
    </ul>
  );
};
