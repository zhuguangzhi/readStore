import { BaseTable, BaseTableProps } from 'ali-react-table';
import React from 'react';
import './style/table.less';

export const ReadTable = ({
  columns,
  dataSource,
  ...props
}: BaseTableProps) => {
  return (
    <BaseTable
      className={'ReadTable'}
      columns={columns}
      dataSource={dataSource}
      {...props}
      style={{ overflow: 'auto', maxHeight: '100vh' }}
      components={{ EmptyContent: () => <h1>数据为空~~</h1> }}
    />
  );
};
