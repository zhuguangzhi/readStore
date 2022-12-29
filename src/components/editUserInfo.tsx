import React, { useEffect, useState } from 'react';
import './style/editUserInfo.less';
import { getToken, useAuth } from '@/hook/useAuth';
import { IconFont } from '@/components/IconFont';
import { Button, DatePicker, Form, Input, message, Select, Upload } from 'antd';
import { uploadImgUrl } from '../../public/config';
import { HttpRequestHeader } from 'antd/es/upload/interface';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { ResponseData } from '@/common/http';
import { ErrorCheck } from '@/common/api';

export const EditUserInfo = () => {
  const { userInfo } = useAuth();
  const [imgUrl, setImgUrl] = useState({
    simpleUrl: '',
    allUrl: '',
  });
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('图片格式必须为jpeg或者png！');
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //     message.error('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
    return isJpgOrPng;
  };
  // 上传改变
  const onChange = (val: UploadChangeParam) => {
    const { fileList } = val;
    if (fileList[0].status !== 'done') return;
    const uploadRes = JSON.parse(fileList[0].xhr.response) as ResponseData<{
      file_path: string;
      file_path_url: string;
    }>;
    if (!ErrorCheck(uploadRes)) return;
    setImgUrl({
      allUrl: uploadRes.data.file_path_url,
      simpleUrl: uploadRes.data.file_path,
    });
  };
  const header: HttpRequestHeader = {
    'X-Requested-With': null as unknown as string,
    Authorization: `Bearer ${getToken()}`,
  };
  useEffect(() => {
    if (!userInfo) return;
    setImgUrl({
      allUrl: userInfo.user_image_url,
      simpleUrl: userInfo.user_image,
    });
  }, [userInfo]);
  return (
    <div className={'editUserInfo'}>
      {/* 头像*/}
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        headers={header}
        action={uploadImgUrl}
        beforeUpload={beforeUpload}
        onChange={onChange}
      >
        <div className={'editUserInfo_header'}>
          <img src={imgUrl.allUrl} alt="" />
          <i>
            <IconFont icon={'xiangji'} width={'18px'} height={'18px'} />
          </i>
        </div>
      </Upload>
      <Form>
        <Form.Item label={'昵称'} name={'nickname'}>
          <Input maxLength={8} autoComplete={'off'} />
        </Form.Item>
        <Form.Item label={'性别'} name={'sex'}>
          <Select>
            <Select.Option key={0}>未知</Select.Option>
            <Select.Option key={1}>男</Select.Option>
            <Select.Option key={2}>女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={'生日'} name={'birthday'}>
          <DatePicker />
        </Form.Item>
        <Form.Item label={'签名'} name={'description'}>
          <Input maxLength={29} autoComplete={'off'} />
        </Form.Item>
        <div className={'editUserInfo_editBtn'}>
          <Button type={'primary'}>保存修改</Button>
        </div>
      </Form>
    </div>
  );
};
