import { pageProps, pageRequestProps } from '@/type/book';
import { messageListProps } from '@/type/personalCenter';

// 修改作者基本信息
export type modifyAuthorBaseInfoProps = {
  qq?: string;
  email?: string;
  address?: string;
  pen_name?: string;
  postcode?: string;
};

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

// 身份证认证
export type faceVerifyProps = {
  user_id: string; //作者ID
  id_card: string; //身份证id
  name: string; //姓名
};
// 银行卡认证
export type bankVerifyProps = {
  bank_card: string; //银行卡号
  user_id: string; //用户id
  bank: string; //银行名称
  bank_address: string; //支行地址
  bank_mobile: string; //手机号
  bank_number: string; //银行行号
};
// 银行卡信息
export type bankInfoProps = {
  bank_username: string; //开户行姓名
  bank_card: string; //银行卡号
  bank: string; //开户行
  bank_address: string; //具体支行
  bank_mobile: string; //预留手机号
  bank_number: string; //开户行行号
};
// 银行列表
export type bankListProps = {
  adcode: string; // 地址编号
  address: string; //地址
  city: []; //城市列表
  district: string; //所属地区
  id: string; //
  location: string; //经纬度
  name: string; //支行名称
  typecode: string; //类型编号
};

// 作者消息通知请求惨
export interface authorMessageRequestProps extends pageRequestProps {
  message_type: 0 | 1 | 2 | 3 | 4 | 5; //( 0：全部  1：系统通知  2：审核通知  3：签约通知  4：收入通知  5：活动通知 ）
}
//作者消息通知
export interface authorMessageProps {
  page_info: pageProps;
  data: messageListProps[];
}
