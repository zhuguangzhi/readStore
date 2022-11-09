//用户信息
export type authorProps = {
  id: number;
  name: string;
  mobile: number; //电话号码
  photo: string; //头像
  gender: 0 | 1 | 2; //性别 0未知 1男 2女
  vip: false; //是否是vip
  vipLever?: number; //vip等级
  tag?: string; // 标签
};
