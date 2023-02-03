import { Button, Form, FormInstance, Input } from 'antd';
import React, { useState } from 'react';
import '../../style/formCommon.less';
import './style/mobileVerify.less';
import { SendCode } from '@/components/module/SendCode';
import { useAuth } from '@/hook/useAuth';
import { Values } from 'async-validator';
import { ErrorCheck, User } from '@/common/api';
import { ResponseData } from '@/common/http';
import { sendCodeResultProps } from '@/type/user';
import { useAsync } from '@/hook/useAsync';

type mobileVerifyProps = {
  form: FormInstance;
  useMobileInput?: boolean;
  setStep: Function;
};
export const MobileVerify = ({
  form,
  useMobileInput,
  setStep,
}: mobileVerifyProps) => {
  const { userInfo } = useAuth();
  const { run, isLoading } = useAsync();
  // 验证码返回key
  const [captchaKey, setCaptchaKey] = useState('');
  // 校验
  const checkAccount = async (value: Values) => {
    if (!userInfo) return;
    //   校验验证码
    const checkRes = (await run(
      User.checkCode({
        captcha_key: captchaKey || '',
        captcha_code: value.code,
        mobile: userInfo.mobile,
      }),
    )) as ResponseData<sendCodeResultProps>;
    if (!ErrorCheck(checkRes)) return false;
    setStep();
  };
  return (
    <Form labelCol={{ span: 8 }} form={form} onFinish={checkAccount}>
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
          <span>{userInfo?.mobile}</span>
        )}
      </Form.Item>
      <Form.Item label={'验证码'}>
        <div className={'flex'} style={{ height: '41px' }}>
          <Form.Item
            name={'code'}
            labelCol={{ span: 0 }}
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              className={'mobile_code'}
              maxLength={6}
              autoComplete={'off'}
            />
          </Form.Item>
          <SendCode
            mobile={userInfo?.mobile || ''}
            className={'mobile_btn'}
            setCaptchaKey={(val) => setCaptchaKey(val)}
          />
        </div>
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
