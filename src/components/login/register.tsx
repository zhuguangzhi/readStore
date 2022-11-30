import React, { useState } from 'react';
import './index.less';
import { Button, Form, Input } from 'antd';
import { SendCode } from '@/components/module/SendCode';

export const Register = () => {
  const [currentStep, setStep] = useState(1);
  const [formValue] = Form.useForm();
  const StepOne = () => {
    return (
      <>
        <Form.Item name={'mobile'}>
          <Input
            className={'login_form_input'}
            placeholder={'请输入手机号码'}
          />
        </Form.Item>
        <Form.Item>
          <div className={'flex login_form_sendCode'}>
            <Form.Item name={'code'}>
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
        </Form.Item>
        <Form.Item>
          <Button
            className={'login_form_btn'}
            type={'primary'}
            onClick={() => setStep(2)}
          >
            下一步
          </Button>
        </Form.Item>
      </>
    );
  };
  const StepTwo = () => {
    return (
      <>
        <Form.Item name={'username'}>
          <Input className={'login_form_input'} placeholder={'请输入用户名'} />
        </Form.Item>
        <Form.Item name={'password'}>
          <Input
            className={'login_form_input register_passwordInput'}
            placeholder={'请输入密码（6-15个字符）'}
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
            >
              注册
            </Button>
          </div>
        </Form.Item>
      </>
    );
  };
  return (
    <div className={'register'}>
      <Form form={formValue}>
        {currentStep === 1 ? <StepOne /> : <StepTwo />}
      </Form>
    </div>
  );
};
