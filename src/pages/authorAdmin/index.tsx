import React, { useEffect, useState } from 'react';
import './style/index.less';
import router, { useGetUrlPath } from '@/hook/url';
import { Outlet } from 'react-router';
import { useAuth } from '@/hook/useAuth';
import { Properties } from 'csstype';

type operationProps = {
  label: string;
  key: string;
};
//缩放
export const homeZoom = document.documentElement.clientWidth / 1920;
// export const homeZoom = 1;
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
export default () => {
  const routerInfo = useGetUrlPath();
  // 用户信息
  const { userInfo } = useAuth();

  const [currentOperate, setOperate] = useState('home');

  //路由调转
  const onOperateChange = (info: operationProps) => {
    setOperate(info.key);
    router.push(`/admin/${info.key}`);
  };

  useEffect(() => {
    if (routerInfo.length > 0) setOperate(routerInfo[2]);
  }, [routerInfo.length]);

  // 首页缩放为1980
  // style={{
  //   transform:`scale(${homeZoom})`,
  //       transformOrigin:"left top",
  //       height:document.documentElement.clientHeight/homeZoom
  // }}

  return (
    <div
      className={'author_admin'}
      style={
        {
          zoom: homeZoom,
          transformOrigin: 'left top',
          MozTransform: `scale(${homeZoom})`,
          height: document.documentElement.clientHeight / homeZoom,
        } as Properties<string | number, string & {}>
      }
    >
      <p
        className={`author_admin_back  ${
          currentOperate === 'home' ? 'banner' : 'banner2'
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
            <div className={'user_info_box'}>
              <img
                className={'user_info_box_img'}
                src={userInfo?.user_image_url}
                alt=""
              />
            </div>
            <p className={'font_16'}>
              {userInfo?.pen_name || userInfo?.nickname || userInfo?.name}
            </p>
            <p className={'font_14'}>ID: {userInfo?.id}</p>
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
                  <img
                    src={require(`@/assets/image/admin/${item.key}${
                      currentOperate === item.key ? '_select' : ''
                    }.png`)}
                    className={`${
                      currentOperate === item.key
                        ? 'author_admin_side_item_imgSelect'
                        : ''
                    }`}
                    alt=""
                  />
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
          style={{
            height:
              currentOperate !== 'home' ? `calc(100vh/${homeZoom} - 65px)` : '',
          }}
        >
          {/*<QueryClientProvider client={queryClient}>*/}
          <Outlet />
          {/*</QueryClientProvider>*/}
        </div>
      </div>
    </div>
  );
};
