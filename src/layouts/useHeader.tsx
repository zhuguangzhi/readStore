import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router';

const UseHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default UseHeader;
