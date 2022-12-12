//用户信息
export type authorProps = {
  id: number; //主键ID
  name: string; //名称
  nickname: string; //昵称
  is_author: number; //是否是作者(1：是 2：否)
  is_author_desc: '读者' | '作者'; //用户身份信息
  pen_name: string; //笔名
  user_image: string; //用户头像
  mobile: string; //手机号
  sex: 0; //性别
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
// 验证码返回结果
export type sendCodeResultProps = { verify_key: string };
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
