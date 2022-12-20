import { pageRequestProps } from '@/type/book';

export interface adminCommentRequestProps extends pageRequestProps {
  book_id: number;
  start_date: string; //开始日期
  end_date: string; //结束日期
}
