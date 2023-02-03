// 身份证图片上传
import React, { useState } from 'react';
import { message, Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { IconFont } from '@/components/IconFont';
import './style/uploadImg.less';
import { LoadingOutlined } from '@ant-design/icons';
import { uploadIdentityImgUrl } from '../../../public/config';
import { HttpRequestHeader } from 'antd/es/upload/interface';
import { getToken } from '@/hook/useAuth';
import { ResponseData } from '@/common/http';

const UploadIcon = () => (
  <IconFont width={'60px'} height={'60px'} icon={'upload2'} />
);
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('上传图片格式必须为 JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('图片大小不得超过 5MB!');
  }
  return isJpgOrPng && isLt2M;
};

type UploadImgProps = {
  isFace: 1 | 2; //是否正面( 1：是  2：否 ）
  className?: string;
};
export const UploadImg = ({ isFace, className }: UploadImgProps) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const header: HttpRequestHeader = {
    'X-Requested-With': null as unknown as string,
    Authorization: `Bearer ${getToken()}`,
  };

  const [loading, setLoading] = useState(false);

  const handleChange = async (info: UploadChangeParam) => {
    setImageUrl('');
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const uploadRes = (await info.file.response) as ResponseData<{
        file_path: string;
        file_path_url: string;
      }>;
      if (uploadRes.data === undefined) {
        message.error('图片上传错误，请联系管理员');
        return;
      }
      setImageUrl(uploadRes.data.file_path_url);
      setLoading(false);
    }
  };
  const uploadButton = (
    <div className={'uploadButton'}>
      {loading ? <LoadingOutlined /> : <UploadIcon />}
    </div>
  );

  return (
    <Upload
      name="file"
      listType="picture-card"
      className={`avatar-uploader uploadImg ${className}`}
      data={{ is_front: isFace }}
      showUploadList={false}
      action={uploadIdentityImgUrl}
      beforeUpload={beforeUpload}
      headers={header}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
