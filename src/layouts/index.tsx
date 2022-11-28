import { Outlet } from 'umi';
import React, { useState } from 'react';

import './style/base.less';
import './style/common.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Spin } from 'antd';
export default () => {
  const queryClient = new QueryClient();
  const [loading] = useState(false);

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
