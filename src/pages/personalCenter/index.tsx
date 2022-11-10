import React, { useState } from 'react';
import { authorProps } from '@/type/user';
import { IconFont } from '@/components/IconFont';

import './style/index.less';
import { netName } from '@/assets/config';
import { useSetState } from '@/hook';
import { Outlet } from 'react-router';

export const PersonalCenter = () => {
  const [state, setState] = useState({
    userInfo: {
      name: '读点小故事',
      id: 1234567890,
      mobile: 18720427542,
    } as authorProps, //用户信息
    sideMenuList: [
      { key: 'bookShelf', label: '我的书架', icon: 'bookShelf' },
      { key: 'comment', label: '我的评论', icon: 'message' },
      { key: 'notice', label: '系统通知', icon: 'tongzhi' },
    ], //菜单项
    currentMenuKey: 'bookShelf', //当前菜单选中项
  });
  const changeState = useSetState(state, setState);
  return (
    <div className={'personal'}>
      {/*    面包屑*/}
      <div className={'personal_breadcrumb'}>
        <span>当前位置：</span>
        <span className={'cursor'}>
          {netName}
          {'>'}
        </span>
        <span className={'cursor'}>个人中心</span>
      </div>
      {/*   侧边栏*/}
      <div className={'personal_side'}>
        {/*用户信息*/}
        <div className={'user_info'}>
          <img
            className={'user_info_photo'}
            src={require('../../assets/test/personPhoto.png')}
            alt=""
          />
          <p className={'user_info_name'}>{state.userInfo.name}</p>
          <p>ID：{state.userInfo.id}</p>
          <p>手机：{state.userInfo.mobile}</p>
        </div>
        {/*    菜单项*/}
        <div className={'menu'}>
          {state.sideMenuList.map((menu) => {
            return (
              <div
                className={`menu_item ${
                  menu.key === state.currentMenuKey ? 'menuSelect' : ''
                }`}
                key={menu.key}
                onClick={() => changeState({ currentMenuKey: menu.key })}
              >
                <IconFont width={'19px'} height={'19px'} icon={menu.icon} />
                <span>{menu.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/*    内容*/}
      <main className={'personal_container'}>
        <Outlet />
      </main>
    </div>
  );
};

export default PersonalCenter;
