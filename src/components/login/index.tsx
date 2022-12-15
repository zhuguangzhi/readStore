import { ReadModel } from '@/components/module/ReadModel';
import React, { useState } from 'react';
import { ModalProps } from 'antd';
import Login from '@/components/login/login';

import './index.less';
import { netName } from '../../../public/config';
import { Register } from '@/components/login/register';
import { useAuth } from '@/hook/useAuth';

export const LoginPopup = ({ ...props }: ModalProps) => {
  const { loginPopup, setLoginPopup } = useAuth();
  // true 登录 false 注册
  const [isLogin, setIsLogin] = useState(true);
  //438
  return (
    <ReadModel
      useTitle={false}
      open={loginPopup}
      onCancel={() => setLoginPopup(false)}
      {...props}
      width={730}
    >
      <div className={'loginIndex'}>
        {/*    扫码*/}
        <div className={'loginIndex_scan'}>
          <p className={'font_18'}>扫码登录</p>
          <div className={'loginIndex_scan_code'}>二维码</div>
          <p className={'cursor'}>打开看点小故事APP</p>
          <p className={'cursor'}>扫一扫即可登陆</p>
          <p className={'font_12 cursor'}>还没有{netName}APP快来下载</p>
        </div>
        {/*    登录注册*/}
        <div className={'loginIndex_box'}>
          <p className={'font_28 font_bold'}>
            {isLogin ? '登录' : '注册'}你的看点账号
          </p>
          <div className={'loginIndex_box_tip'}>
            <span>{isLogin ? '没' : '以'}有账号？</span>
            <span onClick={() => setIsLogin((val) => !val)}>
              立即{isLogin ? '注册' : '登录'}
            </span>
          </div>
          {isLogin ? <Login /> : <Register />}
          <p className={'loginIndex_box_clause'}>
            <span>
              点击 [{isLogin ? '登陆' : '下一步/注册'}] 表示已阅读同意
            </span>{' '}
            &nbsp;
            <span>服务条款</span>
          </p>
        </div>
      </div>
    </ReadModel>
  );
};
