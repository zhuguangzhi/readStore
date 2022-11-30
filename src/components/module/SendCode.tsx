import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

type SendCodeProps = {
  mobile: string | number;
  className?: string;
};
type Fnc = () => void;
export const SendCode = ({ className }: SendCodeProps) => {
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
      tickRef.current();
    }, 1000);
  }, [countdown]);
  return (
    <Button
      className={className}
      disabled={countdown !== null}
      onClick={getCode}
    >
      {countdown !== null ? `${countdown} 秒` : '获取验证码'}
    </Button>
  );
};
