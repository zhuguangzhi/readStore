import React from 'react';
import { logoUrl } from '@/assets/config';
const Header = () => {
  return (
    <div className={'header justify_between'}>
      <img className={'header_image'} src={logoUrl} alt="logo" />
      <div className={'header_item'}></div>
    </div>
  );
};
export default Header;
