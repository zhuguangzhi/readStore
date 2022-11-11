// 书籍信息
import { authorProps } from '@/type/user';

//书本类型
export type bookProps = {
  id: number;
  title: string;
  abstract: string; //摘要
  face: string; //封面
  authorInfo: Partial<authorProps>; //作者信息
  comment: number; //评论数
  vip: boolean; //是否是vip书籍
  support: boolean; //已赞
  content: string; //内容
  source: sourceProps | null; //来源 比如话题 无就null
  tags?: string[]; //标签列表
  bookshelf: boolean; //是否加入书架
  progress: number; //阅读进度
};

//来源信息
export type sourceProps = {
  id: number;
  type: 'Topic'; //"Topic":话题
  title: string; //标题
  desc: string; //标题描述
};
