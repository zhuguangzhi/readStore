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
      path: '/bookRank',
      title: '首页',
      component: '@/pages/bookRank/index',
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
        {
          path: 'comment',
          title: '我的评论',
          component: '@/pages/personalCenter/myComment',
        },
        {
          path: 'notice',
          title: '我的评论',
          component: '@/pages/personalCenter/systemMessage',
        },
      ],
    },
  ],
};

export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: '@/layouts/index',
  },
  {
    path: '/admin',
    component: '@/pages/authorAdmin/index',
    name: '读者后台',
    routes: [
      {
        path: 'home',
        name: '首页',
        component: '@/pages/authorAdmin/home',
      },
      {
        path: 'works',
        name: '作品管理',
        component: '@/pages/authorAdmin/worksManager',
      },
      {
        path: 'works/worksInfo',
        name: '作品信息',
        component: '@/pages/authorAdmin/works/index',
      },
      {
        path: 'message',
        name: '消息通知',
        component: '@/pages/authorAdmin/message/index',
      },
      {
        path: 'contract',
        name: '我的合同',
        component: '@/pages/authorAdmin/contract',
      },
      {
        path: 'personalInfo',
        name: '个人信息',
        component: '@/pages/authorAdmin/personalInfo',
      },
    ],
  },

  //使用头部的路由
  { ...useHeaderRouter },
];
