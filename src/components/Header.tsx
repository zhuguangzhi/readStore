import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import { useSetState } from '@/hook';
import { IconFont } from '@/components/IconFont';
import { inputEvent } from '@/type';
import { logoUrl } from '@/assets/config';
import router, { useGetUrlPath } from '@/hook/url';

import './style/header.less';
import { LoginPopup } from '@/components/login';

const SearchIcon = () => (
  <IconFont width={'13px'} height={'13px'} icon={'sousuo'} />
);
const Header = () => {
  const routerInfo = useGetUrlPath();
  //路由选项跳转
  const optionList = [
    { title: '首页', key: 'home' },
    { title: '书库', key: 'books' },
    { title: '排行', key: 'bookRank' },
    { title: '作者专区', key: 'admin/home' },
  ];
  const [state, setState] = useState({
    currentOptionKey: '' as string, //当前选中的option
    openLogin: false, //登录弹窗
  });
  //调用该hook改变state
  const changeState = useSetState(state, setState);

  useEffect(() => {
    changeState({ currentOptionKey: routerInfo[1] });
  }, [routerInfo[1]]);

  // 搜索框事件
  const onSearch = (e: inputEvent) => {
    console.log(' e.target.value', e.target.value);
  };

  const SearchInput = () => {
    return (
      <Input
        className={'searchInput'}
        autoComplete="off"
        placeholder="搜索"
        suffix={<SearchIcon />}
        onChange={onSearch}
      />
    );
  };

  return (
    <div className={'header'}>
      <img className={'header_logo cursor'} src={logoUrl} alt="logo" />
      <div className={'header_item'}>
        {optionList.map((item) => {
          return (
            <span
              key={item.key}
              className={`option ${
                state.currentOptionKey === item.key ? 'selectOption' : ''
              }`}
              onClick={() => {
                changeState({ currentOptionKey: item.key });
                router.push('/' + item.key);
              }}
            >
              {item.title}
            </span>
          );
        })}
        {/*搜索框*/}
        <div>
          <SearchInput />
        </div>

        {/*    用户信息*/}
        <div
          className={'header_user cursor'}
          onClick={() => changeState({ openLogin: true })}
        >
          <IconFont
            icon={'user'}
            width={'19px'}
            height={'19px'}
            marginRight={'4px'}
          />
          <span className={'font_14 color_61'}>登录</span>
        </div>

        {/*<div className={'header_user'}>*/}
        {/*  <IconFont*/}
        {/*      className={'cursor'}*/}
        {/*      width={'26px'}*/}
        {/*      height={'21px'}*/}
        {/*      icon={'xin'}*/}
        {/*      onClick={() => router.push('/personal/notice')}*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    onClick={() => router.push('/personal/bookShelf')}*/}
        {/*    className={'cursor'}*/}
        {/*    src={require('../assets/test/personPhoto.png')}*/}
        {/*    alt=""*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
      <LoginPopup
        open={state.openLogin}
        onCancel={() => changeState({ openLogin: false })}
      />
    </div>
  );
};
export default Header;
