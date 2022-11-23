import React, { useState } from 'react';
import { message, Upload, UploadFile } from 'antd';
import { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { IconFont } from '@/components/IconFont';
import './style/uploadImg.less';
import { LoadingOutlined } from '@ant-design/icons';
import { uploadImageUrl } from '@/assets/config';

const UploadIcon = () => (
  <IconFont width={'60px'} height={'60px'} icon={'upload2'} />
);
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('上传图片格式必须为 JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不得超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
export const UploadImg = ({ className }: { className?: string }) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div className={'uploadButton'}>
      {loading ? <LoadingOutlined /> : <UploadIcon />}
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={`avatar-uploader uploadImg ${className}`}
      showUploadList={false}
      action={uploadImageUrl}
      beforeUpload={beforeUpload}
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
