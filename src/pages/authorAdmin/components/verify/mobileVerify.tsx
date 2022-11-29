import { Form, FormInstance, Input } from 'antd';
import React from 'react';
import '../../style/formCommon.less';
import './style/mobileVerify.less';
import { SendCode } from '@/components/module/SendCode';

//设置默认值 TODO：从store中读取
const mobileDefault = '123****2312';
export const MobileVerify = ({
  form,
  useMobileInput,
}: {
  form: FormInstance;
  useMobileInput?: boolean;
}) => {
  return (
    <Form labelCol={{ span: 8 }} form={form}>
      <Form.Item label={'手机号码'}>
        {useMobileInput ? (
          <Form.Item name={'mobile'}>
            <Input
              className={'mobile_code'}
              maxLength={11}
              style={{ width: '260px', height: '37px' }}
            />
          </Form.Item>
        ) : (
          <span>{mobileDefault}</span>
        )}
      </Form.Item>
      <Form.Item label={'验证码'}>
        <div className={'flex'} style={{ height: '41px' }}>
          <Form.Item name={'code'} labelCol={{ span: 0 }}>
            <Input className={'mobile_code'} maxLength={6} />
          </Form.Item>
          <SendCode mobile={mobileDefault} className={'mobile_btn'} />
        </div>
      </Form.Item>
    </Form>
  );
};
