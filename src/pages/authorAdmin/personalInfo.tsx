import React from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';

const SubIcon = () => (
  <IconFont width={'37px'} height={'42px'} icon={'personal'} />
);
export default () => {
  return (
    <div>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'个人信息'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container'}></div>
    </div>
  );
};
