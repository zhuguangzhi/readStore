import { bookInfoProps, pageProps, pageRequestProps } from '@/type/book';

// 话题信息
export type topicProps = {
  id: number; //主键ID
  title: string; //话题标题
  is_user_attention: 1 | 2; //用户是否关注( 1：是  2：否 ）
};
export type topicExtensionProps = {
  all_read: number; //总阅读
  all_attention: number; //总关注人数
};
export interface topicListRequestProps extends pageRequestProps {
  topic_id: number;
  sort_type: 1 | 2; //排序( 1：默认  2：最新）
}
// 话题下列表信息
export interface topListProps {
  data: bookInfoProps[];
  page_info: pageProps;
}
export interface topicDetailsProps extends topicProps {
  extension: topicExtensionProps;
}
// 话题书架
export interface topCaseProps {
  page_info: pageProps;
  data: {
    book_id: number; //书籍ID
    topic_id: number; //话题ID
    topic_title: string; //话题标题
    author_name: string; //作者笔名
    description: string; //简介
    tags: string[]; //书籍标签
  }[];
}
