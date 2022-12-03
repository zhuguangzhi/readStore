import { Outlet, useSelector } from 'umi';
import React from 'react';

import './style/base.less';
import './style/common.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { message, Spin } from 'antd';
import { useMounted } from '@/hook';
import { getToken, useAuth } from '@/hook/useAuth';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import EventBus from '@/common/EventBus';

import { Bus_ClearUserInfo, UserInfo } from '@/constants';
import { getStorage } from '@/common/publicFn';

const Index = () => {
  // 全局配置message
  message.config({
    maxCount: 1,
  });
  const { loading } = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  // const { run } = useAsync<ResponseData<loginResultProps | authorProps>>();
  const { setUserInfo, setToken } = useAuth();

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
    // // 获取用户信息 网络获取
    // const userInfoRes = (await run(
    //     User.getUserInfo(),
    // )) as ResponseData<authorProps>;
    // if (!ErrorCheck(userInfoRes)) return false;
    // setUserInfo(userInfoRes.data);
  };
  const clearUserInfo = () => {
    setToken(null);
    setUserInfo(null);
  };

  useMounted(() => {
    //   注册销毁用户信息事件
    EventBus.on(Bus_ClearUserInfo, clearUserInfo);
    getUserInfo();

    //  http请求中拿token
    // EventBus.on(Bus_GetToken, ()=>{
    //   return token
    // });
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
