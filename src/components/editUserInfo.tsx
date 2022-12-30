import React, { useEffect, useState } from 'react';
import './style/editUserInfo.less';
import { getToken, useAuth } from '@/hook/useAuth';
import { IconFont } from '@/components/IconFont';
import { Button, DatePicker, Form, Input, message, Select, Upload } from 'antd';
import { uploadImgUrl } from '../../public/config';
import { HttpRequestHeader } from 'antd/es/upload/interface';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { ResponseData } from '@/common/http';
import { ErrorCheck, User } from '@/common/api';
import moment from 'moment';
import { useEditInfo } from '@/utils/personalCenter';
import { Values } from 'async-validator';
import { authorProps } from '@/type/user';
import { useAsync } from '@/hook/useAsync';

type EditUserInfoProps = {
  onClose: Function;
};
export const EditUserInfo = ({ onClose }: EditUserInfoProps) => {
  const { userInfo, setUserInfo } = useAuth();
  const { run, isLoading: getUserInfoLoading } = useAsync();
  const [formValue] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
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
    setUploadLoading(true);
    if (fileList[0].status !== 'done') return;
    setUploadLoading(false);
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
  // 修改个人信息
  const { mutate: setInfo, isLoading: setInfoLoading } = useEditInfo(() =>
    editSuccessCall(),
  );
  const header: HttpRequestHeader = {
    'X-Requested-With': null as unknown as string,
    Authorization: `Bearer ${getToken()}`,
  };

  const onSubmit = (value: Values) => {
    setInfo({
      nickname: value.nickname,
      birthday: moment(value.birthday).format('YYYY-MM-DD'),
      description: value.description,
      sex: value.sex,
      user_image: imgUrl.simpleUrl,
    });
  };
  const editSuccessCall = async () => {
    const userInfoRes = (await run(
      User.getUserInfo(),
    )) as ResponseData<authorProps>;
    if (!ErrorCheck(userInfoRes)) return false;
    message.success('修改成功');
    setUserInfo(userInfoRes.data);
    onClose();
  };

  useEffect(() => {
    if (!userInfo) return;
    setImgUrl({
      allUrl: userInfo.user_image_url,
      simpleUrl: userInfo.user_image,
    });
    formValue.setFieldsValue({
      nickname: userInfo.nickname,
      sex: userInfo.sex,
      birthday: moment(userInfo.birthday, 'YYYY-MM-DD'),
      description: userInfo.description,
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
      <Form form={formValue} onFinish={onSubmit}>
        <Form.Item label={'昵称'} name={'nickname'}>
          <Input maxLength={8} autoComplete={'off'} />
        </Form.Item>
        <Form.Item label={'性别'} name={'sex'}>
          <Select
            options={[
              { value: 0, label: '未知', disabled: true },
              { value: 1, label: '男' },
              { value: 2, label: '女' },
            ]}
          />
        </Form.Item>
        <Form.Item label={'生日'} name={'birthday'}>
          <DatePicker />
        </Form.Item>
        <Form.Item label={'签名'} name={'description'}>
          <Input maxLength={29} autoComplete={'off'} />
        </Form.Item>
        <div className={'editUserInfo_editBtn'}>
          <Button
            type={'primary'}
            htmlType={'submit'}
            loading={setInfoLoading || uploadLoading || getUserInfoLoading}
          >
            保存修改
          </Button>
        </div>
      </Form>
    </div>
  );
};
