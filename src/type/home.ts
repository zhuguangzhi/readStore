// 首页 推荐位 vip 新书书籍集合
import { bookInfoProps } from '@/type/book';
import { authorProps } from '@/type/user';

type homeProps = {
  id: number; //主键ID
  chart_name: string; //推荐位名称
  chart_type: number; //推荐位类型
  channel_type: 1 | 2; //频道类型 1：男频 2：女频
  amount: number; //显示数量
  chart_sort: number; //推荐位排序
  chart_form: 1 | 2 | 3; //推荐位推荐形式 1：书籍 2：书单 3：作者
  banner_image_url: string; //背景图
};
export interface homeChartProps extends homeProps {
  data: bookInfoProps[];
}
//公告
export type newsProps = {
  id: number; //主键ID
  category_id: number; //分类ID
  title: string; //标题
  content?: string; //内容
  create_time: string;
};
// 作者推荐
export interface authorRecommend extends homeProps {
  data: authorProps[];
}
//话题
export interface topicProps extends homeProps {
  data: {
    topic_id: number;
    chart_sort: number; //推荐序号
    album_id: number; //书单ID
    title: string; //名称
    cover: string; //封面路径
    cover_url: string; //封面URL地址
  }[];
}
