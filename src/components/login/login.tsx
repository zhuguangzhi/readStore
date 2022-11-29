import React, { useState } from 'react';
import './index.less';

export const Login = () => {
  // 是否验证码登录
  const [isCode, setIsCode] = useState(true);
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
      <div></div>
    </div>
  );
};
