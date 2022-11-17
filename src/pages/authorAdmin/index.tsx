import React, { useEffect, useState } from 'react';
import './style/index.less';
import router, { useGetUrlPath } from '@/hook/url';
import { Outlet } from 'react-router';

type operationProps = {
  label: string;
  key: string;
};
//缩放
export const homeZoom = document.documentElement.clientWidth / 1920;
// export const homeZoom = 1;
export default () => {
  const routerInfo = useGetUrlPath();
  // 侧边栏选项
  const adminOperationList: operationProps[] = [
    { key: 'home', label: '首页' },
    { key: 'works', label: '作品管理' },
    { key: 'income', label: '收入查询' },
    { key: 'message', label: '消息通知' },
    { key: 'comment', label: '评论管理' },
    { key: 'contract', label: '我的合同' },
    { key: 'personalInfo', label: '个人信息' },
  ];
  const [currentOperate, setOperate] = useState('home');

  //路由调转
  const onOperateChange = (info: operationProps) => {
    setOperate(info.key);
    router.push(`/admin/${info.key}`);
  };

  useEffect(() => {
    if (routerInfo.length > 0) setOperate(routerInfo[routerInfo.length - 1]);
  }, [routerInfo.length]);

  // 首页缩放为1980
  return (
    <div className={'author_admin'} style={{ zoom: homeZoom }}>
      {/*    banner*/}
      <p
        className={`author_admin_back  ${
          currentOperate === 'home' ? 'banner' : ''
        }`}
      ></p>
      <div
        className={'flex'}
        style={{ marginTop: '-310px', minHeight: '100%' }}
      >
        {/*side*/}
        <div className={'author_admin_side'}>
          {/*    用户信息*/}
          <div className={'user_info'}>
            {/*TODO:对接修改用户信息*/}
            <div className={'user_info_box'}>
              <img
                className={'user_info_box_img'}
                src={require('@/assets/test/personPhoto.png')}
                alt=""
              />
            </div>
            <p className={'font_16'}>如若</p>
            <p className={'font_14'}>ID: 12345678900</p>
          </div>
          {/*    侧边栏*/}
          <div className={'author_admin_side_box'}>
            {adminOperationList.map((item) => {
              return (
                <div
                  key={item.key}
                  className={`author_admin_side_item ${
                    currentOperate === item.key ? 'itemSelect' : ''
                  }`}
                  onClick={() => onOperateChange(item)}
                >
                  <p>{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/*  右侧内容  */}
        <div
          className={`${
            currentOperate !== 'home' ? 'author_admin_box' : ''
          } author_admin_container`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
