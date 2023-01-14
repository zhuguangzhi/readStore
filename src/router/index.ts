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
      path: '/home/news',
      title: '公告',
      component: '@/pages/home/newsInfo',
    },
    {
      path: '/books',
      title: '书库',
      component: '@/pages/books/index',
    },
    {
      path: '/bookRank',
      title: '榜单',
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
          path: 'topicShelf',
          title: '话题书架',
          component: '@/pages/personalCenter/topicShelf',
        },
        {
          path: 'comment',
          title: '我的评论',
          component: '@/pages/personalCenter/myComment',
        },
        {
          path: 'notice',
          title: '系统通知',
          component: '@/pages/personalCenter/systemMessage',
        },
        {
          path: 'password',
          title: '修改密码',
          component: '@/pages/personalCenter/editPassword',
        },
      ],
    },
    {
      path: '/personal/userInfo',
      title: '用户中心',
      component: '@/pages/personalCenter/userInfo',
    },
    {
      path: '/personal/authorInfo',
      title: '作者中心',
      component: '@/pages/personalCenter/authorInfo',
    },
    {
      path: '/read',
      title: '阅读',
      component: '@/pages/read/index',
    },
    {
      path: '/topicList',
      title: '话题列表',
      component: '@/pages/topic/topicList',
    },
    {
      path: '/topicInfo',
      title: '话题详情',
      component: '@/pages/topic/topicInfo',
    },
  ],
};
const noUseHeaderRouter = {
  path: '/',
  component: '@/layouts/noHeader',
  routes: [
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
          path: 'income',
          name: '收入管理',
          component: '@/pages/authorAdmin/searchInCome',
        },
        {
          path: 'works/bookContainer',
          name: '创建/编辑信息',
          component: '@/pages/authorAdmin/works/addSection',
        },
        {
          path: 'works/worksInfo',
          name: '作品信息',
          component: '@/pages/authorAdmin/works/index',
        },
        {
          path: 'comment',
          name: '评论管理',
          component: '@/pages/authorAdmin/commentManager',
        },
        {
          path: 'message',
          name: '消息通知',
          component: '@/pages/authorAdmin/message/index',
        },
        {
          path: 'contract',
          name: '我的合同',
          component: '@/pages/authorAdmin/contractList',
        },
        {
          path: 'personalInfo',
          name: '个人信息',
          component: '@/pages/authorAdmin/personalInfo',
        },
      ],
    },
    {
      path: '/authorGuid',
      component: '@/pages/authorAdmin/authorGuid',
      name: '作者引导',
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
  //    不使用头部路由
  { ...noUseHeaderRouter },
  //    404
  {
    path: '/*',
    component: '@/pages/404',
  },
];
