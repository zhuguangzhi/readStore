import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import '../../style/formCommon.less';
import { modalTypes } from '@/pages/authorAdmin/components/modifyInfo';
import { useModifyAuthorBaseInfo } from '@/utils/authorAdmin/personalInfo';
import { modifyAuthorBaseInfoProps } from '@/type/authorAdmin/personalInfo';
import { Values } from 'async-validator';

export type BindInputProps = {
  form?: FormInstance;
  label: string;
  type: Partial<modalTypes>;
  setStep: Function;
};
export const BindInput = ({ form, label, setStep, type }: BindInputProps) => {
  const { mutate: editAuthorInfo, isLoading } =
    useModifyAuthorBaseInfo(setStep);

  const onBind = (value: Values) => {
    let param: modifyAuthorBaseInfoProps = {};
    switch (type) {
      case 'pen_name':
        param = { pen_name: value.bindValue };
        break;
      case 'qq':
        param = { qq: value.bindValue };
        break;
      case 'address':
        param = { address: value.bindValue };
        break;
      case 'email':
        param = { email: value.bindValue };
        break;
      case 'postcode':
        param = { postcode: value.bindValue };
        break;
    }
    editAuthorInfo(param);
  };
  return (
    <Form
      labelCol={{ span: 6 }}
      form={form}
      onFinish={onBind}
      requiredMark={false}
    >
      <Form.Item
        label={label}
        name={'bindValue'}
        rules={[{ required: true, message: `请填写${label}` }]}
      >
        <Input autoComplete={'off'} />
      </Form.Item>
      <Button
        className={'readModal_footerBtn'}
        shape="round"
        type={'primary'}
        style={{ marginBottom: '76px' }}
        htmlType={'submit'}
        loading={isLoading}
      >
        下一步
      </Button>
    </Form>
  );
};
