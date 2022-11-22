//身份信息

import { Button, Form, FormInstance, Input, Select } from 'antd';
import React, { useState } from 'react';
import { IconFont } from '@/components/IconFont';
import './style/identity.less';

type cityProps = {
  n: string; //名称
  y: string; //首个拼音
};
interface IdentityProps extends FormInstance {
  idFace?: string; //身份证正面
  idBack?: string; //身份证反面
}

export const Identity = ({ form }: { form?: IdentityProps }) => {
  //省级数据
  const [provinceData] = useState<cityProps[]>([]);
  //市级数据
  const [cityData] = useState<cityProps[]>([]);
  //区级数据
  const [areaData] = useState<cityProps[]>([]);

  return (
    <Form labelCol={{ span: 6 }} className={'identity'} form={form}>
      <Form.Item label={'真实姓名'} name={'name'}>
        <Input placeholder={'请输入您的真实姓名'} />
      </Form.Item>
      <Form.Item label={'身份证号'}>
        <div className={'justify_between'} style={{ height: '41px' }}>
          <Select
            defaultValue="大陆身份证"
            style={{ width: '131px' }}
            disabled={true}
          />
          <Form.Item name={'idNumber'}>
            <Input maxLength={18} style={{ width: '256px' }} />
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item label={'身份地址'}>
        <div className={'justify_between'} style={{ height: '41px' }}>
          <Form.Item name={'province'}>
            <Select
              defaultValue={provinceData[0]}
              style={{ width: 121 }}
              options={provinceData.map((province) => ({
                label: province.n,
                value: province.y,
              }))}
            />
          </Form.Item>
          <Form.Item name={'city'}>
            <Select
              disabled={cityData.length === 0}
              defaultValue={cityData[0]}
              style={{ width: 121 }}
              options={cityData.map((province) => ({
                label: province.n,
                value: province.y,
              }))}
            />
          </Form.Item>
          <Form.Item name={'area'}>
            <Select
              disabled={areaData.length === 0}
              defaultValue={areaData[0]}
              style={{ width: 121 }}
              options={areaData.map((province) => ({
                label: province.n,
                value: province.y,
              }))}
            />
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item label={'详细地址'} name={'address'}>
        <Input placeholder={'请输入详细地址'} />
      </Form.Item>
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
              <IconFont icon={'idFace'} width={'129px'} height={'129px'} />
            )}
            <p>证件人像面（横向上传）</p>
          </div>
          {/*身份证反面*/}
          <div>
            {form?.idBack ? (
              <img className={'identity_box_img'} src={form.idFace} alt={''} />
            ) : (
              <IconFont icon={'idBack'} width={'129px'} height={'129px'} />
            )}
            <p>证件非人像面（横向上传）</p>
          </div>
        </div>
        <Button className={'identity_box_btn'} shape="round" type={'primary'}>
          关闭
        </Button>
      </div>
    </Form>
  );
};