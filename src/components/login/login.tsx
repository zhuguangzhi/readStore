import React, { useState } from 'react';
import './index.less';
import { Button, Form, Input, message } from 'antd';
import { SendCode } from '@/components/module/SendCode';
import { Values } from 'async-validator';
import { useAccountLogin, usePhoneLogin } from '@/utils/user';
import { connect, Dispatch } from 'umi';
import { accountLoginProps, phoneLoginProps } from '@/type/user';

const Login = ({}: { dispatch: Dispatch }) => {
  const { mutate: phoneLogin } = usePhoneLogin();
  const { mutate: accountLogin } = useAccountLogin();
  // 是否验证码登录
  const [isCode, setIsCode] = useState(true);
  const [formValue] = Form.useForm();

  const onLogin = async (value: Values) => {
    if (
      value.mobile === undefined ||
      (value.password === undefined && value.captcha_code === undefined)
    ) {
      message.error('登陆信息不完整');
      return false;
    }
    let loginRes = isCode
      ? await phoneLogin(value as phoneLoginProps)
      : await accountLogin(value as accountLoginProps);
    setTimeout(() => {
      console.log('loginValue', loginRes);
    }, 3000);
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
      <Form form={formValue} className={'login_form'} onFinish={onLogin}>
        <Form.Item name={'mobile'}>
          <Input
            className={'login_form_input'}
            placeholder={'请输入手机号码'}
          />
        </Form.Item>
        {isCode ? (
          <div className={'flex login_form_sendCode'}>
            <Form.Item name={'captcha_code'}>
              <Input
                className={'login_form_sendCode_input'}
                placeholder={'请输入验证码'}
              />
            </Form.Item>
            <SendCode
              className={'login_form_sendCode_btn'}
              mobile={formValue.getFieldValue('mobile')}
            />
          </div>
        ) : (
          <Form.Item name={'password'}>
            <Input
              className={'login_form_input login_form_sendCode'}
              placeholder={'请输入密码'}
            />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            className={'login_form_btn'}
            type={'primary'}
            htmlType={'submit'}
          >
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default connect()(Login);
