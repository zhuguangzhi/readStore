import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import { useSetState } from '@/hook';
import { IconFont } from '@/components/IconFont';
import { inputEvent } from '@/type';
import { logoUrl } from '@/assets/config';
import router, { useGetUrlPath } from '@/hook/url';

import './style/header.less';

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
        {/*    信息*/}
        <IconFont
          className={'cursor'}
          width={'26px'}
          height={'21px'}
          icon={'xin'}
          onClick={() => router.push('/personal/notice')}
        />
        <div className={'header_user'}>
          <img
            onClick={() => router.push('/personal/bookShelf')}
            className={'cursor'}
            src={require('../assets/test/personPhoto.png')}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
