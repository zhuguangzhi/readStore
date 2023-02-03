import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import {
  InfoItem,
  InfoItemListProps,
} from '@/pages/authorAdmin/components/infoItem';
import {
  modalTypes,
  ModifyInfo,
} from '@/pages/authorAdmin/components/modifyInfo';
import { useGetPersonalInfo } from '@/utils/authorAdmin/personalInfo';
import { useAuth } from '@/hook/useAuth';
import { authorPersonalProps } from '@/type/user';

const SubIcon = () => (
  <IconFont width={'37px'} height={'42px'} icon={'personal'} />
);
export default () => {
  //  基础信息
  const [baseInfoList, setBaseInfo] = useState<InfoItemListProps[]>([]);
  //  认证信息
  const [approveInfoList, setApproveInfo] = useState<InfoItemListProps[]>([]);
  // //账号安全
  // const [accountSafeList, setAccountSafe] = useState<InfoItemListProps[]>([]);
  // 信息初始化
  const initInfo = () => {
    const {
      address,
      real_name,
      qq,
      email,
      pen_name,
      id_card,
      id_card_status,
      bank_card,
      mobile,
    } = personalInfo as authorPersonalProps;
    setBaseInfo([
      {
        label: '真实姓名',
        isFinish: !!real_name,
        value: real_name || '待完善',
      },
      {
        label: '笔名',
        isFinish: personalInfo?.is_pen_name_set === 1,
        value:
          personalInfo?.is_pen_name_set === 1
            ? pen_name
            : (pen_name || '待完善') + '（修改后无法再次修改哦）',
        btnChild: (
          <span onClick={() => changeModal('pen_name')}>
            {personalInfo?.is_pen_name_set === 1 ? '' : '立即填写'}
          </span>
        ),
      },
      {
        label: 'QQ号码',
        isFinish: !!qq,
        value: qq || '待完善',
        btnChild: (
          <span onClick={() => changeModal('qq')}>
            {!!qq ? '立即修改' : '立即绑定'}
          </span>
        ),
      },
      {
        label: '电子邮箱',
        isFinish: !!email,
        value: email || '待完善',
        btnChild: (
          <span onClick={() => changeModal('email')}>
            {!!email ? '立即修改' : '立即填写'}
          </span>
        ),
      },
      {
        label: '联系地址',
        isFinish: !!address,
        value: address || '待完善',
        btnChild: (
          <span onClick={() => changeModal('address')}>
            {!!address ? '立即修改' : '立即填写'}
          </span>
        ),
      },
      {
        label: '手机号码',
        isFinish: !!mobile,
        value: !!mobile ? mobile : '待完善',
        btnChild: (
          <span onClick={() => changeModal('mobile')}>
            {!!mobile ? '' : '立即绑定'}
          </span>
        ),
      },
    ]);
    setApproveInfo([
      {
        label: '身份证号',
        isFinish: !!id_card,
        value: id_card || '待完善',
      },
      {
        label: '身份信息',
        isFinish: id_card_status === 3,
        value: id_card_status === 3 ? '已完善' : '待完善',
        btnChild:
          id_card_status !== 3 ? (
            <span onClick={() => changeModal('id_card')}>立即绑定</span>
          ) : (
            <></>
          ),
      },
      {
        label: '银行卡信息',
        isFinish: !!bank_card,
        value: bank_card || '待完善',
        btnChild: (
          <span onClick={() => changeModal('bank_card')}>
            {!!bank_card ? '查看信息' : '前往认证'}
          </span>
        ),
      },
    ]);
    // setAccountSafe([
    //   {
    //     label: '登陆密码',
    //     isFinish: is_password_set === 1,
    //     value: is_password_set === 1 ? '已绑定' : '待完善',
    //     btnChild: (
    //       <span onClick={() => changeModal('is_password_set')}>
    //         {is_password_set !== 1 ? '立即设置' : '前往修改'}
    //       </span>
    //     ),
    //   },
    //   {
    //     label: '手机号码',
    //     isFinish: !!mobile,
    //     value: !!mobile ? mobile : '待完善',
    //     btnChild: (
    //       <span onClick={() => changeModal('mobile')}>
    //         {!!mobile ? '' : '立即绑定'}
    //       </span>
    //     ),
    //   },
    // ]);
  };
  //指定弹窗类型
  const [modalType, setModalType] = useState<modalTypes>('qq');
  //展示弹窗
  const [openModal, setOpen] = useState(false);
  // 获取个人信息
  const { data: personalInfo, isLoading: personalLoading } =
    useGetPersonalInfo();
  const { setLoadingModel } = useAuth();

  //打开弹窗
  const changeModal = (val: modalTypes) => {
    setOpen(true);
    setModalType(val);
  };

  useEffect(() => {
    if (!personalInfo) return;
    initInfo();
  }, [personalInfo]);
  useEffect(() => {
    setLoadingModel(personalLoading);
  }, [personalLoading]);
  return (
    <div>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'个人信息'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container'}>
        <InfoItem title={'基础信息'} list={baseInfoList} />
        <InfoItem title={'认证信息'} list={approveInfoList} />
        {/*<InfoItem title={'账号安全'} list={accountSafeList} />*/}
      </div>
      {/*信息修改弹窗*/}
      <ModifyInfo
        open={openModal}
        onCancel={() => setOpen(false)}
        isFinish={!!(personalInfo?.[modalType] || false)}
        type={modalType}
        defaultValue={personalInfo?.[modalType] || ''}
      />
    </div>
  );
};
