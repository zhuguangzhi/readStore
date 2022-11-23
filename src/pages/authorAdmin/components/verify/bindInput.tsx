import { Form, FormInstance, Input } from 'antd';
import React from 'react';
import '../../style/formCommon.less';

export const BindInput = ({
  form,
  label,
}: {
  form?: FormInstance;
  label: string;
}) => {
  return (
    <Form labelCol={{ span: 6 }} form={form}>
      <Form.Item label={label} name={'bindValue'}>
        <Input />
      </Form.Item>
    </Form>
  );
};
