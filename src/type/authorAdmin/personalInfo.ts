import { pageProps, pageRequestProps } from '@/type/book';

export type contractProps = {
  id: number; //主键ID
  book_title: string; //书籍名称
  signed_time: string; //签约时间
  sign_status: 1 | 2 | 3 | 4; //签署状态( 1：签署中  2：签署完成  3：失败  4：拒签 )
  file_url: string; //签署完成后的合同地址（下载后的）
};
// 合同列表数据
export type contractListProps = {
  page_info: pageProps;
  data: contractProps[];
};
//请求合同参数
export interface requestContractProps extends pageRequestProps {
  search_keywords?: string;
}
