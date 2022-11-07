//使用头部的路由
const useHeaderRouter = {
  path: '/',
  component: '@/layouts/useHeader',
  routes: [
    {
      path: '/home',
      component: '@/pages/home/index',
      state: {
        useHeader: true,
      },
    },
  ],
};

export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: '@/layouts/index',
  },

  //使用头部的路由
  { ...useHeaderRouter },
];
