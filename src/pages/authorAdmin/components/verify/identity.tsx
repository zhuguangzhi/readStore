//身份信息

import { Button, Form, FormInstance, Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../style/formCommon.less';
import './style/identity.less';
import { UploadImg } from '@/components/module/UploadImg';
import { Values } from 'async-validator';
import {
  useGetSignFaceVerifyInfo,
  useSignFaceVerify,
} from '@/utils/authorAdmin/personalInfo';
import { useAuth } from '@/hook/useAuth';
import ReadPopup from '@/components/module/ReadPopup';

// type cityProps = {
//   n: string; //名称
//   y: string; //首个拼音
// };
interface IdentityFormProps extends FormInstance {
  idFace?: string; //身份证正面
  idBack?: string; //身份证反面
}
type IdentityProps = {
  form?: IdentityFormProps;
  isFinish: boolean;
  setStep: Function;
};
export const Identity = ({ form, isFinish, setStep }: IdentityProps) => {
  // //省级数据
  // const [provinceData] = useState<cityProps[]>([]);
  // //市级数据
  // const [cityData] = useState<cityProps[]>([]);
  // //区级数据
  // const [areaData] = useState<cityProps[]>([]);

  const { userInfo } = useAuth();
  // bindStep 1：身份证认证 2，人脸识别步骤
  const [bindStep, setBindStep] = useState(1);
  // 身份验证弹窗数据
  const [idPopup, setIdPopup] = useState({
    open: false,
    link: '',
  });
  // 绑定身份证
  const { mutate: bindIdentity, isLoading: idLoading } = useSignFaceVerify(
    () => setBindStep(2),
    setIdPopup,
  );
  // 校验人脸是否通过
  const { mutate: verifyFace, isLoading: verifyLoading } =
    useGetSignFaceVerifyInfo(setStep, setBindStep);
  // 身份验证
  const onAuth = (value: Values) => {
    if (!userInfo) {
      message.error('登陆信息有误请退出后重新登陆');
      return;
    }
    // 绑定身份证
    if (bindStep === 1) {
      bindIdentity({
        user_id: String(userInfo.id), //作者ID
        id_card: value.idNumber,
        name: value.name,
      });
      return;
    }
    //  人脸识别校验
    verifyFace({ user_id: String(userInfo.id) });
  };

  useEffect(() => {
    // 完成，跳到下一步
    if (isFinish) setStep();
  }, [isFinish]);
  return (
    <>
      <Form
        labelCol={{ span: 6 }}
        className={'identity'}
        form={form}
        disabled={isFinish}
        onFinish={onAuth}
        requiredMark={false}
      >
        <Form.Item
          label={'真实姓名'}
          name={'name'}
          rules={[{ required: true, message: '请填写姓名' }]}
        >
          <Input placeholder={'请输入您的真实姓名'} autoComplete={'off'} />
        </Form.Item>
        <Form.Item label={'身份证号'}>
          <div className={'justify_between'} style={{ height: '41px' }}>
            <Select
              defaultValue="大陆身份证"
              style={{ width: '131px' }}
              disabled={true}
            />
            <Form.Item
              name={'idNumber'}
              rules={[{ required: true, message: '请填写身份证号' }]}
            >
              <Input
                maxLength={18}
                style={{ width: '256px' }}
                autoComplete={'off'}
              />
            </Form.Item>
          </div>
        </Form.Item>
        {/*<Form.Item label={'身份地址'}>*/}
        {/*  <div className={'justify_between'} style={{ height: '41px' }}>*/}
        {/*    <Form.Item name={'province'}>*/}
        {/*      <Select*/}
        {/*        defaultValue={provinceData[0]}*/}
        {/*        style={{ width: 121 }}*/}
        {/*        options={provinceData.map((province) => ({*/}
        {/*          label: province.n,*/}
        {/*          value: province.y,*/}
        {/*        }))}*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*    <Form.Item name={'city'}>*/}
        {/*      <Select*/}
        {/*        disabled={cityData.length === 0}*/}
        {/*        defaultValue={cityData[0]}*/}
        {/*        style={{ width: 121 }}*/}
        {/*        options={cityData.map((province) => ({*/}
        {/*          label: province.n,*/}
        {/*          value: province.y,*/}
        {/*        }))}*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*    <Form.Item name={'area'}>*/}
        {/*      <Select*/}
        {/*        disabled={areaData.length === 0}*/}
        {/*        defaultValue={areaData[0]}*/}
        {/*        style={{ width: 121 }}*/}
        {/*        options={areaData.map((province) => ({*/}
        {/*          label: province.n,*/}
        {/*          value: province.y,*/}
        {/*        }))}*/}
        {/*      />*/}
        {/*    </Form.Item>*/}
        {/*  </div>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label={'详细地址'} name={'address'}>*/}
        {/*  <Input placeholder={'请输入详细地址'} />*/}
        {/*</Form.Item>*/}
        <div className={'identity_box'}>
          <p>
            证件照片：上传后系统自动添加水印，仅限作品签约使用仅支持上传5M以内的jpg/png
          </p>
          <div className={'justify_between'}>
            {/*身份证正面*/}
            <div style={{ marginRight: '48px' }}>
              {form?.idFace ? (
                <img
                  className={'identity_box_img'}
                  src={form.idFace}
                  alt={''}
                />
              ) : (
                <UploadImg className={'identity_box_uploadFace'} isFace={1} />
              )}
              <p>证件人像面（横向上传）</p>
            </div>
            {/*身份证反面*/}
            <div>
              {form?.idBack ? (
                <img
                  className={'identity_box_img'}
                  src={form.idFace}
                  alt={''}
                />
              ) : (
                <UploadImg className={'identity_box_uploadBack'} isFace={2} />
              )}
              <p>证件非人像面（横向上传）</p>
            </div>
          </div>
        </div>
        <Button
          className={'readModal_footerBtn'}
          shape="round"
          type={'primary'}
          style={{ marginBottom: '76px' }}
          htmlType={'submit'}
          loading={idLoading || verifyLoading}
        >
          {bindStep === 1 ? '身份认证' : '人脸识别完成'}
        </Button>
      </Form>
      {/*身份验证弹窗*/}
      <ReadPopup
        onClose={() => setIdPopup((val) => ({ ...val, open: false }))}
        title={`打开身份验证`}
        open={idPopup.open}
        showClose={true}
        onOk={() => {
          window.open(idPopup.link);
        }}
      >
        <p>用于对你的身份进行实名校验！</p>
      </ReadPopup>
    </>
  );
};
