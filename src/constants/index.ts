const baseName = 'ReadStore_';
const setName = (name: string) => baseName + name;
export const TOKEN = setName('token'); // token

//清除用户信息EventBus
export const Bus_ClearUserInfo = 'clearUserInfo';
