//银行信息认证

import { Form, FormInstance, Input } from 'antd';
import React from 'react';
import '../../style/formCommon.less';
import './style/bankVerify.less';

export const BankVerify = ({ form }: { form?: FormInstance }) => {
  return (
    <Form labelCol={{ span: 6 }} className={'bankVerify'} form={form}>
      <Form.Item label={'户名'} name={'name'}>
        <Input className={'bankVerify_input'} autoComplete={'off'} />
      </Form.Item>
      <Form.Item label={'银行卡号'}>
        <div className={'bankVerify_box'}>
          <Form.Item name={'cardNum'}>
            <Input className={'bankVerify_input'} autoComplete={'off'} />
          </Form.Item>
          <span className={'bankVerify_box_tip'}>
            建议作者使用一类银行卡作为收款账户（二类卡有转账限额，可能导致稿费发放失败）
          </span>
        </div>
      </Form.Item>
      <Form.Item label={'银行预留手机号'} name={'mobile'}>
        <Input
          maxLength={11}
          minLength={11}
          className={'bankVerify_input'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item label={'开户行名称'} name={'bankName'}>
        <Input
          className={'bankVerify_input'}
          placeholder={'如: 中国银行'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item label={'开户行支行名称'} name={'subBranchName'}>
        <Input className={'bankVerify_input'} autoComplete={'off'} />
      </Form.Item>
      <Form.Item label={'银行行号'}>
        <div className={'bankVerify_box'}>
          <Form.Item name={'bankNum'}>
            <Input className={'bankVerify_input'} autoComplete={'off'} />
          </Form.Item>
          <span className={'bankVerify_box_tip'}>
            为了方便接受稿费，如不清楚行号，可以电话咨询银行客服。
          </span>
        </div>
      </Form.Item>
    </Form>
  );
};
