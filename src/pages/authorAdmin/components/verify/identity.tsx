//身份信息

import { Form, FormInstance, Input, Select } from 'antd';
import React from 'react';
import '../../style/formCommon.less';
import './style/identity.less';
import { UploadImg } from '@/components/module/UploadImg';

// type cityProps = {
//   n: string; //名称
//   y: string; //首个拼音
// };
interface IdentityProps extends FormInstance {
  idFace?: string; //身份证正面
  idBack?: string; //身份证反面
}

export const Identity = ({
  form,
  isFinish,
}: {
  form?: IdentityProps;
  isFinish: boolean;
}) => {
  // //省级数据
  // const [provinceData] = useState<cityProps[]>([]);
  // //市级数据
  // const [cityData] = useState<cityProps[]>([]);
  // //区级数据
  // const [areaData] = useState<cityProps[]>([]);

  return (
    <Form
      labelCol={{ span: 6 }}
      className={'identity'}
      form={form}
      disabled={isFinish}
    >
      <Form.Item label={'真实姓名'} name={'name'}>
        <Input placeholder={'请输入您的真实姓名'} autoComplete={'off'} />
      </Form.Item>
      <Form.Item label={'身份证号'}>
        <div className={'justify_between'} style={{ height: '41px' }}>
          <Select
            defaultValue="大陆身份证"
            style={{ width: '131px' }}
            disabled={true}
          />
          <Form.Item name={'idNumber'}>
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
          证件照片：上传后系统自动添加水印，仅限作品签约使用仅支持上传2M以内的jpg/png
        </p>
        <div className={'justify_between'}>
          {/*身份证正面*/}
          <div style={{ marginRight: '48px' }}>
            {form?.idFace ? (
              <img className={'identity_box_img'} src={form.idFace} alt={''} />
            ) : (
              <UploadImg className={'identity_box_uploadFace'} />
            )}
            <p>证件人像面（横向上传）</p>
          </div>
          {/*身份证反面*/}
          <div>
            {form?.idBack ? (
              <img className={'identity_box_img'} src={form.idFace} alt={''} />
            ) : (
              <UploadImg className={'identity_box_uploadBack'} />
            )}
            <p>证件非人像面（横向上传）</p>
          </div>
        </div>
      </div>
    </Form>
  );
};
