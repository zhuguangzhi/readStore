// 收入明细请求
import { pageProps, pageRequestProps } from '@/type/book';

export interface incomeListRequestProps extends pageRequestProps {
  book_id?: string; //书籍id
  signing_type?: 1 | 2 | 3; //1:买断签约 2:分成签约 3:保底签约
  is_finish?: 1 | 2; //是否完本 1:完结 2:连载
  date?: string; //日期
}
// 收入明细 ---------- start
export type incomeListDataProps = {
  id: number; //书籍ID
  name: string; //书籍
  date: string; //发放日期
  signing_type: 1 | 2 | 3; //签约类型
  signing_type_text: string; //签约类型
  base_royalties: number; //基础稿费
  vip: number; //vip分成
  gift: number; //礼物收益
  channel: number; //渠道分成
  welfare: number; //网站福利
  advert: number; //广告
  total: number; //总计
  release_time: string; //发放时间
  actual_royalties: number; //实发稿费
  searchDate: string; //时间
};
export type incomeListProps = {
  page_info: pageProps;
  data: incomeListDataProps[];
};
// 收入明细 ---------- end
// 收入分布
export type incomeDistributeProps = {
  base_royalties: number; //基础稿费
  channel: number; //渠道分成
  gift: number; //礼物收益
  vip: number; //vip分成
  welfare: number; //网站福利
  advert?: number; //广告福利
  month: string; //收入月份
};
