// 书籍信息
import { authorProps } from '@/type/user';

//书本类型 TODO:未对类型
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

//评论 TODO：提供接口类型reply_time改为time 未提供id
export type commentProps = {
  id: number;
  target_type: number; // 1评论、2回复
  book_id: number; //评论书籍id
  book_title: string; //评论书籍标题
  description: string; //评论书籍简介
  cover: string; //书籍封面
  is_look?: number; //...
  target_id?: number; //我的评论id
  content?: string; //我的评论内容
  reply_id?: number; //回复评论id
  reply_user_id?: number; //回复用户id
  reply_content?: string; //回复内容
  reply_user_image?: string; //回复用户头像
  reply_user_name?: string; //回复用户昵称
  time: string; //回复\评论日期
};
