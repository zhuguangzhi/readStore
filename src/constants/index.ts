const baseName = 'ReadStore_';
const setName = (name: string) => baseName + name;
// 用于缓存----start---
export const TOKEN = setName('token'); // token
export const UserInfo = setName('userInfo'); // token
// 用于缓存----end---

//清除用户信息EventBus
export const Bus_ClearUserInfo = 'clearUserInfo';
// 登陆
export const Bus_OpenLogin = 'openLogin';
// 获取token
export const Bus_GetToken = 'getToken';
