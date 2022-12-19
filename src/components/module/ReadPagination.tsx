import { Pagination, PaginationProps } from 'antd';
import React from 'react';
import './style/readPagination.less';

export const ReadPagination = ({ ...props }: PaginationProps) => {
  return <Pagination {...props} className={'ReadPagination'} />;
};
