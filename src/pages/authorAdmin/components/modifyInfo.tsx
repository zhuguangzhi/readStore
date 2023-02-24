import React, { useState } from 'react';
import { ReadModel } from '@/components/module/ReadModel';
import { ReadStep, stepItemsProps } from '@/components/module/ReadStep';
import { Form, ModalProps } from 'antd';
import { Identity } from '@/pages/authorAdmin/components/verify/identity';
import { MobileVerify } from '@/pages/authorAdmin/components/verify/mobileVerify';
import { BankVerify } from '@/pages/authorAdmin/components/verify/bankVerify';
import { BindInput } from '@/pages/authorAdmin/components/verify/bindInput';
import { PasswordVerify } from '@/pages/authorAdmin/components/verify/passwordVerify';
import { Finish } from '@/pages/authorAdmin/components/verify/finish';

export type modalTypes =
  | 'pen_name'
  | 'qq'
  | 'email'
  | 'id_card'
  | 'bank_card'
  | 'is_password_set'
  | 'address'
  | 'postcode'
  | 'mobile';

interface ModifyInfoProps extends ModalProps {
  isFinish: boolean;
  onCancel: () => void;
  type: modalTypes; //弹窗类型
  defaultValue: unknown;
}
//弹窗标题
const titleList: { [key in modalTypes]: string } = {
  pen_name: '笔名',
  qq: 'QQ',
  email: '邮箱',
  address: '地址',
  postcode: '邮编',
  id_card: '身份信息',
  bank_card: '银行卡信息',
  is_password_set: '密码',
  mobile: '手机号',
};

export const ModifyInfo = ({
  isFinish,
  onCancel,
  type,
  ...props
}: ModifyInfoProps) => {
  // 步骤1 form实例
  const [stepOneForm] = Form.useForm();
  // 步骤2 form实例
  const [stepTwoForm] = Form.useForm();
  // 笔名
  const penNameItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写笔名',
      stepElement: (
        <BindInput
          label={'笔名'}
          form={stepTwoForm}
          type={'pen_name'}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！笔名填写完成！'} />
      ),
    },
  ];
  // qq
  const qqItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写QQ号',
      stepElement: (
        <BindInput
          label={'QQ号'}
          form={stepTwoForm}
          type={'qq'}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！QQ填写完成！'} />
      ),
    },
  ];
  // email
  const emailItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写邮箱地址',
      stepElement: (
        <BindInput
          label={'邮箱地址'}
          form={stepTwoForm}
          type={'email'}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！邮箱填写完成！'} />
      ),
    },
  ];
  // address
  const addressItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写地址',
      stepElement: (
        <BindInput
          label={'详细地址'}
          form={stepTwoForm}
          type={'address'}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！地址填写完成！'} />
      ),
    },
  ]; // address
  const postcodeItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写邮编',
      stepElement: (
        <BindInput
          label={'邮编'}
          form={stepTwoForm}
          type={'postcode'}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！邮编填写完成！'} />
      ),
    },
  ];
  // identity
  const identityItems: stepItemsProps[] = [
    // {
    //   label: '手机号码验证',
    //   stepElement: (
    //     <MobileVerify
    //       form={stepOneForm}
    //       setStep={() => setStep((val) => val + 1)}
    //     />
    //   ),
    // },
    {
      label: '填写身份证信息',
      stepElement: (
        <Identity
          isFinish={isFinish}
          form={stepTwoForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！身份认证成功！'} />
      ),
    },
  ];
  // bankCard
  const bankCardItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写银行卡信息',
      stepElement: (
        <BankVerify
          isFinish={isFinish}
          form={stepTwoForm}
          setStep={() => setStep((val) => val + 1)}
          onCancel={onCancel}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！银行认证成功！'} />
      ),
    },
  ];
  // password
  const passwordItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写密码',
      stepElement: <PasswordVerify form={stepTwoForm} />,
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！密码修改完成！'} />
      ),
    },
  ];
  // modifyMobile
  const modifyMobileItems: stepItemsProps[] = [
    {
      label: '手机号码验证',
      stepElement: (
        <MobileVerify
          form={stepOneForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写手机号',
      stepElement: (
        <MobileVerify
          useMobileInput={true}
          form={stepTwoForm}
          setStep={() => setStep((val) => val + 1)}
        />
      ),
    },
    {
      label: '填写完成',
      stepElement: (
        <Finish onCancel={() => onFinish()} text={'恭喜你！手机号修改完成！'} />
      ),
    },
  ];
  // 每种类型的步骤
  const allTypeStep: { [key in modalTypes]: stepItemsProps[] } = {
    pen_name: penNameItems,
    qq: qqItems,
    email: emailItems,
    address: addressItems,
    postcode: postcodeItems,
    id_card: identityItems,
    bank_card: bankCardItems,
    is_password_set: passwordItems,
    mobile: modifyMobileItems,
  };

  const [currentStep, setStep] = useState<number>(1);

  const onFinish = () => {
    modalClose(2);
  };

  //弹窗关闭
  const modalClose = (step: number = 1) => {
    stepTwoForm?.setFieldValue('bindValue', '');
    if (currentStep === allTypeStep[type].length) setStep(step);
    onCancel();
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
      </>
    </ReadModel>
  );
};
