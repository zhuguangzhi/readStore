import { Outlet } from 'umi';
import React, { useEffect, useState } from 'react';

import './style/base.less';
import './style/common.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Spin } from 'antd';
import { ConnectState } from '@/models/modelConnect';
import { connect } from '@umijs/max';
import { globalState } from '@/models/global';

const Index = ({ global }: { global: globalState }) => {
  const queryClient = new QueryClient();
  const [loading, setLoading] = useState(global.loading);
  useEffect(() => {
    setLoading(global.loading);
  }, [global?.loading]);
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
