// 书籍信息
import { authorProps } from '@/type/user';

// 书的信息
export type bookInfoProps = {
  id: number; //主键ID
  cover: string; //封面相对路径
  name: string; //名称
  description: string; // 描述
  tags: string[]; //书本标签
  parent_category_id: number; //二级分类ID
  category_id: number; //三级分类ID
  is_finish: 1 | 2; //是否完本( 1：是 2：否)
  channel_type: 1 | 2; //频道类型( 1：男生 2：女生）
  is_vip: 1 | 2; //是否收费(1：是 2：否)
  is_display: 1 | 2; //是否前台显示(1：是 2：否）
  is_shelf: 1 | 2; //是否上架(1：是 2：否)
  create_time: string; //创建时间
  update_time: string; //更新时间
  last_update_chapter_time: string; //最后更新时间
  chapter_id: number; //最后更新章节ID
  word_count: number; //总字数
  is_finish_text: string; //是否完结描述
  is_vip_text: string; //是否收费描述
  is_display_text: string; //是否显示描述
  is_shelf_text: string; //是否上架描述
  channel_type_text: string; //频道描述
  cover_url: string; //封面URL地址 绝对路径
  in_user_case: 1 | 2; //是否加入用户书架(1：是 2：否）
  is_user_approval: 1 | 2; //用户是否已点赞(1：是 2：否）
  chart_sort: number; //推荐序号
  book_extension?: bookExtension; //书籍额外信息
};
// 书籍额外信息
export type bookExtension = {
  id: number;
  book_id: number; //书籍ID
  all_click: number; //总点击量
  all_collection: number; //总收藏数
  all_commend: number; //总推荐数
  all_reward: number; //总打赏
  all_comments: number; //总评论数
};

//用户阅读书本类型 TODO:对接口时替换成book
export interface bookProps {
  id: number;
  title: string;
  description: string; //摘要
  face: string; //封面
  content: string;

  authorInfo: Partial<authorProps>; //作者信息  content: string //内容
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

//书库主题分类
export type booksThemeProps = {
  id: number;
  cover?: string; //主题图标
  name: string;
  subTheme?: booksThemeProps[];
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

//作者作品 TODO:对接口时替换成book
export interface worksProps {
  id: number;
  title: string;
  description: string; //摘要
  face: string; //封面
  authorInfo: Partial<authorProps>; //作者信息

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
    last_update_chapter_title: string; // 最后更新章节名称
  }[];
}
