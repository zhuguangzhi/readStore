import { Outlet } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

export default () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};
