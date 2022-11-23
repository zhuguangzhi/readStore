import React, { useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import {
  InfoItem,
  InfoItemListProps,
} from '@/pages/authorAdmin/components/infoItem';
import { useMounted } from '@/hook';
import {
  modalTypes,
  ModifyInfo,
} from '@/pages/authorAdmin/components/modifyInfo';

const SubIcon = () => (
  <IconFont width={'37px'} height={'42px'} icon={'personal'} />
);
export default () => {
  //  基础信息
  const [baseInfoList, setBaseInfo] = useState<InfoItemListProps[]>([]);
  //  认证信息
  const [approveInfoList, setApproveInfo] = useState<InfoItemListProps[]>([]);
  //账号安全
  const [accountSafeList, setAccountSafe] = useState<InfoItemListProps[]>([]);
  // 信息初始化 TODO:对接时参数修改，这里为测试
  const initInfo = (finish: boolean) => {
    setBaseInfo([
      {
        label: '真实姓名',
        isFinish: false,
        value: '待完善',
      },
      {
        label: 'QQ号码',
        isFinish: false,
        value: '待完善',
        btnChild: (
          <span onClick={() => changeModal('qq')}>
            {finish ? '立即修改' : '立即绑定'}
          </span>
        ),
      },
      {
        label: '电子邮箱',
        isFinish: false,
        value: '待完善',
        btnChild: (
          <span onClick={() => changeModal('email')}>
            {finish ? '立即修改' : '立即填写'}
          </span>
        ),
      },
    ]);
    setApproveInfo([
      {
        label: '身份证号',
        isFinish: false,
        value: '待完善',
      },
      {
        label: '身份信息',
        isFinish: false,
        value: '待完善',
        btnChild: !finish ? (
          <span onClick={() => changeModal('identity')}>立即绑定</span>
        ) : (
          <>
            <span>查看信息</span>
            <span>前往修改</span>
          </>
        ),
      },
      {
        label: '银行卡信息',
        isFinish: false,
        value: '待完善',
        btnChild: (
          <span onClick={() => changeModal('bankCard')}>
            {finish ? '立即修改' : '前往认证'}
          </span>
        ),
      },
    ]);
    setAccountSafe([
      {
        label: '登陆密码',
        isFinish: false,
        value: '待完善',
        btnChild: (
          <span onClick={() => changeModal('password')}>
            {finish ? '立即设置' : '前往修改'}
          </span>
        ),
      },
      {
        label: '手机号码',
        isFinish: false,
        value: '待完善',
        btnChild: (
          <span onClick={() => changeModal('modifyMobile')}>
            {finish ? '立即修改' : '立即绑定'}
          </span>
        ),
      },
    ]);
  };
  //指定弹窗类型
  const [modalType, setModalType] = useState<modalTypes>('qq');
  //展示弹窗
  const [openModal, setOpen] = useState(false);

  //打开弹窗
  const changeModal = (val: modalTypes) => {
    setOpen(true);
    setModalType(val);
  };

  useMounted(() => {
    initInfo(false);
  });
  return (
    <div>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'个人信息'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container'}>
        <InfoItem title={'基础信息'} list={baseInfoList} />
        <InfoItem title={'认证信息'} list={approveInfoList} />
        <InfoItem title={'账号安全'} list={accountSafeList} />
      </div>
      {/*信息修改弹窗*/}
      <ModifyInfo
        open={openModal}
        onCancel={() => setOpen(false)}
        isFinish={false}
        type={modalType}
      />
    </div>
  );
};
