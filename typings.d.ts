import '@umijs/max/typings';

declare global {
  interface Window {
    linkClick: Function; // 消息中心 在模板字符串中添加的点击方法
  }
}
