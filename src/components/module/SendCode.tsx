import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, ButtonProps } from 'antd';
import { useAsync } from '@/hook/useAsync';
import { ErrorCheck, User } from '@/common/api';
import { ResponseData } from '@/common/http';
import { sendCodeResultProps } from '@/type/user';
import { useMounted } from '@/hook';

interface SendCodeProps extends ButtonProps {
  mobile: string | number;
  className?: string;
  setCaptchaKey?: (val: string) => void;
}
type Fnc = () => void;
export const SendCode = ({
  className,
  mobile,
  setCaptchaKey,
  ...props
}: SendCodeProps) => {
  const { run, isLoading } = useAsync<ResponseData<sendCodeResultProps>>();
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
      const sendCodeRes = (await run(
        User.sendCode({ mobile: num }),
      )) as ResponseData<sendCodeResultProps>;
      if (!ErrorCheck(sendCodeRes)) return false;
      setCaptchaKey?.(sendCodeRes.data.captcha_key);
      setCount(60);
      timerRef.current = setInterval(() => {
        tickRef.current();
      }, 1000);
    },
    [countdown],
  );
  useMounted(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  });
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
