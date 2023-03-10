import { Outlet, useSelector } from 'umi';
import React from 'react';

import './style/base.less';
import './style/common.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ConfigProvider, message, Spin } from 'antd';
import { useMounted } from '@/hook';
import { getToken, useAuth } from '@/hook/useAuth';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import EventBus from '@/common/EventBus';

import {
  Bus_ClearUserInfo,
  Bus_CloseLoading,
  Bus_OpenLogin,
  UserInfo,
} from '@/constants';
import { getStorage } from '@/common/publicFn';
import { useAsync } from '@/hook/useAsync';
import { ResponseData } from '@/common/http';
import { authorProps, loginResultProps } from '@/type/user';
import { ErrorCheck, User } from '@/common/api';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { ErrorBoundaries } from '@/components/errorBoundaries';
import { LoginPopup } from '@/components/login';

moment.locale('zh-cn');

const Index = () => {
  // 设置less zoom变量
  if (document.documentElement.clientWidth <= 1100) {
    const scale = document.documentElement.clientWidth / 1200;
    document.documentElement.style.setProperty('--app-scale', String(scale));
  }

  // 全局配置message
  message.config({
    maxCount: 1,
  });
  const { loading } = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  const { run } = useAsync<ResponseData<loginResultProps | authorProps>>();
  const { setUserInfo, setToken, setLoginPopup, setLoadingModel } = useAuth();

  const getUserInfo = async () => {
    const oldToken = getToken();
    if (!oldToken) return () => {};
    //读取本地数据
    const userInfo = getStorage(UserInfo);
    setUserInfo(userInfo);

    // const newToken = (await run(
    //     User.refreshToken(),
    // )) as ResponseData<loginResultProps>;
    // if (!ErrorCheck(newToken)) return false;
    // // 设置新token
    // await setToken(newToken.data.access_token);

    // 获取用户信息 网络获取
    const userInfoRes = (await run(
      User.getUserInfo(),
    )) as ResponseData<authorProps>;
    if (!ErrorCheck(userInfoRes)) return false;
    setUserInfo(userInfoRes.data);
  };
  useMounted(() => {
    //   注册销毁用户信息事件
    EventBus.on(Bus_ClearUserInfo, () => {
      setToken(null);
      setUserInfo(null);
    });
    EventBus.on(Bus_OpenLogin, () => {
      setLoginPopup(true);
      setToken(null);
      setUserInfo(null);
    });
    EventBus.on(Bus_CloseLoading, () => {
      setLoadingModel(false);
    });
    getUserInfo();
  });

  return (
    <div className={'webContainer'}>
      <ErrorBoundaries>
        <Spin
          spinning={loading}
          tip="数据加载中..."
          size={'large'}
          delay={200}
          className={'spinLoading'}
        />
        <ConfigProvider locale={zhCN}>
          <Outlet />
        </ConfigProvider>
        <LoginPopup />
      </ErrorBoundaries>
    </div>
  );
};
export default Index;
