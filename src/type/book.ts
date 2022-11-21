// 书籍信息
import { authorProps } from '@/type/user';

type book = {
  id: number;
  title: string;
  description: string; //摘要
  face: string; //封面
  authorInfo: Partial<authorProps>; //作者信息
};
//用户阅读书本类型 TODO:未对类型
export interface bookProps extends book {
  content: string; //内容
  comment: number; //评论数
  vip: boolean; //是否是vip书籍
  support: boolean; //已赞
  source: sourceProps | null; //来源 比如话题 无就null
  tags?: string[]; //标签列表
  bookshelf: boolean; //是否加入书架
  progress?: number; //阅读进度
}

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

//作者作品
export interface worksProps extends book {
  word_count: number; //字数
  month_update_count: number; //本月更新字数
  is_finish: boolean; //连载状态
  is_contract: boolean; //是否签约
  channel: 'man' | 'woman'; //man 男频 woman女频
  tags: string; //标签
  audit_num: number; //正在审核数
  all_collection: number; //点赞数
  create_time?: string; //创建时间
}

//榜单
export interface bookRankProps {
  id: number; //榜单id <number>
  name: string; //榜单名称 <string>
  list: {
    book_id: number; //书籍id <integer>
    book_title: string; //书籍标题 <string>
    cover: string; //封面 大图 <string>
    pen_name: string; //作者 <string>
    is_finish: 'Y' | 'N'; //连载状态 Y：完结 N：连载 <string>
    description: string; //书籍简介 <string>
    word_count: number; //总字数 <integer>
    category_title: null | string; //分类 <string>
    all_click: number; //点击量 <integer>
    billing_type: 1 | 2; //1:按章节付费 2：整本付费 <integer>
    billing_chapter: number; //按章节价格 单位 夜听币 <string>
    bookshelf: 0 | 1; //1加入书架
  }[];
}
