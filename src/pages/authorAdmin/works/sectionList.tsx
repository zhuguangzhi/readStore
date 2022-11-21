// 章节列表
import React from 'react';
import { IconFont } from '@/components/IconFont';
import './style/sectionList.less';
import { ReadTable } from '@/components/module/ReadTable';
import { UseNode } from '@/components/UseNode';
import { BaseTableProps } from 'ali-react-table';

export const SectionList = ({ type }: { type: 'section' | 'draft' }) => {
  const columns: BaseTableProps['columns'] = [
    {
      name: '章节名称',
      code: 'key',
      width: 250,
    },
    {
      name: '状态',
      code: 'key',
    },
    {
      name: '字数',
      code: 'key',
      width: 150,
    },
    {
      name: '发布时间',
      code: 'key',
      width: 250,
    },
    {
      name: '操作',
      width: 250,
      render: () => {
        return <button className={'sectionList_button'}>修改</button>;
      },
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
      <UseNode rIf={type === 'section'}>
        <p className={'sectionList_header'}>
          <IconFont
            width={'28px'}
            height={'28px'}
            marginRight={'12px'}
            icon={'addSection'}
          />
          <span>新建章节</span>
        </p>
      </UseNode>
      <ReadTable columns={columns} dataSource={data} />
    </div>
  );
};
export default SectionList;
