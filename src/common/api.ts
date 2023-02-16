import http, { ResponseData } from '@/common/http';
import {
  approvalProps,
  bookCategoryProps,
  bookInfoProps,
  bookLibraryRequestProps,
  commentApprovalProps,
  commentReply,
  commentReplyRequestProps,
  commentRequestProps,
  commentStoreRequestProps,
  createBooksProps,
  pageRequestProps,
  rankBookInfoProps,
  rankParamProps,
  readBookInfoProps,
  readBookProps,
  readComponentProps,
  replyRequestProps,
  replyStoreRequestProps,
  saveReadHistoryProps,
} from '@/type/book';
import {
  accountLoginProps,
  fansApprovalProps,
  attentionUserProps,
  authorInfoProps,
  authorProps,
  checkCodeProps,
  editInfoProps,
  fansProps,
  loginResultProps,
  phoneLoginProps,
  registerProps,
  reportOptionProps,
  reportProps,
  sendCodeProps,
  sendCodeResultProps,
  editPasswordProps,
  authorPersonalProps,
  vipRechargeProps,
  payProps,
} from '@/type/user';
import { clearToken } from '@/hook/useAuth';
import { cleanObject } from '@/common/publicFn';
import {
  delCommentProps,
  myBookListProps,
  myCommentProps,
  personalMessageProps,
} from '@/type/personalCenter';
import { newsProps } from '@/type/home';
import {
  topCaseProps,
  topicDetailsProps,
  topicListRequestProps,
  topicBookListProps,
  topicListProps,
  attentionTopicProps,
} from '@/type/topic';
import { baseApiUrl } from '../../public/config';
import {
  chapterDetailsProps,
  creatChapterProps,
  signProcessProps,
  worksListProps,
  worksTagsProps,
} from '@/type/authorAdmin/worksManager';
import { adminCommentRequestProps } from '@/type/authorAdmin/commentManager';
import {
  codewordCalendarProps,
  dataStatisticsProps,
  incomeTotalProps,
  writeClassProps,
} from '@/type/authorAdmin/home';
import {
  authorMessageProps,
  authorMessageRequestProps,
  bankInfoProps,
  bankListProps,
  bankVerifyProps,
  contractListProps,
  faceVerifyProps,
  modifyAuthorBaseInfoProps,
  requestContractProps,
} from '@/type/authorAdmin/personalInfo';
import EventBars from '@/common/EventBus';
import { Bus_CloseLoading, Bus_OpenLogin } from '@/constants';
import { message } from 'antd';
import {
  incomeDistributeProps,
  incomeListProps,
  incomeListRequestProps,
} from '@/type/authorAdmin/income';

export const ErrorCheck = <T>(val: ResponseData<T> | null) => {
  if (val?.status_code === 200) return true;
  let msg = val?.error_user_msg || '请求异常';
  // token校验失败
  // API_COMM_011  未登录或登录状态失效
  // API_COMM_012 token不正确
  // API_MESSAGE_007 系统通知清空未读消息
  // API_COMM_013 作者后台查看身份信息失败
  // API_ESIGN_007  API_ESIGN_008 API_ESIGN_015  签约身份认证不通过
  switch (val?.error_code) {
    case 'API_COMM_011' || 'API_COMM_012': {
      msg = '您还未登陆，请先登陆';
      //  弹出登陆框 清空用户数据
      EventBars.emit(Bus_OpenLogin);
      // 清空token
      clearToken();
      break;
    }
    case 'API_MESSAGE_007': {
      msg = '暂没有未读消息哦~';
      break;
    }
    case 'API_COMM_013': {
      msg = '身份认证失败,请完成认证';
      break;
    }
    case 'API_ESIGN_007' || 'API_ESIGN_008' || 'API_ESIGN_015': {
      msg = '身份认证未通过，请完善身份信息';
      break;
    }
  }
  //  关闭loading
  EventBars.emit(Bus_CloseLoading);
  message.error(msg);
  return false;
};

const apiUrl = baseApiUrl;
export const Home = {
  //首页书本推荐
  getHomeBook: <T>() => http.get<T>(`${apiUrl}/chart`, {}),
  //轮播书本
  getSwiperBook: <T>() => http.get<T>(`${apiUrl}/chart/banner`, {}, false),
  //新闻
  getNews: <T>() => http.get<T>(`${apiUrl}/chart/index/5`, {}, false),
  //风向标
  getVane: <T>() => http.get<T>(`${apiUrl}/chart/index/6`, {}, false),
  //作者推荐
  getAuthorRecommend: <T>() =>
    http.get<T>(`${apiUrl}/chart/index/7`, {}, false),
  //热门话题
  getHotTopicList: <T>() => http.get<T>(`${apiUrl}/chart/index/8`, {}, false),
  //  公告详情
  getNewsInfo: (id: number) =>
    http.post<ResponseData<newsProps>>(`${apiUrl}/article/detail/${id}`, {}),
};
export const Book = {
  //点赞
  approval: <T>(p: approvalProps) =>
    http.post<T>(`${apiUrl}/bookApproval/store`, p),
  //排行榜
  rank: (p: rankParamProps) =>
    http.post<ResponseData<rankBookInfoProps>>(`${apiUrl}/rank`, p),
  //  加入书架
  addBookCase: (p: { book_id: number }) =>
    http.post<ResponseData<{}>>(`${apiUrl}/bookcase/store`, p),
  //  获取书本内容
  getBookContainer: (p: { book_id: number; chapter_id?: number }) => {
    p['chapter_id'] = p.chapter_id ? p.chapter_id : 0;
    return http.post<ResponseData<readBookProps>>(`${apiUrl}/chapter/read`, p);
  },
  //  获取书本详情
  getBookInfo: (p: { id: number }) =>
    http.post<ResponseData<readBookInfoProps>>(`${apiUrl}/book/detail`, p),
  //  获取主题分类
  getBookCategory: (p: { channel_type?: 0 | 1 | 2; pid?: number }) =>
    http.post<ResponseData<bookCategoryProps[]>>(
      `${apiUrl}/book/category`,
      cleanObject(p),
    ),
  //  获取书库
  getBookLibrary: (p: bookLibraryRequestProps) =>
    http.post<ResponseData<rankBookInfoProps>>(
      `${apiUrl}/book/library`,
      cleanObject(p),
    ),
  //   保存阅读记录
  saveReadHistory: (p: saveReadHistoryProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/userRead/store`, p),
};
export const Comment = {
  //  获取评论
  getComment: (p: commentRequestProps) =>
    http.post<ResponseData<readComponentProps>>(`${apiUrl}/comment/list`, p),
  // 获取评论的回复
  getCommentReply: (p: commentReplyRequestProps) =>
    http.post<ResponseData<commentReply>>(`${apiUrl}/comment/reply/list`, p),
  //  回复的回复
  replyStore: (p: replyStoreRequestProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/reply/replyStore`, p),
  //  评论的回复
  reply: (p: replyRequestProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/reply/store`, p),
  //  发表评论
  commentStore: (p: commentStoreRequestProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/store`, p),
  //  评论点赞
  commentApproval: (p: commentApprovalProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/approval`, p),
};
export const User = {
  // 刷新token
  refreshToken: () =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/refreshToken`,
      {},
    ),
  // 手机号登陆
  phoneLogin: (p: phoneLoginProps) =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/phoneLogin`,
      p,
      false,
    ),
  // 账号密码登陆
  accountLogin: (p: accountLoginProps) =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/accountLogin`,
      p,
      false,
    ),
  // 获取用户信息
  getUserInfo: () =>
    http.post<ResponseData<authorProps>>(`${apiUrl}/users/info`, {}),
  // 发送验证码
  sendCode: (p: sendCodeProps) =>
    http.post<ResponseData<sendCodeResultProps>>(
      `${apiUrl}/captcha/send`,
      p,
      false,
    ),
  // 校验验证码
  checkCode: (p: checkCodeProps) =>
    http.post<ResponseData<sendCodeResultProps>>(`${apiUrl}/captcha/verify`, p),
  // 注册
  register: (p: registerProps) =>
    http.post<ResponseData<loginResultProps>>(`${apiUrl}/auth/register`, p),
  // 修改密码
  changePassword: (p: editPasswordProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/auth/setPassword`, p),
  // 退出登陆
  logout: () => http.post<ResponseData<{}>>(`${apiUrl}/auth/logout`, {}),
  //  获取举报配置
  getReportOption: () =>
    http.get<ResponseData<reportOptionProps[]>>(
      `${apiUrl}/config/reportReason`,
      {},
    ),
  //  举报
  reportChapter: (p: reportProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/report/chapter`, p),
  //  修改个人信息
  editInfo: (p: editInfoProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/edit`, p),
  //  关注
  attentionUser: (p: attentionUserProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/attention`, p),
  //  申请成为作者
  applyAuthor: () =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/applyAuthor`, {}),
};
export const PersonalCenter = {
  getAllComment: (p: pageRequestProps) =>
    http.post<ResponseData<myCommentProps>>(`${apiUrl}/users/commentAReply`, p),
  getMyComment: (p: pageRequestProps) =>
    http.post<ResponseData<myCommentProps>>(`${apiUrl}/users/comments`, p),
  getMyReply: (p: pageRequestProps) =>
    http.post<ResponseData<myCommentProps>>(`${apiUrl}/users/receiveReply`, p),
  // 删除评论
  delComment: (p: delCommentProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/delComment`, p),
  //  获取我的书架
  getMyBookList: (p: pageRequestProps) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/bookcase/list`, p),
  //  获取历史记录
  getReadHistory: (p: pageRequestProps) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/userRead/list`, p),
  //  从我的书架移除
  delMyBooks: (p: { book_id: string }) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/bookcase/destroy`, p),
  //  从我的书架历史中移除
  delMyBooksHistory: (p: { book_id: string }) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/userRead/destroy`, p),

  //  获取作者信息
  getAuthorInfo: (p: { id: number }) =>
    http.post<ResponseData<authorInfoProps>>(
      `${apiUrl}/show/authorInfo/${p.id}`,
      {},
    ),
  //  获取粉丝列表
  getFans: (p: pageRequestProps) =>
    http.post<ResponseData<fansProps>>(`${apiUrl}/users/fans`, p),
  //  获取关注列表
  getAttention: (p: pageRequestProps) =>
    http.post<ResponseData<fansProps>>(`${apiUrl}/users/attentions`, p),
  //  获取粉丝列表
  getApprovalList: (p: pageRequestProps) =>
    http.post<ResponseData<fansApprovalProps>>(
      `${apiUrl}/users/getApprovalList`,
      p,
    ),
  //  获取消息列表
  getSystemMessage: (p: pageRequestProps & { message_type: number }) =>
    http.post<ResponseData<personalMessageProps>>(
      `${apiUrl}/users/messages`,
      p,
    ),
  //  单个消息已读
  readMessageForId: (p: { id: number }) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/messages/read/${p.id}`, {}),
  //  所有消息已读
  readAllMessage: () =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/messages/read`, {}),
  //  获取vip金额配置
  getVipMoneyOption: () =>
    http.get<ResponseData<vipRechargeProps[]>>(`${apiUrl}/config/recharge`, {}),
  //  充值
  pay: (p: payProps) => http.post<ResponseData<string>>(`${apiUrl}/pay/pay`, p),
};
export const Topic = {
  // 话题书架
  getTopicCase: (p: pageRequestProps) =>
    http.post<ResponseData<topCaseProps>>(
      `${apiUrl}/bookcase/topicBookList`,
      p,
    ),
  // 话题历史
  getTopicHistory: (p: pageRequestProps) =>
    http.post<ResponseData<topCaseProps>>(
      `${apiUrl}/userRead/topicBookList`,
      p,
    ),
  getTopicBookList: (p: topicListRequestProps) =>
    http.post<ResponseData<topicBookListProps>>(`${apiUrl}/topic/bookList`, p),
  getTopicDetails: (p: { id: number }) =>
    http.post<ResponseData<topicDetailsProps>>(`${apiUrl}/topic/detail`, p),
  //  话题列表
  getTopicList: (p: pageRequestProps) =>
    http.post<ResponseData<topicListProps>>(`${apiUrl}/topic/list`, p),
  //  关注话题
  attentionTopic: (p: attentionTopicProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/user/topic/attention`, p),
};
// --------------------------作者后台start-------------------------------------------------
export const AuthorBook = {
  //   获取作者作品列表
  getAuthorBook: (p: pageRequestProps) =>
    http.post<ResponseData<worksListProps>>(`${apiUrl}/author/book/list`, p),
  //  删除作品
  deleteAuthorBook: (p: { id: number }) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/book/delete`, p),
  //  创建作品
  createAuthorBook: (p: createBooksProps) =>
    http.post<ResponseData<{ book_id: number; chapter_id: number }>>(
      `${apiUrl}/author/book/store`,
      p,
    ),
  //  编辑作品
  editAuthorBook: (p: createBooksProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/book/edit`, p),
  //  作品详情
  getAuthorBookDetails: (p: { id: number }) =>
    http.post<ResponseData<bookInfoProps>>(`${apiUrl}/author/book/detail`, p),
  //  创建章节
  createWorksChapter: (p: creatChapterProps) =>
    http.post<ResponseData<{ chapter_id: number }>>(
      `${apiUrl}/author/chapter/store`,
      p,
    ),
  //  修改章节
  editWorksChapter: (p: creatChapterProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/chapter/edit`, p),
  //  章节详情
  worksChapterDetails: (p: { book_id: number; chapter_id?: number }) =>
    http.post<ResponseData<chapterDetailsProps>>(
      `${apiUrl}/author/chapter/detail`,
      p,
    ),
  //  获取标签分类
  getTagsList: () =>
    http.post<ResponseData<worksTagsProps>>(
      `${apiUrl}/author/book/keyword`,
      {},
    ),
};
export const AuthorComment = {
  getCommentList: (p: adminCommentRequestProps) =>
    http.post<ResponseData<readComponentProps>>(
      `${apiUrl}/author/comment/list`,
      p,
    ),
};
export const AuthorHome = {
  //  码字日历
  codewordCalendar: (p: { date: string }) =>
    http.post<ResponseData<codewordCalendarProps>>(
      `${apiUrl}/author/codewordCalendar`,
      p,
    ),
  //  数据统计
  dataStatistics: () =>
    http.post<ResponseData<dataStatisticsProps>>(
      `${apiUrl}/author/statistics`,
      {},
    ),
  //  写作课堂
  writeClass: () =>
    http.get<ResponseData<writeClassProps[]>>(
      `${apiUrl}/author/writingClass`,
      {},
    ),
  //  全部稿费
  getAllFee: () =>
    http.post<ResponseData<incomeTotalProps>>(
      `${apiUrl}/author/income/total`,
      {},
    ),
};
export const AuthorContract = {
  // 作者申请签约
  signApply: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/signapply`, p),
  //  作者申请下一步
  signApplyStep: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/signapplystep`, p),
  //  信息确认提交审核
  authorInfoAudit: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/authorinfoapply`, p),
  //   信息确认下一步
  authorInfoStep: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/authorinfoapplystep`, p),
  //  合同申请
  contractApply: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/contractapply`, p),
};
export const AuthorPersonal = {
  // 获取作者个人信息
  getPersonalInfo: () =>
    http.post<ResponseData<authorPersonalProps>>(`${apiUrl}/author/info`, {}),
  //  合同查询
  getContractList: (p: requestContractProps) =>
    http.post<ResponseData<contractListProps>>(`${apiUrl}/author/sign/list`, p),
  //  身份认证
  signFaceVerify: (p: faceVerifyProps) =>
    http.post<ResponseData<{ link: string }>>(
      `${apiUrl}/author/sign/faceverify`,
      p,
    ),
  //  查看身份认证信息
  getSignFaceVerifyInfo: (p: { user_id: string }) =>
    http.post<ResponseData<{ id_card: string; real_name: string }>>(
      `${apiUrl}/author/sign/faceverifyinfo`,
      p,
    ),
  //  银行卡认证
  bankVerify: (p: bankVerifyProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/bankverify`, p),
  //  查看银行卡信息
  getBankVerifyInfo: (p: { user_id: string }) =>
    http.post<ResponseData<bankInfoProps>>(
      `${apiUrl}/author/sign/bankverifyinfo`,
      p,
    ),
  //   查询支行列表
  getBankList: (p: { keywords: string }) =>
    http.post<ResponseData<bankListProps[]>>(
      `${apiUrl}/author/sign/bankinfo`,
      p,
    ),
  //  修改作者基础信息
  modifyAuthorBaseInfo: (p: modifyAuthorBaseInfoProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/edit`, p),
  //   作者消息通知
  authorMessage: (p: authorMessageRequestProps) =>
    http.post<ResponseData<authorMessageProps>>(`${apiUrl}/author/messages`, p),
};
export const AuthorInCome = {
  //  总收入趋势图
  incomeTrend: (p: { year: string }) =>
    http.post<ResponseData<number[]>>(`${apiUrl}/author/income/trend`, p),
  //  收入明细
  incomeList: (p: incomeListRequestProps) =>
    http.post<ResponseData<incomeListProps>>(`${apiUrl}/author/income/list`, p),
  //  收入分布
  incomeDistribute: (p: { month: string | undefined }) =>
    http.post<ResponseData<incomeDistributeProps>>(
      `${apiUrl}/author/income/distribute`,
      cleanObject(p),
    ),
};

// --------------------------作者后台end-------------------------------------------------
