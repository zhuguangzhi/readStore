import { bookInfoProps, pageProps } from '@/type/book';

export type worksListProps = {
  data: bookInfoProps[];
  page_info: pageProps;
};
// 创建、修改章节、保存草稿
export type creatChapterProps = {
  book_id: number; //书籍ID
  chapter_id?: number; //章节id
  cname?: string; //章节标题
  content: string; //内容
  word_count: number; //字数
  is_draft: 1 | 2; //是否存稿( 1：是  2：否 ）
  line_count: number; //总行数
};
// 章节详情
export type chapterDetailsProps = {
  book_id: number; //书籍ID
  chapter_id: number; //最后更新章节ID
  cname: string; //章节标题
  word_count: number; //总字数
  //章节状态( 1:已发布  0：待审  -1：驳回  -2：存稿  -3：定时发布  -4：删除 -5：复审  -6：隐藏  -7：草稿 )
  chapter_status: -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1;
  chapter_status_text: string; //章节状态描述
  content: string; //内容
  reject_reason: string; //驳回原因
};
// 签约流程
export type signProcessProps = {
  book_id: number;
};
