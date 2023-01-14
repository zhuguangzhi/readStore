import { BaseTable, BaseTableProps } from 'ali-react-table';
import React from 'react';
import './style/table.less';
import { DefaultNoData } from '@/components/defaultNoData';

interface ReadTableProps extends BaseTableProps {
  maxHeight?: string;
}
const NoData = () => {
  return <DefaultNoData className={'readTable_nodata'} type={'authorNoData'} />;
};
export const ReadTable = ({
  columns,
  dataSource,
  maxHeight = '100vh',
  ...props
}: ReadTableProps) => {
  return (
    <BaseTable
      className={'readTable'}
      columns={columns}
      dataSource={dataSource}
      {...props}
      style={{ overflow: 'auto', maxHeight: maxHeight, minHeight: '400px' }}
      components={{ EmptyContent: () => <NoData /> }}
    />
  );
};
