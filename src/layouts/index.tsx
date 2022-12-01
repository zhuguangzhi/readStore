import { Outlet } from 'umi';
import React, { useEffect, useState } from 'react';

import './style/base.less';
import './style/common.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { message, Spin } from 'antd';
import { ConnectState } from '@/models/modelConnect';
import { connect } from '@umijs/max';
import { globalState } from '@/models/global';
import { useMounted } from '@/hook';
import { getToken, useAuth } from '@/hook/useAuth';
import { useAsync } from '@/hook/useAsync';
import { ResponseData } from '@/common/http';
import { authorProps, loginResultProps } from '@/type/user';
import { ErrorCheck, User } from '@/common/api';

const Index = ({ global }: { global: globalState }) => {
  // 全局配置message
  message.config({
    maxCount: 1,
  });
  const queryClient = new QueryClient();
  // 全局loading
  const [loading, setLoading] = useState(global.loading);
  const { run } = useAsync<ResponseData<loginResultProps | authorProps>>();
  const { setUserInfo, setToken } = useAuth();

  useEffect(() => {
    setLoading(global.loading);
  }, [global?.loading]);
  useMounted(() => {
    //    获取token 实现自动登录
    const token = getToken();
    if (!token) return () => {};
    (async () => {
      // 刷新Token
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
    })();
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Spin spinning={loading} tip="数据加载中..." size={'large'} delay={200}>
        <div className={'webContainer'}>
          <Outlet />
        </div>
      </Spin>
    </QueryClientProvider>
  );
};
export default connect(({ global }: ConnectState) => ({ global }))(Index);
