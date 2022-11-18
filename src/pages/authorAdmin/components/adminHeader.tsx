import React, { ReactNode } from 'react';
import { IconFont } from '@/components/IconFont';
import { Badge, Input } from 'antd';
import { inputEvent } from '@/type';
import { UseNode } from '@/components/UseNode';
import './styles/adminHeader.less';

export type AdminHeaderProps = {
  subTitle?: string;
  subIcon?: ReactNode;
  useSearchInput?: boolean;
  className?: string;
};
const SearchIcon = () => (
  <IconFont width={'22px'} height={'20px'} color={'#93A6D6'} icon={'search'} />
);
export const AdminHeader = ({
  subTitle,
  subIcon,
  className,
  useSearchInput = false,
}: AdminHeaderProps) => {
  // 搜索框事件
  const onSearch = (e: inputEvent) => {
    console.log(' e.target.value', e.target.value);
  };
  return (
    <div className={`adminSearch ${className}`}>
      <div className={'flex flex_align'}>
        {/*subTitle*/}
        <div className={'flex flex_align adminSearch_subTitle'}>
          {subIcon}
          <span>{subTitle}</span>
        </div>
        {/*    搜索框*/}
        <UseNode rIf={useSearchInput}>
          <Input
            className={'adminSearch_search'}
            autoComplete="off"
            placeholder="搜索"
            suffix={<SearchIcon />}
            onChange={onSearch}
          />
        </UseNode>
      </div>
      <div className={'flex flex_align'}>
        <Badge count={100} size="small">
          <i className={'message_tip'} style={{ color: 'var(--adminTheme)' }}>
            <IconFont
              className={'cursor'}
              width={'25px'}
              height={'27px'}
              icon={'tip'}
            />
          </i>
        </Badge>
        <IconFont
          className={'cursor'}
          width={'23px'}
          height={'23px'}
          icon={'tuichu'}
          marginLeft={'28px'}
        />
      </div>
    </div>
  );
};
