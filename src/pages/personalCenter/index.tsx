import React, { useEffect, useState } from 'react';
import { IconFont } from '@/components/IconFont';

import './style/index.less';
import { netName } from '../../../public/config';
import { useSetState } from '@/hook';
import { Outlet } from 'react-router';
import router, { useGetUrlPath } from '@/hook/url';
import { getToken, useAuth } from '@/hook/useAuth';

export const PersonalCenter = () => {
  //获取当前路由信息
  const routeInfo = useGetUrlPath();
  const { userInfo } = useAuth();
  const [state, setState] = useState({
    sideMenuList: [
      { key: 'bookShelf', label: '我的书架', icon: 'bookShelf' },
      { key: 'topicShelf', label: '话题书架', icon: 'topic' },
      { key: 'comment', label: '我的评论', icon: 'message' },
      { key: 'notice', label: '系统通知', icon: 'tongzhi' },
      { key: 'password', label: '修改密码', icon: 'password' },
    ], //菜单项
    currentMenuKey: 'bookShelf', //当前菜单选中项
  });
  const changeState = useSetState(state, setState);
  //路由跳转
  const onChangeRoute = (menu: typeof state.sideMenuList[0]) => {
    changeState({ currentMenuKey: menu.key });
    router.push('/personal/' + menu.key);
  };

  useEffect(() => {
    if (!getToken()) router.push('/home');
  }, [userInfo]);
  useEffect(() => {
    if (routeInfo) changeState({ currentMenuKey: routeInfo[2] });
  }, [routeInfo[2]]);

  return (
    <div className={'personal'}>
      {/*    面包屑*/}
      <div className={'personal_breadcrumb'}>
        <span>当前位置：</span>
        <span className={'cursor'} onClick={() => router.push('/home')}>
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
            src={userInfo?.user_image_url}
            alt=""
          />
          <p className={'user_info_name'}>{userInfo?.nickname}</p>
          {/*<p>ID：{userInfo?.id}</p>*/}
          <p>手机：{userInfo?.mobile}</p>
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
                onClick={() => onChangeRoute(menu)}
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
