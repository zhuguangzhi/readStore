import { Outlet, useSelector } from 'umi';
import React, { useState } from 'react';

import './style/base.less';
import './style/common.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { message, Spin } from 'antd';
import { useMounted } from '@/hook';
import { getToken, useAuth } from '@/hook/useAuth';
import { useAsync } from '@/hook/useAsync';
import { ResponseData } from '@/common/http';
import { authorProps, loginResultProps } from '@/type/user';
import { ErrorCheck, User } from '@/common/api';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import EventBus from '@/common/EventBus';

import { Bus_ClearUserInfo } from '@/constants';

const Index = () => {
  // 全局配置message
  message.config({
    maxCount: 1,
  });
  const { loading } = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  const { run } = useAsync<ResponseData<loginResultProps | authorProps>>();
  const { setUserInfo, setToken } = useAuth();
  const [token] = useState(getToken());

  const getUserInfo = async () => {
    //    获取token 实现自动登录
    if (!token) return () => {};
    const newToken = (await run(
      User.refreshToken(),
    )) as ResponseData<loginResultProps>;
    if (!ErrorCheck(newToken)) return false;
    // 设置新token
    setToken(newToken.data.access_token);
    // 获取用户信息
    const userInfo = (await run(
      User.getUserInfo(),
    )) as ResponseData<authorProps>;
    if (!ErrorCheck(userInfo)) return false;
    setUserInfo(userInfo.data);
  };
  const clearUserInfo = () => {
    setToken(null);
    setUserInfo(null);
  };

  useMounted(() => {
    getUserInfo();
    //   注册销毁用户信息事件
    EventBus.on(Bus_ClearUserInfo, clearUserInfo);
  });
  return (
    <Spin spinning={loading} tip="数据加载中..." size={'large'} delay={200}>
      <div className={'webContainer'}>
        <Outlet />
      </div>
    </Spin>
  );
};
export default Index;
