import React, { useEffect, useState } from 'react';
import { ReadModel } from '@/components/module/ReadModel';
import { ReadStep, stepItemsProps } from '@/components/module/ReadStep';
import { Button, Form, ModalProps } from 'antd';
import { Identity } from '@/pages/authorAdmin/components/verify/identity';
import { MobileVerify } from '@/pages/authorAdmin/components/verify/mobileVerify';
import { BankVerify } from '@/pages/authorAdmin/components/verify/bankVerify';
import { BindInput } from '@/pages/authorAdmin/components/verify/bindInput';
import { PasswordVerify } from '@/pages/authorAdmin/components/verify/passwordVerify';

export type modalTypes =
  | 'qq'
  | 'email'
  | 'identity'
  | 'bankCard'
  | 'password'
  | 'modifyMobile';

interface ModifyInfoProps extends ModalProps {
  isFinish: boolean;
  onCancel: () => void;
  type: modalTypes; //弹窗类型
}
//弹窗标题
const titleList: { [key in modalTypes]: string } = {
  qq: 'QQ',
  email: '邮箱',
  identity: '身份信息',
  bankCard: '银行卡信息',
  password: '密码',
  modifyMobile: '手机号',
};
// 银行卡认证 身份证认证使用的button的文案
const identityText = ['下一步', '实名认证', '关闭'];
// 其余类型使用的文案
const otherText = ['下一步', '下一步', '关闭'];

export const ModifyInfo = ({
  isFinish,
  onCancel,
  type,
  ...props
}: ModifyInfoProps) => {
  // 步骤1 form实例
  const stepOneForm = Form.useFormInstance();
  // 步骤2 form实例
  const stepTwoForm = Form.useFormInstance();
  // qq
  const qqItems: stepItemsProps[] = [
    { label: '手机号码验证', stepElement: <MobileVerify form={stepOneForm} /> },
    {
      label: '填写QQ号',
      stepElement: <BindInput label={'QQ号'} form={stepTwoForm} />,
    },
    { label: '填写完成', stepElement: <span></span> },
  ];
  // email
  const emailItems: stepItemsProps[] = [
    { label: '手机号码验证', stepElement: <MobileVerify form={stepOneForm} /> },
    {
      label: '填写邮箱地址',
      stepElement: <BindInput label={'邮箱地址'} form={stepTwoForm} />,
    },
    { label: '填写完成', stepElement: <span></span> },
  ];
  // identity
  const identityItems: stepItemsProps[] = [
    { label: '手机号码验证', stepElement: <MobileVerify form={stepOneForm} /> },
    {
      label: '填写身份证信息',
      stepElement: <Identity isFinish={isFinish} form={stepTwoForm} />,
    },
    { label: '填写完成', stepElement: <span></span> },
  ];
  // bankCard
  const bankCardItems: stepItemsProps[] = [
    { label: '手机号码验证', stepElement: <MobileVerify form={stepOneForm} /> },
    { label: '填写银行卡信息', stepElement: <BankVerify form={stepTwoForm} /> },
    { label: '填写完成', stepElement: <span></span> },
  ];
  // password
  const passwordItems: stepItemsProps[] = [
    { label: '手机号码验证', stepElement: <MobileVerify form={stepOneForm} /> },
    {
      label: '填写身份证信息',
      stepElement: <PasswordVerify form={stepTwoForm} />,
    },
    { label: '填写完成', stepElement: <span></span> },
  ];
  // modifyMobile
  const modifyMobileItems: stepItemsProps[] = [
    { label: '手机号码验证', stepElement: <MobileVerify form={stepOneForm} /> },
    {
      label: '填写身份证信息',
      stepElement: <MobileVerify useMobileInput={true} form={stepTwoForm} />,
    },
    { label: '填写完成', stepElement: <span></span> },
  ];
  // 每种类型的步骤
  const allTypeStep: { [key in modalTypes]: stepItemsProps[] } = {
    qq: qqItems,
    email: emailItems,
    identity: identityItems,
    bankCard: bankCardItems,
    password: passwordItems,
    modifyMobile: modifyMobileItems,
  };

  const [currentStep, setStep] = useState<number>(1);
  const [btnText, setBtnText] = useState<string[]>([]);

  //弹窗关闭
  const modalClose = (step: number = 1) => {
    if (currentStep === allTypeStep[type].length) setStep(step);
    onCancel();
  };

  //监听弹窗改变
  useEffect(() => {
    if (['identity', 'bankCard'].includes(type)) setBtnText(identityText);
    else setBtnText(otherText);
  }, [type]);

  const onConfirm = () => {
    if (currentStep < allTypeStep[type].length) setStep(currentStep + 1);
    else modalClose(2);
  };

  return (
    <ReadModel
      width={800}
      useTitle={true}
      title={isFinish ? `修改` : `绑定` + titleList[type]}
      onCancel={() => modalClose(currentStep > 1 ? 2 : 1)}
      {...props}
    >
      <>
        <ReadStep stepItems={allTypeStep[type]} currentStep={currentStep} />
        <Button
          className={'readModal_footerBtn'}
          shape="round"
          type={'primary'}
          onClick={onConfirm}
          style={{ marginBottom: '76px' }}
        >
          {btnText[currentStep - 1]}
        </Button>
      </>
    </ReadModel>
  );
};
