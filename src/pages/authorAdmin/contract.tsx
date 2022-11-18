import React from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { Button, Form, Input } from 'antd';

const SubIcon = () => (
  <IconFont width={'31px'} height={'33px'} icon={'contract'} />
);
export default () => {
  return (
    <div className={'contract'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'我的合同'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container contract_container'}>
        <Form layout={'inline'}>
          <Form.Item name="username" label={'合同查询'}>
            <Input style={{ width: '500rem' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button type="default">重置</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
