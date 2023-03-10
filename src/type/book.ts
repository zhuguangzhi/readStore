// 书籍信息
import { topicProps } from '@/type/topic';

// 书的信息(所有接口书籍信息汇总)
export type bookInfoProps = {
  id: number; //主键ID
  cover: string; //封面相对路径
  name: string; //名称
  description: string; // 描述
  tag: string[]; //书本标签
  category_name: string; // 三级分类名称
  category_id: number; //三级分类ID
  parent_category_id: number; //二级分类ID
  parent_category_name: string; //二级分类名称
  is_finish: 1 | 2; //是否完本( 1：是 2：否)
  is_signing: 1 | 2; //是否签约( 1：是 2：否)
  is_signing_text: string; //是否签约描述
  channel_type: 1 | 2; //频道类型( 1：男生 2：女生）
  is_vip: 1 | 2; //是否收费(1：是 2：否)
  is_display: 1 | 2; //是否前台显示(1：是 2：否）
  is_shelf: 1 | 2; //是否上架(1：是 2：否)
  create_time: string; //创建时间
  update_time: string; //更新时间
  last_update_chapter_time: string; //最后更新时间
  chapter_id: number; //章节ID
  month_word: number; //月更新字数
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
  is_attention: 2 | 1; //当前用户是否关注作者( 1：是  2：否 ）
  book_extension?: bookExtension; //书籍额外信息
  topic: topicProps; //话题信息
  read_line: number; //当前阅读行
  read_progress: number; //当前阅读进度
  book_status: -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4; //书籍状态( 0：待审  1：审核通过  -1：审核未通过  2：申请签约  -2：签约未通过  3：已签约  -3：删除  4：签约申请通过  -4：草稿 ）
  book_status_text: string; //审核状态
  keyword: string; //关键字,号隔开
  chapter_status: -7 | -6 | -5 | -3 | -2 | -1 | 0 | 1 | -4; //章节状态( 1:已发布 0: 待审 -1: 驳回 -2: 存稿 -3: 定时发布 -4:删除 -5: 复审-6: 隐藏 -7: 草稿 )
  audit_content: string; //审核内容
  empowers: empowerProps[]; // 上架渠道信息
  signing_flow: signingFlowProps; //签约流程
  chapter_word_count: number; //章节总字数
};
// 签约流程
export type signingFlowProps = {
  flow: 1 | 2 | 3 | 4; //签约流程( 1：签约申请  2：信息确认 3：签署合同 4：完成 ）
  flow_status: 1 | 2 | 3 | 4 | 5 | 6 | 7; //签约流程状态( 1：待审核  2：审核中 3：已通过  4：已驳回  5：合同待签署  6：合同签署中  7：合同签署完成 ）
};
// 上架渠道信息
export type empowerProps = {
  title: string; //授权渠道标题
  cover_url: string; //授权渠道封面地址
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
  all_read: number; //总阅读数
  all_approval: number; //总点赞数
};

// __________________________________

//书库主题分类
export type booksThemeProps = {
  id: number;
  cover?: string; //主题图标
  name: string;
  subTheme?: booksThemeProps[];
};

//--------------------------------------------------
// 分页
export type pageProps = {
  page: number;
  page_size: number;
  total: number;
};
// 分页参数
export type pageRequestProps = Omit<pageProps, 'total'>;

//点赞
export interface approvalProps {
  book_id: number; //书本id
  is_approval: 1 | 2; //书籍点赞( 1：点赞  2：取消）
}
// 排行参数
export interface rankParamProps extends pageRequestProps {
  channel_type: 1 | 2; //频道类型( 1：男频  2：女频 ）
  rank_type: number; //榜单类型 1：阅读榜    2：免费榜     3：推荐榜     4：评论榜     5：完结榜     6：连载榜
}
// 排行书本信息
export interface rankBook extends bookInfoProps {
  author: {
    id: number; //id
    pen_name: string; //笔名
    user_image_url: string; //作者头像
  };
}
export interface rankBookInfoProps {
  data: rankBook[];
  page_info?: pageProps;
}
//- ---end
// 阅读
export interface readBookProps {
  id: number; //主键ID
  book_id: number; //书籍ID
  book_title: string; //书籍名称
  cname: string; //章节标题
  line_count: 0; //总行数
  content: string; //内容
}
// 书本详情
export type readBookInfoProps = rankBook;
// 评论
export type commentProps = {
  id: number; //主键ID
  user_id: number; //用户ID
  book_title: string; //书籍名称
  book_id: number; //书籍ID
  content: string; //评论内容
  reply: number; //回复数
  report: number; //举报数
  star: number; //评论分数
  approval_count: number; //点赞数
  create_time: string; //创建时间
  user_nickname: string; //用户昵称
  user_image_url: string; //用户头像地址
  is_user_approval: 1 | 2; //用户是否已点赞(1：是 2：否）
  data: replyStoreProps[]; // 回复
};
// 回复
export interface replyStoreProps {
  id: number; //主键ID
  user_id: number; //用户ID
  to_user_id: number; //回复用户ID
  target_id: number; //回复的目标ID
  target_type: 1 | 2; //回复目标类型( 1：评论  2：回复
  comment_id: number; //评论ID
  content: string; //内容
  reply: number; //回复数
  report: number; //举报次数
  approval_count: number; //点赞数
  create_time: string; //创建时间
  is_user_approval: 1 | 2; //用户是否已点赞(1：是 2：否）
  user_nickname: string; //用户昵称
  user_image_url: string; //用户头像地址
  to_user_nickname: string; //回复用户昵称
  to_user_image_url: string; //回复用户头像地址
}
// 阅读评论
export type readComponentProps = {
  page_info: pageProps;
  data: commentProps[];
};
// 评论的回复请求参
export interface commentReplyRequestProps extends pageRequestProps {
  comment_id: number;
}
// 评论回复的列表
export type commentReply = {
  page_info: pageProps;
  data: replyStoreProps[];
};
// 评论请求参数
export interface commentRequestProps extends Omit<pageProps, 'total'> {
  book_id: number; //书籍Id
  comment_sort_type: 1 | 2; //评论排序类型(  1：默认  2：最新时间）
}
// 回复的回复参数
export interface replyStoreRequestProps {
  comment_id: number; //评论ID
  book_id: number; //书籍ID
  target_id: number; //要回复的评论ID
  to_user_id: number; //要回复的用户ID
  content: string; //内容
}
// 评论的回复参数
export type replyRequestProps = Omit<
  replyStoreRequestProps,
  'target_id' | 'to_user_id'
>;
// 评论的参数
export type commentStoreRequestProps = Omit<replyRequestProps, 'comment_id'>;
// 评论和回复点赞
export type commentApprovalProps = {
  comment_id: number; //评论ID
  comment_user_id: number; //评论所属用户ID
  is_approval: 1 | 2; //书籍点赞( 1：点赞  2：取消）
  comment_type: 1 | 2; //评论类型( 1：评论  2：回复）
};

// 书籍分类
export type bookCategoryProps = {
  id: number; //主键ID
  pid: number; //父ID
  name: string; //书籍标题
  cover: string; //书籍封面
  cover_url: string; //图片URL地址
  child?: bookCategoryProps[]; //子集
};
//书库请求参
export type bookLibraryRequestProps = {
  channel_type?: 1 | 2; //频道类型( 1：男频  2：女频 ）
  parent_category_ids?: string; //一级分类( 多选情况下英文逗号分隔 ）
  category_ids?: string; //二级分类( 多选情况下英文逗号分隔 ）
  search_status?: number; //搜索状态( 0：全部  1：已完结  2：连载中）
  search_sort?: number; //搜索状态( 3：最热  4：最新 ）
  search_word_count?: number; //搜索字数( 0：全部  1：30万以下  2：30-50万  3：50-100万  4：100-200万  5：200万以上  ）
  pen_name?: string; //作者名
  book_title?: string; //书籍名
  search_keywords?: string; //搜索关键字
  page?: number; //页数
  page_size?: number; //条数
};
//保存阅读历史
export type saveReadHistoryProps = {
  book_id: number;
  chapter_id: number; //章节id
  read_progress: number; //阅读进度
  read_line: number; //阅读行
};

// 创建作品
export type createBooksProps = {
  id?: number; //修改时使用
  name: string;
  channel_type: 1 | 2; //频道类型( 1：男频  2：女频 ）
  parent_category_id: number; //一级分类id
  category_id: number; //二级分类id
  keyword?: string; //关键字
  description: string; //描述
  topic_id: number; //话题
};
