import { BaseTable, BaseTableProps } from 'ali-react-table';
import React from 'react';
import './style/table.less';

interface ReadTableProps extends BaseTableProps {
  maxHeight?: string;
}
export const ReadTable = ({
  columns,
  dataSource,
  maxHeight = '100vh',
  ...props
}: ReadTableProps) => {
  return (
    <BaseTable
      className={'ReadTable'}
      columns={columns}
      dataSource={dataSource}
      {...props}
      style={{ overflow: 'auto', maxHeight: maxHeight }}
      components={{ EmptyContent: () => <h1>数据为空~~</h1> }}
    />
  );
};
