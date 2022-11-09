import { ChangeEvent } from 'react';

//输入框onChange返回类型
export type inputEvent = ChangeEvent<HTMLInputElement>;

//新闻公告
export type newsProps = {
  id: number;
  title: string;
  content?: string; //内容
};
