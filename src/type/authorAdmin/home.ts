// 日更新
export type updateDayProps = {
  date: string; //日期
  word_count: number; //总字数
};
// 码字日历
export type codewordCalendarProps = {
  total: {
    month_word_count: number; //月更新字数
  };
  data: updateDayProps[];
};
// 数据统计
export type dataStatisticsProps = {
  reader_count: number; //阅读人数
  yesterday_read_count: number; //昨日新增阅读
  approval_count: number; //作品点赞
  collection_count: number; //加入书架数
};
// 写作课堂
export type writeClassProps = {
  id: number; //主键ID
  title: string; //标题
  content: string; //内容
  create_time: string; //创建时间
  picture: string; //图片
};
// 全部稿费
export type incomeTotalProps = {
  base_royalties: number; //基础稿费
  vip: number; //vip
  gift: number; //礼物
  channel: number; //渠道
  welfare: number; //福利
  advert: number; //广告
  summary_total: number; //全部稿费
};
