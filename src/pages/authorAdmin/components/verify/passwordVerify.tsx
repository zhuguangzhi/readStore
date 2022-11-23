import { Form, FormInstance, Input } from 'antd';
import React from 'react';
import '../../style/formCommon.less';

export const PasswordVerify = ({ form }: { form?: FormInstance }) => {
  return (
    <Form labelCol={{ span: 6 }} form={form}>
      <Form.Item label={'请输入新密码'} name={'newPassword'}>
        <Input />
      </Form.Item>
      <Form.Item label={'请确认新密码'} name={'checkPassword'}>
        <Input />
      </Form.Item>
    </Form>
  );
};
