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
};
export type myBookListProps = {
  data: myBookProps[];
  page_info: pageProps;
};
