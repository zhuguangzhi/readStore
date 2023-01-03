import React, { useState } from 'react';
import './index.less';
import { Button, Form, Input, message } from 'antd';
import { SendCode } from '@/components/module/SendCode';
import { Values } from 'async-validator';
import { useAsync } from '@/hook/useAsync';
import { ErrorCheck, User } from '@/common/api';
import {
  authorProps,
  loginResultProps,
  sendCodeResultProps,
} from '@/type/user';
import { ResponseData } from '@/common/http';
import { useAuth } from '@/hook/useAuth';
import { IconFont } from '@/components/IconFont';

type RegisterParamProps = { mobile: string; verify_key: string };
type StepProps = {
  registerParam?: RegisterParamProps;
  setRegisterParam?: ({ mobile, verify_key }: RegisterParamProps) => void;
  setStep: (val: number) => void;
};
const StepOne = ({ setStep, setRegisterParam }: StepProps) => {
  const { run, isLoading } = useAsync();
  const [mobile, setMobile] = useState<string>('');
  const [oneForm] = Form.useForm();
  const inputOnchange = (val: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(val.target.value);
  };
  const [captchaKey, setCaptchaKey] = useState('');
  const stepOneFinish = async (value: Values) => {
    if (captchaKey === '') return message.error('请先获取验证码');
    const checkRes = (await run(
      User.checkCode({
        captcha_key: captchaKey,
        captcha_code: value.captcha_code,
        mobile: value.mobile,
      }),
    )) as ResponseData<sendCodeResultProps>;
    if (!ErrorCheck(checkRes)) return false;
    setRegisterParam?.({
      mobile: mobile,
      verify_key: checkRes.data.verify_key,
    });
    setStep(2);
  };
  return (
    <Form onFinish={stepOneFinish} form={oneForm}>
      <Form.Item name={'mobile'}>
        <Input
          className={'login_form_input'}
          placeholder={'请输入手机号码'}
          autoComplete={'off'}
          onChange={inputOnchange}
          prefix={<IconFont icon={'user'} color={'#999999'} />}
        />
      </Form.Item>
      <Form.Item>
        <div className={'flex login_form_sendCode'}>
          <Form.Item name={'captcha_code'}>
            <Input
              className={'login_form_sendCode_input'}
              placeholder={'请输入验证码'}
              autoComplete={'off'}
              prefix={<IconFont icon={'lock'} color={'#999999'} />}
            />
          </Form.Item>
          <SendCode
            className={'login_form_sendCode_btn'}
            mobile={mobile}
            setCaptchaKey={(val) => setCaptchaKey(val)}
          />
        </div>
      </Form.Item>
      <Form.Item>
        <Button
          className={'login_form_btn'}
          type={'primary'}
          htmlType={'submit'}
          loading={isLoading}
        >
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};
const StepTwo = ({ setStep, registerParam }: StepProps) => {
  const { run } = useAsync();
  const { setToken, setUserInfo, setLoginPopup } = useAuth();
  const [twoForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onStepTwoFinish = async (value: Values) => {
    if (value.password !== value.check_password)
      return message.error('两次密码不一致');
    setLoading(true);
    const registerRes = (await run(
      User.register({
        ...(registerParam as RegisterParamProps),
        password: value.password,
      }),
    )) as ResponseData<loginResultProps>;
    if (!ErrorCheck(registerRes)) return setLoading(false);
    setToken(registerRes.data.access_token);
    //    获取用户信息
    const userInfo = (await run(
      User.getUserInfo(),
    )) as ResponseData<authorProps>;
    if (ErrorCheck(userInfo)) setUserInfo(userInfo.data);
    setLoading(false);
    //   关闭弹窗
    setLoginPopup(false);
  };
  return (
    <Form onFinish={onStepTwoFinish} form={twoForm}>
      <Form.Item name={'password'}>
        <Input
          className={'login_form_input register_passwordInput'}
          placeholder={'请输入密码（8-16个字符）'}
          maxLength={16}
          minLength={8}
          type={'password'}
          autoComplete="off"
          prefix={<IconFont icon={'lock'} color={'#999999'} />}
        />
      </Form.Item>
      <Form.Item name={'check_password'}>
        <Input
          className={'login_form_input register_passwordInput'}
          placeholder={'请再次输入密码'}
          type={'password'}
          autoComplete="off"
          prefix={<IconFont icon={'lock'} color={'#999999'} />}
        />
      </Form.Item>
      <Form.Item>
        <div className={'justify_between'}>
          <Button className={'register_backBtn'} onClick={() => setStep(1)}>
            上一步
          </Button>
          <Button
            className={'login_form_btn register_loginBtn'}
            type={'primary'}
            htmlType={'submit'}
            loading={loading}
          >
            注册
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export const Register = () => {
  const [currentStep, setStep] = useState(1);
  //验证码校验通过key值
  const [registerParam, setRegisterParam] = useState<RegisterParamProps>({
    mobile: '',
    verify_key: '',
  });

  return (
    <div className={'register'}>
      {currentStep === 1 ? (
        <StepOne setStep={setStep} setRegisterParam={setRegisterParam} />
      ) : (
        <StepTwo setStep={setStep} registerParam={registerParam} />
      )}
    </div>
  );
};
