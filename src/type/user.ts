import { bookInfoProps, pageProps } from '@/type/book';

//用户信息
export type authorProps = {
  id: number; //主键ID
  name: string; //名称
  nickname: string; //昵称
  is_author: 1 | 2; //是否是作者(1：是 2：否)
  is_author_desc: '读者' | '作者'; //用户身份信息
  pen_name: string; //笔名
  user_image: string; //用户头像
  user_image_url: string; //用户头像(完整地址)
  mobile: string; //手机号
  sex: 0 | 1 | 2; //性别
  sex_desc: '男' | '女' | '未知'; //性别 1：男 2：女 0 ：未知
  birthday: string; //生日
  address: string; //地址
  description: string; //描述
  money: number; //账户金额
  is_password_set: 0 | 1; //是否设置密码
  bound_qq: 0 | 1; //是否绑定QQ
  bound_wechat: 0 | 1; //是否绑定微信
  bound_phone: 1 | 0; //是否绑定手机号
  user_status: number; //用户状态
  user_status_desc: string; //用户状态描述
  chart_description: string; //推荐语
  is_vip: 1 | 2; //是否是vip(1：是 2：否)
  fans: number; //粉丝数
  follows: number; //关注数
  approvals: number; //获赞数
  is_new_user: 1 | 2; //是否是新用户( 1:是  2:否 )
};
// 修改个人信息
export type editInfoProps = {
  nickname: string; //昵称
  sex: 0 | 1 | 2; //性别
  birthday: string;
  description: string; //描述
  user_image: string; //头像
};
// 修改密码
export type editPasswordProps = {
  password: string; //用户密码
  password_confirmation: string; //确认密码
  unlock_key: string; //手机验证码成功KEY值
  mobile: string; //手机号
};

// 账号密码登陆
export type accountLoginProps = {
  account: string | number; //手机号
  password: string; // 密码
};
// 手机号登陆
export type phoneLoginProps = {
  mobile: string | number; //手机号
  captcha_code: number; //验证码
  captcha_key: string; //验证码Key值
};
// 登陆返回结果
export type loginResultProps = { access_token: string };
// 验证码返回结果 verify_key（发送检验）和captcha_key（接口获取）是同一个值，后端不一致导致
export type sendCodeResultProps = {
  captcha_key: string;
  verify_key: string;
};
//发送验证码
export type sendCodeProps = Omit<
  phoneLoginProps,
  'captcha_code' | 'captcha_key'
>;
//校验验证码
export type checkCodeProps = phoneLoginProps;
// 注册
export type registerProps = {
  mobile: string;
  verify_key: string; //手机验证码成功KEY值
  nickname?: string;
  password: string;
};
// 举报配置
export type reportOptionProps = {
  id: number; //主键ID
  reason: string; //原因
  is_default: 1 | 2; //是否默认( 1：是  2：否 ）
};
// 举报
export type reportProps = {
  book_id: number;
  chapter_id: number;
  report_reason_id: number; //举报原因ID
  report_detail: string; //举报详情
};
//关注
export type attentionUserProps = {
  attention_user_id: number; //关注用户的id
  is_attention: 1 | 2; //是否关注( 1：是  2：否 ）
};

// 作者书籍信息
export interface authorInfoProps {
  id: number; //主键ID
  pen_name: string; //笔名
  is_signing_author: 1 | 2; //是否是签约作者( 1：是  2：否 ）
  user_image_url: string; //头像
  book_count: number; //作品总数
  word_count: string; //总字数
  write_day: number; //创作天数
  continue_count: number; //连载书籍数
  continue_books: bookInfoProps[]; //连载书籍
  books: bookInfoProps[]; //全部书籍
}
// 作者个人信息
export type authorPersonalProps = {
  id: number; //主键ID
  real_name: string; //真实姓名
  pen_name: string; //笔名
  qq: number; //QQ号
  email: string; //邮箱
  address: string; //地址
  id_card: string; //身份证号
  id_card_status: 1 | 3; //身份认证状态(1：否 3 完成 ）
  bank_card: string; //银行卡号
  bank_card_status: 1 | 2; //银行卡认证状态(1 否， 2 认证完成 ）
  mobile: string; //手机号
  is_password_set: 1 | 2; //密码是否设置( 1：是  2：否 ）
  is_pen_name_set: 1 | 2; //笔名是否设置( 1：是  2：否 ）
};
// 粉丝和关注信息
export type fansListProp = {
  id: number; //主键ID
  user_id: number; //用户ID
  nickname: string; //用户昵称
  user_image_url: string; //用户头像地址
  is_attention: 1 | 2; //是否关注( 1：是  2：否 ）
};
export type fansProps = {
  page_info: pageProps;
  data: fansListProp[];
};
// 获赞列表
export type approvalListProps = {
  id: number; //主键ID
  content: string; //评论内容
  approval_user_id: number; //点赞用户ID
  approval_user_nickname: string; //点赞用户迷城
  approval_user_image_url: string; //点赞用户头像地址
  create_time: string; //创建时间
};
export type fansApprovalProps = {
  page_info: pageProps;
  data: approvalListProps[];
};

// vip充值选项列表
export type vipRechargeProps = {
  id: number;
  title: string; //标题
  money: string; //金额
  type: 1 | 2 | 3; //充值类型( 1:月卡 2:季卡 3:年卡 ）
  is_continuous: 2 | 1; //是否连续( 1:是  2:否 )
  description: string; //描述
};
