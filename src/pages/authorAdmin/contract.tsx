import React from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Button, Form, Input } from 'antd';
import './style/contract.less';
import { ReadTable } from '@/components/module/ReadTable';
import { BaseTableProps } from 'ali-react-table';

const SubIcon = () => (
  <IconFont width={'31px'} height={'33px'} icon={'contract'} />
);
export default () => {
  // TODO:合同状态转换 字体颜色修改
  const tableColumn: BaseTableProps['columns'] = [
    {
      name: '合同编号',
      code: 'id',
      width: 320,
    },
    {
      name: '书籍名称',
      code: 'name',
      width: 260,
    },
    {
      name: '发起方',
      code: 'initiator',
      width: 180,
    },
    {
      name: '签约时间',
      code: 'time',
    },
    {
      name: '合同状态',
      width: 120,
      code: 'status',
    },
    {
      name: '操作',
      width: 180,
      render(): React.ReactNode {
        return (
          <div
            className={'flex cursor flex_justify flex_align'}
            style={{ color: 'var(--adminTheme)' }}
          >
            <IconFont
              icon={'info'}
              width={'19px'}
              height={'20px'}
              marginRight={'4px'}
            />
            <span>详情</span>
          </div>
        );
      },
    },
  ];
  const tableData: BaseTableProps['dataSource'] = [
    {
      name: '这只是一个小说的名字别看了',
      id: '21312321',
      initiator: '看点小故事',
      time: '2022/02/23',
      status: 1,
    },
    {
      name: '这只是一个小说的名字别看了',
      id: '21312321',
      initiator: '看点小故事',
      time: '2022/02/23',
      status: 0,
    },
    {
      name: '这只是一个小说的名字别看了',
      id: '21312321',
      initiator: '看点小故事',
      time: '2022/02/23',
      status: 1,
    },
    {
      name: '这只是一个小说的名字别看了',
      id: '21312321',
      initiator: '看点小故事',
      time: '2022/02/23',
      status: 1,
    },
    {
      name: '这只是一个小说的名字别看了',
      id: '21312321',
      initiator: '看点小故事',
      time: '2022/02/23',
      status: 1,
    },
  ];

  return (
    <div className={'contract'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'我的合同'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container contract_container'}>
        <Form style={{ marginBottom: '34px' }} layout={'inline'}>
          <Form.Item name="username" label={'合同查询'}>
            <Input className={'contract_input'} style={{ width: '500px' }} />
          </Form.Item>

          <Form.Item>
            <Button className={'contract_btn'} type="primary" htmlType="submit">
              查询
            </Button>
            <Button className={'contract_btn'} type="default">
              重置
            </Button>
          </Form.Item>
        </Form>
        <ReadTable dataSource={tableData} columns={tableColumn} />
      </div>
    </div>
  );
};
