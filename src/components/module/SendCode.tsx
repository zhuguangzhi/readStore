import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from 'antd';
import { useAsync } from '@/hook/useAsync';
import { ErrorCheck, User } from '@/common/api';
import { ResponseData } from '@/common/http';

interface SendCodeProps extends ButtonProps {
  mobile: string | number;
  className?: string;
}
type Fnc = () => void;
export const SendCode = ({ className, mobile, ...props }: SendCodeProps) => {
  const { run, isLoading } = useAsync<ResponseData<{}>>();
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
  const getCode = useCallback(
    async (num: string | number) => {
      const sendCodeRes = await run(User.sendCode({ mobile: num }));
      if (!ErrorCheck(sendCodeRes)) return false;
      setCount(60);
      timerRef.current = setInterval(() => {
        tickRef.current();
      }, 1000);
    },
    [countdown],
  );
  return (
    <Button
      className={className}
      disabled={countdown !== null}
      onClick={() => getCode(mobile)}
      loading={isLoading}
      {...props}
    >
      {countdown !== null ? `${countdown} 秒` : '获取验证码'}
    </Button>
  );
};
