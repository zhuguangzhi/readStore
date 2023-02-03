import React, { useState } from 'react';
import './index.less';
import { Button, Form, FormInstance, Input, message } from 'antd';
import { SendCode } from '@/components/module/SendCode';
import { Values } from 'async-validator';
import { connect } from 'umi';
import { useAuth } from '@/hook/useAuth';
import { useAsync } from '@/hook/useAsync';
import {
  accountLoginProps,
  authorProps,
  loginResultProps,
  phoneLoginProps,
} from '@/type/user';
import { ErrorCheck, User } from '@/common/api';
import { ResponseData } from '@/common/http';
import { IconFont } from '@/components/IconFont';

// 手机号登陆
const PhoneInput = React.memo(
  ({
    formValue,
    setCaptchaKey,
    isCode,
  }: {
    formValue: FormInstance;
    setCaptchaKey: (val: string) => void;
    isCode: boolean;
  }) => {
    // const [mobile, setMobile] = useState<string>('');
    // const inputOnchange = (val: React.ChangeEvent<HTMLInputElement>) => {
    //   setMobile(val.target.value);
    // };
    const mobile = Form.useWatch('mobile', formValue);

    return (
      <div style={{ display: isCode ? 'block' : 'none' }}>
        <Form.Item name={'mobile'}>
          <Input
            className={'login_form_input'}
            placeholder={'请输入手机号码'}
            maxLength={11}
            minLength={11}
            // onChange={inputOnchange}
            autoComplete={'off'}
            prefix={<IconFont icon={'user'} color={'#999999'} />}
          />
        </Form.Item>
        <div className={'flex login_form_sendCode'}>
          <Form.Item name={'captcha_code'}>
            <Input
              className={'login_form_sendCode_input'}
              placeholder={'请输入验证码'}
              autoComplete={'off'}
              prefix={<IconFont icon={'lock'} color={'#999999'} />}
              maxLength={6}
              name={'code'}
            />
          </Form.Item>
          <SendCode
            className={'login_form_sendCode_btn'}
            mobile={mobile}
            setCaptchaKey={setCaptchaKey}
          />
        </div>
      </div>
    );
  },
);
const AccountInput = React.memo(({ isCode }: { isCode: boolean }) => {
  return (
    <div style={{ display: !isCode ? 'block' : 'none' }}>
      <Form.Item name={'account'}>
        <Input
          className={'login_form_input'}
          placeholder={'请输入手机号码'}
          prefix={<IconFont icon={'user'} color={'#999999'} />}
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item name={'password'}>
        <Input
          className={'login_form_input login_form_sendCode'}
          placeholder={'请输入密码'}
          autoComplete="new-password"
          type={'password'}
          prefix={<IconFont icon={'lock'} color={'#999999'} />}
        />
      </Form.Item>
    </div>
  );
});

const Login = () => {
  const { setToken, setUserInfo, setLoginPopup } = useAuth();
  const { run, isLoading } =
    useAsync<ResponseData<loginResultProps | authorProps>>();
  // 是否验证码登录
  const [isCode, setIsCode] = useState(true);
  const [formValue] = Form.useForm();
  // 发送验证码的回执
  const [captchaKey, setCaptchaKey] = useState('');

  // 用户登陆
  const onLogin = async (value: Values) => {
    if (
      (value.mobile === undefined && value.account === undefined) ||
      (value.password === undefined && value.captcha_code === undefined)
    ) {
      message.error('登陆信息不完整');
      return false;
    }
    const api = isCode ? User.phoneLogin : User.accountLogin;
    const loginRes = (await run(
      api({ ...value, captcha_key: captchaKey } as accountLoginProps &
        phoneLoginProps),
    )) as ResponseData<loginResultProps>;
    if (!ErrorCheck(loginRes)) return false;
    // 设置token
    setToken(loginRes.data.access_token);
    // 获取用户信息
    const userInfo = (await run(
      User.getUserInfo(),
    )) as ResponseData<authorProps>;
    if (!ErrorCheck(userInfo)) return false;
    setUserInfo(userInfo.data);
    //   关闭弹窗
    setLoginPopup(false);
  };

  return (
    <div className={'login'}>
      {/*滑块*/}
      <div className={'login_slider'}>
        {/*滑块*/}
        <i style={{ transform: `translateX(${isCode ? '0' : '105.5px'})` }}></i>
        <span
          onClick={() => setIsCode(true)}
          className={isCode ? 'color_33' : ''}
        >
          验证码登录
        </span>
        <span
          className={!isCode ? 'color_33' : ''}
          onClick={() => setIsCode(false)}
        >
          账号密码登录
        </span>
      </div>
      {/*    输入框*/}
      <Form
        form={formValue}
        className={'login_form'}
        onFinish={onLogin}
        key={'Form_mobile'}
      >
        <PhoneInput
          formValue={formValue}
          setCaptchaKey={setCaptchaKey}
          isCode={isCode}
        />
        <AccountInput isCode={isCode} />
        <Form.Item>
          <Button
            className={'login_form_btn'}
            type={'primary'}
            htmlType={'submit'}
            loading={isLoading}
          >
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default connect()(Login);
