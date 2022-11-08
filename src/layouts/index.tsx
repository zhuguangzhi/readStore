import { Outlet } from 'umi';
import React from 'react';

import './style/base.less';
import './style/common.less';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default () => {
  return (
    <div className={'webContainer'}>
      <Outlet />
    </div>
  );
};
