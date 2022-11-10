//使用头部的路由
const useHeaderRouter = {
  path: '/',
  component: '@/layouts/useHeader',
  routes: [
    {
      path: '/home',
      title: '首页',
      component: '@/pages/home/index',
    },
    {
      path: '/personal',
      title: '个人中心',
      component: '@/pages/personalCenter/index',
      routes: [
        {
          path: 'bookShelf',
          title: '我的书架',
          component: '@/pages/personalCenter/bookShelf',
        },
      ],
    },
  ],
};

export const routes = [
  {
    path: '/',
    redirect: '/personal/bookShelf',
    component: '@/layouts/index',
  },

  //使用头部的路由
  { ...useHeaderRouter },
];
