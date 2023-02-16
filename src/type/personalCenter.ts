import { pageProps } from '@/type/book';

// 我的评论
export type myCommentDataProps = {
  id: number; //主键ID
  comment_id: number; //评论ID
  book_id: number; //书籍ID
  book_title: string; //书籍名称
  is_reply: 1 | 2; //是否是回复的回复( 1：是  2：否 ）
  target_id: number; //回复的目标ID
  content: string; //评论内容
  reply_content: string; //回复内容
  reply_user_id: number; //回复用户ID
  reply_user_nickname: string; //回复用户昵称
  reply_user_image_url: string; //回复用户头像
  create_time: string; //创建时间
  is_comment: 1 | 2; //是否是评论( 1：是  2：否 ）
};
export type myCommentProps = {
  data: myCommentDataProps[];
  page_info: pageProps;
};
// 删除评论
export type delCommentProps = {
  comment_id?: string;
  reply_id?: string;
};
// 我的书架
export type myBookProps = {
  id: number; //主键ID
  book_id: number; //书籍ID
  book_title: string; //书籍名称
  cover_url: string; //封面URL地址
  read_progress: string; //阅读进度
  topic_id: number; //话题ID
  topic_title: string; //话题标题
  chapter_id: number; //章节id
};
export type myBookListProps = {
  data: myBookProps[];
  page_info: pageProps;
};
// 消息链接
export type messageLinkProps = {
  title: string; //链接标题
  target_page: 1 | 2 | 3; //1:收入查询 2:作者后台 章节内容详情 3:开通/续费vip
  book_id?: number; //target_page=2时才有字段 书籍id
  chapter_id?: number; //target_page=2时才有字段 章节id
};
// 消息列表
export type messageListProps = {
  id: number; //主键ID
  title: string; //标题
  content: string; //内容
  is_read: 1 | 2; //是否阅读( 1：是  2：否 ）
  link: messageLinkProps[]; //链接信息
  create_time: string;
};
// 个人中心消息列表
export type personalMessageProps = {
  page_info: pageProps;
  data: messageListProps[];
};
