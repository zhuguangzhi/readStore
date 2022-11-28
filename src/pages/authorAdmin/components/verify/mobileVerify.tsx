import { Button, Form, FormInstance, Input } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../../style/formCommon.less';
import './style/mobileVerify.less';

//设置默认值 TODO：从store中读取
const mobileDefault = '123****2312';
type Fnc = () => void;
export const MobileVerify = ({
  form,
  useMobileInput,
}: {
  form: FormInstance;
  useMobileInput?: boolean;
}) => {
  //倒计时
  const [countdown, setCount] = useState<null | number>(null);
  const tickRef = useRef<Fnc>(() => {});
  let timerRef = useRef<null | NodeJS.Timer>(null);
  useEffect(() => {
    tickRef.current = () => {
      if (countdown && countdown > 1) setCount(countdown - 1);
      else {
        setCount(null);
        clearInterval(timerRef.current as NodeJS.Timer);
      }
    };
  });
  // 获取验证码
  const getCode = useCallback(() => {
    setCount(60);
    timerRef.current = setInterval(() => {
      console.log('timerRef.current', timerRef.current);
      tickRef.current();
    }, 1000);
  }, [countdown]);
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
          <Button
            className={'mobile_btn'}
            disabled={countdown !== null}
            onClick={getCode}
          >
            {countdown !== null ? `${countdown} 秒` : '获取验证码'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
