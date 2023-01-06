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
  worksListProps,
} from '@/type/authorAdmin/worksManager';
import { adminCommentRequestProps } from '@/type/authorAdmin/commentManager';
import {
  codewordCalendarProps,
  dataStatisticsProps,
} from '@/type/authorAdmin/home';

export const ErrorCheck = <T>(val: ResponseData<T> | null) => {
  if (val?.status_code === 200) return true;
  // token校验失败
  // API_COMM_011  未登录或登录状态失效
  // API_COMM_012 token不正确
  if (
    val?.error_code === 'API_COMM_011' ||
    val?.error_code === 'API_COMM_012'
  ) {
    // 清空token
    clearToken();
  }
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
};
// --------------------------作者后台end-------------------------------------------------
