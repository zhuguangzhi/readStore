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
