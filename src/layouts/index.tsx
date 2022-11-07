import './style/base.less';
import './style/common.less';
import { Outlet } from 'umi';
import React from 'react';
export default () => {
  return (
    <div className={'webContainer'}>
      <Outlet />
    </div>
  );
};
