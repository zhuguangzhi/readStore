import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { IconFont } from '@/components/IconFont';
import { SendCode } from '@/components/module/SendCode';
import './style/editPassword.less';
import { Values } from 'async-validator';
import { ErrorCheck, User } from '@/common/api';
import { ResponseData } from '@/common/http';
import { authorProps, sendCodeResultProps } from '@/type/user';
import { useAsync } from '@/hook/useAsync';
import { getToken, useAuth } from '@/hook/useAuth';
import { useMounted } from '@/hook';

type StepProps = {
  captchaKey?: string;
  verifyKey?: string;
  setVerifyKey?: (val: string) => void;
  setCaptchaKey?: (val: string) => void;
  setStep?: (val: number) => void;
};
const StepOne = React.memo(
  ({ captchaKey, setVerifyKey, setCaptchaKey, setStep }: StepProps) => {
    const { userInfo } = useAuth();
    const [formValue] = Form.useForm();
    const mobile = Form.useWatch('mobile', formValue);
    const { run, isLoading } = useAsync();
    useEffect(() => {
      formValue.setFieldValue('mobile', userInfo?.mobile);
    }, [userInfo]);
    // 下一步
    const toNext = async (value: Values) => {
      //   校验验证码
      const checkRes = (await run(
        User.checkCode({
          captcha_key: captchaKey || '',
          captcha_code: value.captcha_code,
          mobile: value.mobile,
        }),
      )) as ResponseData<sendCodeResultProps>;
      if (!ErrorCheck(checkRes)) return false;
      setVerifyKey?.(checkRes.data.verify_key);
      setStep?.(2);
    };
    return (
      <Form
        className={'editPassword_step'}
        form={formValue}
        onFinish={toNext}
        requiredMark={false}
      >
        <Form.Item
          name={'mobile'}
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input
            className={'editPassword_step_input'}
            placeholder={'请输入手机号码'}
            autoComplete={'off'}
            disabled={true}
            prefix={<IconFont icon={'user'} color={'#999999'} />}
          />
        </Form.Item>
        <div className={'flex editPassword_step_sendCode'}>
          <Form.Item
            name={'captcha_code'}
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input
              className={'editPassword_step_sendCode_input'}
              placeholder={'请输入验证码'}
              autoComplete={'off'}
              prefix={<IconFont icon={'lock'} color={'#999999'} />}
            />
          </Form.Item>
          <SendCode
            className={'editPassword_step_sendCode_btn'}
            mobile={mobile}
            setCaptchaKey={(val) => setCaptchaKey?.(val)}
          />
        </div>
        <Button
          htmlType={'submit'}
          className={'editPassword_step_btn'}
          loading={isLoading}
        >
          下一步
        </Button>
      </Form>
    );
  },
);
const StepTwo = React.memo(({ verifyKey, setStep }: StepProps) => {
  const { userInfo } = useAuth();
  const { run, isLoading } = useAsync<ResponseData<{}>>();
  //修改密码
  const changePassword = async (value: Values) => {
    const changeRes = await run(
      User.changePassword({
        mobile: (userInfo as authorProps).mobile,
        password: value.password,
        password_confirmation: value.check_password,
        unlock_key: verifyKey as string,
      }),
    );
    if (!ErrorCheck(changeRes)) return;
    message.success('修改成功');
    setStep?.(1);
  };
  return (
    <Form className={'editPassword_step'} onFinish={changePassword}>
      <Form.Item
        name={'password'}
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input
          className={'editPassword_step_input'}
          placeholder={'请输入密码（8-16个字符）'}
          maxLength={16}
          minLength={8}
          type={'password'}
          autoComplete="off"
          prefix={<IconFont icon={'lock'} color={'#999999'} />}
        />
      </Form.Item>
      <Form.Item
        name={'check_password'}
        rules={[
          {
            required: true,
            message: '请确认密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次密码不一致'));
            },
          }),
        ]}
      >
        <Input
          className={'editPassword_step_input'}
          placeholder={'请再次输入密码'}
          type={'password'}
          autoComplete="off"
          prefix={<IconFont icon={'lock'} color={'#999999'} />}
        />
      </Form.Item>
      <Button
        className={'editPassword_step_btn'}
        type={'primary'}
        htmlType={'submit'}
        loading={isLoading}
      >
        修改
      </Button>
    </Form>
  );
});

export default () => {
  const [currentStep, setStep] = useState(1);
  //验证码校验通过key值
  const [verifyKey, setVerifyKey] = useState('');
  // 发送验证码的回执
  const [captchaKey, setCaptchaKey] = useState('');

  useMounted(() => {
    if (!getToken()) message.error('您暂未登陆');
  });

  return (
    <div className={'editPassword'}>
      <p className={'editPassword_title'}>修改密码</p>
      {currentStep === 1 ? (
        <StepOne
          setStep={setStep}
          setCaptchaKey={setCaptchaKey}
          setVerifyKey={setVerifyKey}
          captchaKey={captchaKey}
        />
      ) : (
        <StepTwo setStep={setStep} verifyKey={verifyKey} />
      )}
    </div>
  );
};
