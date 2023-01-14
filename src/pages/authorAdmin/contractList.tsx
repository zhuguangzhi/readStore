import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Button, Form, Input } from 'antd';
import './style/contractList.less';
import { ReadTable } from '@/components/module/ReadTable';
import { BaseTableProps } from 'ali-react-table';
import { ReadPagination } from '@/components/module/ReadPagination';
import { useGetContractList } from '@/utils/authorAdmin/personalInfo';
import { useAuth } from '@/hook/useAuth';
import { contractProps } from '@/type/authorAdmin/personalInfo';
import { contrastStatus } from '@/utils/format';

const SubIcon = () => (
  <IconFont width={'31px'} height={'33px'} icon={'contract'} />
);
export default () => {
  const pageSize = 10;
  const tableColumn: BaseTableProps['columns'] = [
    {
      name: '合同编号',
      code: 'id',
      width: 320,
    },
    {
      name: '书籍名称',
      code: 'book_title',
      width: 260,
    },
    {
      name: '签约时间',
      code: 'signed_time',
    },
    {
      name: '合同状态',
      width: 120,
      code: 'sign_status',
      render(value: contractProps['sign_status']): React.ReactNode {
        return <span>{contrastStatus(value)}</span>;
      },
    },
    {
      name: '操作',
      width: 180,
      render(_, row: contractProps): React.ReactNode {
        return (
          <div
            className={'flex cursor flex_justify flex_align'}
            style={{ color: 'var(--adminTheme)' }}
            onClick={() => window.open(row.file_url)}
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
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const { data: tableData, isLoading: loading } = useGetContractList({
    search_keywords: keyword,
    page,
    page_size: pageSize,
  });
  const { setLoadingModel } = useAuth();
  useEffect(() => {
    setLoadingModel(loading);
  }, [loading]);
  return (
    <div className={'contractList'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'我的合同'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container contractList_container'}>
        <Form
          style={{ marginBottom: '34px', height: '40px' }}
          layout={'inline'}
          onFinish={(values) => setKeyword(values.keyword)}
        >
          <Form.Item name="keyword" label={'合同查询'}>
            <Input
              className={'contractList_input'}
              style={{ width: '500px' }}
              autoComplete={'off'}
              defaultValue={''}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className={'contractList_btn'}
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
            <Button
              className={'contractList_btn'}
              type="default"
              htmlType={'reset'}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
        <ReadTable dataSource={tableData?.data || []} columns={tableColumn} />
        <ReadPagination
          style={{ marginTop: '22px' }}
          hideOnSinglePage={true}
          current={page}
          total={tableData?.page_info.total}
          pageSize={pageSize}
          onChange={(val) => setPage(val)}
        />
      </div>
    </div>
  );
};
