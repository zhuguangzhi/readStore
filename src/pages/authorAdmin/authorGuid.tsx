import React, { useEffect } from 'react';
import './style/authorGuid.less';
import { netName } from '../../../public/config';
import { Properties } from 'csstype';
import { useAsync } from '@/hook/useAsync';
import { ResponseData } from '@/common/http';
import { ErrorCheck, User } from '@/common/api';
import router from '@/hook/url';
import { Button, message } from 'antd';
import { useAuth } from '@/hook/useAuth';

const homeZoom = document.documentElement.clientWidth / 1920;
export default () => {
  const { userInfo } = useAuth();
  const { run, isLoading } = useAsync<ResponseData<{}>>();
  // 申请成为作者
  const onApplyAuthor = async () => {
    const res = await run(User.applyAuthor());
    if (!ErrorCheck(res)) return;
    router.push('admin/home');
  };
  useEffect(() => {
    if (!userInfo || userInfo.is_author === 2) return;
    message.warn('您已成为作者');
    router.push('home');
  }, [userInfo]);
  return (
    <div
      className={'authorGuid'}
      style={
        {
          zoom: homeZoom,
          transformOrigin: 'left top',
          MozTransform: `scale(${homeZoom})`,
          height: document.documentElement.clientHeight / homeZoom,
        } as Properties<string | number, string & {}>
      }
    >
      <div className={'authorGuid_left'}>
        <div className={'authorGuid_left_welcome SYBold'}>
          <p>欢迎</p>
          <p>成为{netName}作者</p>
        </div>
        <p className={'authorGuid_left_desc'}>
          万家灯火，总有一盏为你而留；在这里，我们一起写出心中的故事，温暖世间无数座城市！
        </p>
        <Button
          loading={isLoading}
          className={'authorGuid_left_btn'}
          onClick={onApplyAuthor}
        >
          成为作者
        </Button>
      </div>
      <div className={'authorGuid_right'}>
        <img
          className={'authorGuid_right_back'}
          src={require('@/assets/image/admin/applyAuthorBanner.png')}
          alt=""
        />
        <img
          className={'authorGuid_right_book'}
          src={require('@/assets/image/admin/authorGuid.png')}
          alt=""
        />
      </div>
    </div>
  );
};
