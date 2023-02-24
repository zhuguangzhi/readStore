import React from 'react';
import { Input, message, Popover } from 'antd';

import { IconFont } from '@/components/IconFont';
import { inputEvent } from '@/type';
import { logoUrl } from '../../public/config';
import router, { useGetUrlPath } from '@/hook/url';
import './style/header.less';
import { clearToken, useAuth } from '@/hook/useAuth';
import { SearchKey } from '@/constants/url';
import { useAsync } from '@/hook/useAsync';
import { ErrorCheck, User } from '@/common/api';
import { ResponseData } from '@/common/http';
import { ReadModel } from '@/components/module/ReadModel';
import { Membership } from '@/components/Membership';
import { useDispatch } from 'umi';
import { useSelector } from '@@/exports';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';

const SearchIcon = () => (
  <IconFont
    width={'13px'}
    height={'13px'}
    icon={'search'}
    color={'var(--themeColor)'}
  />
);
const Header = () => {
  const { userInfo, setLoginPopup } = useAuth();
  const { run } = useAsync<ResponseData<{}>>();
  const routerPath = useGetUrlPath();
  const dispatch = useDispatch();
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  //路由选项跳转
  const optionList = [
    { title: '首页', key: '' },
    { title: '书库', key: 'books' },
    { title: '排行', key: 'bookRank' },
    { title: '作者专区', key: 'admin/home' },
  ];

  // 搜索框事件
  const onSearch = (e: inputEvent) => {
    window.onkeyup = (ev) => {
      const value = e.target.value;
      if (ev.key === 'Enter' && value) {
        router.push('/books', { [SearchKey]: value });
      }
    };
  };
  // 打开关闭vip弹窗
  const controlVipModel = (open: boolean) => {
    dispatch({
      type: 'global/setVipModel',
      payload: open,
    });
  };
  // 页面跳转
  const routerToPush = (key: string) => {
    if (key !== 'admin/home') {
      router.push('/' + key);
      return;
    }
    if (!userInfo) {
      message.error('您还未登陆，请先登陆');
      return;
    }
    // 是否已经成为作者
    if (userInfo.is_author === 1) {
      // 作者后台
      router.push('/' + key, {}, true);
      return;
    }
    // 作者引导页
    router.push('/authorGuid', {}, true);
  };

  const SearchInput = () => {
    return (
      <Input
        className={'searchInput'}
        autoComplete="off"
        placeholder="按下回车进行搜索"
        suffix={<SearchIcon />}
        onChange={onSearch}
      />
    );
  };
  // 用户卡片
  const UserCard = () => {
    const logout = async () => {
      const hide = message.loading('退出中');
      const res = await run(User.logout());
      if (!ErrorCheck(res)) return;
      hide();
      clearToken();
    };
    return (
      <div className={'header_card'}>
        {/*    上部分*/}
        <div className={'header_card_top'}>
          {/* 头*/}
          <div className={'header_card_top_title'}>
            <div className={'flex flex_align'}>
              <img src={userInfo?.user_image_url} alt="" />
              <span className={'font_14'}>{userInfo?.nickname}</span>
              <img
                className={'header_card_top_title_vipLogo'}
                src={require(`@/assets/image/home/${
                  userInfo?.is_vip === 1 ? 'vip' : 'noVip'
                }.png`)}
                alt=""
              />
            </div>
            <p className={'cursor font_14'} onClick={logout}>
              退出
            </p>
          </div>
          {/*    充值*/}
          <div className={'header_card_top_vipPay'}>
            <div className={'header_card_top_vipPay_info'}>
              <img src={require('@/assets/image/home/vipSign.png')} alt="" />
              <span className={'font_12'}>
                {userInfo?.vip_expire_time
                  ? `您的会员将在${userInfo.vip_expire_time}到期`
                  : '您还不是会员'}
              </span>
            </div>
            <div
              className={'header_card_top_vipPay_btn'}
              onClick={() => controlVipModel(true)}
            >
              {userInfo?.is_vip === 1 ? '立即续费' : '开通会员'}
            </div>
          </div>
        </div>
        {/*    脚*/}
        <div className={'header_card_footer'}>
          <div
            className={'header_card_footer_item'}
            onClick={() => router.push('/personal/userInfo')}
          >
            <IconFont width={'22px'} height={'22px'} icon={'user'} />
            <p>个人中心</p>
          </div>
          <div
            className={'header_card_footer_item'}
            onClick={() => router.push('/personal/bookShelf')}
          >
            <IconFont width={'20px'} height={'21px'} icon={'icon_shujianor'} />
            <p>我的书架</p>
          </div>
          <div
            className={'header_card_footer_item'}
            onClick={() => router.push('/personal/topicShelf')}
          >
            <IconFont width={'22px'} height={'22px'} icon={'myTopic'} />
            <p>话题书架</p>
          </div>
          <div
            className={'header_card_footer_item'}
            onClick={() => router.push('/personal/comment')}
          >
            <IconFont width={'22px'} height={'22px'} icon={'comment'} />
            <p>我的评论</p>
          </div>
          <div
            className={'header_card_footer_item'}
            onClick={() => router.push('/personal/notice')}
          >
            <IconFont width={'22px'} height={'22px'} icon={'tip'} />
            <p>系统通知</p>
          </div>
        </div>
      </div>
    );
  };
  // 用户信息
  const UserInfoChildren = () => {
    return (
      <div className={'header_user'} id={'userInfoHeader'}>
        <IconFont
          className={'cursor'}
          width={'26px'}
          height={'21px'}
          icon={'xin'}
          onClick={() => router.push('/personal/notice')}
        />
        <Popover
          placement="bottomLeft"
          trigger={'click'}
          content={<UserCard />}
          getPopupContainer={() =>
            document.getElementById('userInfoHeader') as HTMLDivElement
          }
        >
          <img
            // onClick={() => router.push('/personal/bookShelf')}
            className={'cursor'}
            src={userInfo?.user_image_url}
            alt=""
          />
          <img
            className={'header_user_vipIcon'}
            src={require(`@/assets/image/home/${
              userInfo?.is_vip === 1 ? 'vip' : 'noVip'
            }.png`)}
            alt=""
          />
        </Popover>
      </div>
    );
  };
  // 登陆
  const LoginBoxChildren = () => {
    return (
      <div className={'header_user cursor'} onClick={() => setLoginPopup(true)}>
        <IconFont
          icon={'user'}
          width={'19px'}
          height={'19px'}
          marginRight={'4px'}
        />
        <span className={'font_14 color_61'}>登录</span>
      </div>
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
                routerPath[1] === item.key ? 'selectOption' : ''
              }`}
              onClick={() => routerToPush(item.key)}
            >
              {item.title}
            </span>
          );
        })}
        {/*搜索框*/}
        <SearchInput />

        {/*    用户信息*/}
        {userInfo ? <UserInfoChildren /> : <LoginBoxChildren />}
      </div>
      <ReadModel
        className={'header_model'}
        useTitle={false}
        open={globalState.openVipModel}
        width={'640px'}
        onCancel={() => controlVipModel(false)}
      >
        <Membership />
      </ReadModel>
    </div>
  );
};
export default Header;
