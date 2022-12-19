// 新建上传章节
import React from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);
export const AddSection = () => {
  return (
    <div className={'contract'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'我的合同'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container contract_container'}></div>
    </div>
  );
};
export default AddSection;
