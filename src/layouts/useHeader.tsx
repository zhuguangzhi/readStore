import Header from '@/components/Header';
import React from 'react';
import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';

const UseHeader = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
    </QueryClientProvider>
  );
};
export default UseHeader;
