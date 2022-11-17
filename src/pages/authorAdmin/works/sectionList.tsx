// 章节列表
import React from 'react';
import { IconFont } from '@/components/IconFont';
import './style/sectionList.less';
import { VirtualTable } from '@/pages/authorAdmin/works/VirtualTable';

export const SectionList = () => {
  const columns = [
    {
      title: 'A',
      dataIndex: 'key',
      width: 150,
    },
    {
      title: 'B',
      dataIndex: 'key',
      width: 150,
    },
    {
      title: 'C',
      dataIndex: 'key',
      width: 150,
    },
    {
      title: 'D',
      dataIndex: 'key',
      width: 150,
    },
    {
      title: 'E',
      dataIndex: 'key',
      width: 200,
    },
    {
      title: 'F',
      dataIndex: 'key',
      width: 100,
    },
  ];
  const data = Array.from(
    {
      length: 100000,
    },
    (_, key) => ({
      key,
    }),
  );

  return (
    <div className={'sectionList'}>
      <p className={'sectionList_header'}>
        <IconFont
          width={'28px'}
          height={'28px'}
          marginRight={'12px'}
          icon={'addSection'}
        />
        <span>新建章节</span>
      </p>
      <VirtualTable
        columns={columns}
        dataSource={data}
        scroll={{ y: 600, x: '100%' }}
      />
      {/*<Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }}  />*/}
    </div>
  );
};
export default SectionList;
