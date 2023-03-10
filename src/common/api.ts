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
import {
  homeBookListProps,
  homeBookListRequestProps,
  newsProps,
} from '@/type/home';
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
  let msg = val?.error_user_msg || '????????????';
  // token????????????
  // API_COMM_011  ??????????????????????????????
  // API_COMM_012 token?????????
  // API_MESSAGE_007 ??????????????????????????????
  // API_COMM_013 ????????????????????????????????????
  // API_ESIGN_007  API_ESIGN_008 API_ESIGN_015  ???????????????????????????
  switch (val?.error_code) {
    case 'API_COMM_011':
    case 'API_COMM_012': {
      msg = '??????????????????????????????';
      //  ??????????????? ??????????????????
      EventBars.emit(Bus_OpenLogin);
      // ??????token
      clearToken();
      break;
    }
    case 'API_MESSAGE_007': {
      msg = '????????????????????????~';
      break;
    }
    case 'API_COMM_013': {
      msg = '??????????????????,???????????????';
      break;
    }
    case 'API_ESIGN_007' || 'API_ESIGN_008' || 'API_ESIGN_015': {
      msg = '?????????????????????????????????????????????';
      break;
    }
  }
  //  ??????loading
  EventBars.emit(Bus_CloseLoading);
  message.error(msg);
  return false;
};

const apiUrl = baseApiUrl;
export const Home = {
  //?????????????????? <??????>
  getHomeBook: <T>() => http.get<T>(`${apiUrl}/chart`, {}),
  // ?????????????????? <???>
  getHomeBookList: (p: homeBookListRequestProps) =>
    http.get<ResponseData<homeBookListProps>>(
      `${apiUrl}/chart/list/${p.chart_place}`,
      p,
    ),
  //????????????
  getSwiperBook: <T>() => http.get<T>(`${apiUrl}/chart/banner`, {}, false),
  //??????
  getNews: <T>() => http.get<T>(`${apiUrl}/chart/index/5`, {}, false),
  //?????????
  getVane: <T>() => http.get<T>(`${apiUrl}/chart/index/6`, {}, false),
  //????????????
  getAuthorRecommend: <T>() =>
    http.get<T>(`${apiUrl}/chart/index/7`, {}, false),
  //????????????
  getHotTopicList: <T>() => http.get<T>(`${apiUrl}/chart/index/8`, {}, false),
  //  ????????????
  getNewsInfo: (id: number) =>
    http.post<ResponseData<newsProps>>(`${apiUrl}/article/detail/${id}`, {}),
};
export const Book = {
  //??????
  approval: <T>(p: approvalProps) =>
    http.post<T>(`${apiUrl}/bookApproval/store`, p),
  //?????????
  rank: (p: rankParamProps) =>
    http.post<ResponseData<rankBookInfoProps>>(`${apiUrl}/rank`, p),
  //  ????????????
  addBookCase: (p: { book_id: number }) =>
    http.post<ResponseData<{}>>(`${apiUrl}/bookcase/store`, p),
  //  ??????????????????
  getBookContainer: (p: { book_id: number; chapter_id?: number }) => {
    p['chapter_id'] = p.chapter_id ? p.chapter_id : 0;
    return http.post<ResponseData<readBookProps>>(`${apiUrl}/chapter/read`, p);
  },
  //  ??????????????????
  getBookInfo: (p: { id: number }) =>
    http.post<ResponseData<readBookInfoProps>>(`${apiUrl}/book/detail`, p),
  //  ??????????????????
  getBookCategory: (p: { channel_type?: 0 | 1 | 2; pid?: number }) =>
    http.post<ResponseData<bookCategoryProps[]>>(
      `${apiUrl}/book/category`,
      cleanObject(p),
    ),
  //  ????????????
  getBookLibrary: (p: bookLibraryRequestProps) =>
    http.post<ResponseData<rankBookInfoProps>>(
      `${apiUrl}/book/library`,
      cleanObject(p),
    ),
  //   ??????????????????
  saveReadHistory: (p: saveReadHistoryProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/userRead/store`, p),
};
export const Comment = {
  //  ????????????
  getComment: (p: commentRequestProps) =>
    http.post<ResponseData<readComponentProps>>(`${apiUrl}/comment/list`, p),
  // ?????????????????????
  getCommentReply: (p: commentReplyRequestProps) =>
    http.post<ResponseData<commentReply>>(`${apiUrl}/comment/reply/list`, p),
  //  ???????????????
  replyStore: (p: replyStoreRequestProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/reply/replyStore`, p),
  //  ???????????????
  reply: (p: replyRequestProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/reply/store`, p),
  //  ????????????
  commentStore: (p: commentStoreRequestProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/store`, p),
  //  ????????????
  commentApproval: (p: commentApprovalProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/comment/approval`, p),
};
export const User = {
  // ??????token
  refreshToken: () =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/refreshToken`,
      {},
    ),
  // ???????????????
  phoneLogin: (p: phoneLoginProps) =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/phoneLogin`,
      p,
      false,
    ),
  // ??????????????????
  accountLogin: (p: accountLoginProps) =>
    http.post<ResponseData<loginResultProps>>(
      `${apiUrl}/auth/accountLogin`,
      p,
      false,
    ),
  // ??????????????????
  getUserInfo: () =>
    http.post<ResponseData<authorProps>>(`${apiUrl}/users/info`, {}),
  // ???????????????
  sendCode: (p: sendCodeProps) =>
    http.post<ResponseData<sendCodeResultProps>>(
      `${apiUrl}/captcha/send`,
      p,
      false,
    ),
  // ???????????????
  checkCode: (p: checkCodeProps) =>
    http.post<ResponseData<sendCodeResultProps>>(`${apiUrl}/captcha/verify`, p),
  // ??????
  register: (p: registerProps) =>
    http.post<ResponseData<loginResultProps>>(`${apiUrl}/auth/register`, p),
  // ????????????
  changePassword: (p: editPasswordProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/auth/setPassword`, p),
  // ????????????
  logout: () => http.post<ResponseData<{}>>(`${apiUrl}/auth/logout`, {}),
  //  ??????????????????
  getReportOption: () =>
    http.get<ResponseData<reportOptionProps[]>>(
      `${apiUrl}/config/reportReason`,
      {},
    ),
  //  ??????
  reportChapter: (p: reportProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/report/chapter`, p),
  //  ??????????????????
  editInfo: (p: editInfoProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/edit`, p),
  //  ??????
  attentionUser: (p: attentionUserProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/attention`, p),
  //  ??????????????????
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
  // ????????????
  delComment: (p: delCommentProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/delComment`, p),
  //  ??????????????????
  getMyBookList: (p: pageRequestProps) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/bookcase/list`, p),
  //  ??????????????????
  getReadHistory: (p: pageRequestProps) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/userRead/list`, p),
  //  ?????????????????????
  delMyBooks: (p: { book_id: string }) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/bookcase/destroy`, p),
  //  ??????????????????????????????
  delMyBooksHistory: (p: { book_id: string }) =>
    http.post<ResponseData<myBookListProps>>(`${apiUrl}/userRead/destroy`, p),

  //  ??????????????????
  getAuthorInfo: (p: { id: number }) =>
    http.post<ResponseData<authorInfoProps>>(
      `${apiUrl}/show/authorInfo/${p.id}`,
      {},
    ),
  //  ??????????????????
  getFans: (p: pageRequestProps) =>
    http.post<ResponseData<fansProps>>(`${apiUrl}/users/fans`, p),
  //  ??????????????????
  getAttention: (p: pageRequestProps) =>
    http.post<ResponseData<fansProps>>(`${apiUrl}/users/attentions`, p),
  //  ??????????????????
  getApprovalList: (p: pageRequestProps) =>
    http.post<ResponseData<fansApprovalProps>>(
      `${apiUrl}/users/getApprovalList`,
      p,
    ),
  //  ??????????????????
  getSystemMessage: (p: pageRequestProps & { message_type: number }) =>
    http.post<ResponseData<personalMessageProps>>(
      `${apiUrl}/users/messages`,
      p,
    ),
  //  ??????????????????
  readMessageForId: (p: { id: number }) =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/messages/read/${p.id}`, {}),
  //  ??????????????????
  readAllMessage: () =>
    http.post<ResponseData<{}>>(`${apiUrl}/users/messages/read`, {}),
  //  ??????vip????????????
  getVipMoneyOption: () =>
    http.get<ResponseData<vipRechargeProps[]>>(`${apiUrl}/config/recharge`, {}),
  //  ??????
  pay: (p: payProps) => http.post<ResponseData<string>>(`${apiUrl}/pay/pay`, p),
};
export const Topic = {
  // ????????????
  getTopicCase: (p: pageRequestProps) =>
    http.post<ResponseData<topCaseProps>>(
      `${apiUrl}/bookcase/topicBookList`,
      p,
    ),
  // ????????????
  getTopicHistory: (p: pageRequestProps) =>
    http.post<ResponseData<topCaseProps>>(
      `${apiUrl}/userRead/topicBookList`,
      p,
    ),
  getTopicBookList: (p: topicListRequestProps) =>
    http.post<ResponseData<topicBookListProps>>(`${apiUrl}/topic/bookList`, p),
  getTopicDetails: (p: { id: number }) =>
    http.post<ResponseData<topicDetailsProps>>(`${apiUrl}/topic/detail`, p),
  //  ????????????
  getTopicList: (p: pageRequestProps) =>
    http.post<ResponseData<topicListProps>>(`${apiUrl}/topic/list`, p),
  //  ????????????
  attentionTopic: (p: attentionTopicProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/user/topic/attention`, p),
};
// --------------------------????????????start-------------------------------------------------
export const AuthorBook = {
  //   ????????????????????????
  getAuthorBook: (p: pageRequestProps) =>
    http.post<ResponseData<worksListProps>>(`${apiUrl}/author/book/list`, p),
  //  ????????????
  deleteAuthorBook: (p: { id: number }) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/book/delete`, p),
  //  ????????????
  createAuthorBook: (p: createBooksProps) =>
    http.post<ResponseData<{ book_id: number; chapter_id: number }>>(
      `${apiUrl}/author/book/store`,
      p,
    ),
  //  ????????????
  editAuthorBook: (p: createBooksProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/book/edit`, p),
  //  ????????????
  getAuthorBookDetails: (p: { id: number }) =>
    http.post<ResponseData<bookInfoProps>>(`${apiUrl}/author/book/detail`, p),
  //  ????????????
  createWorksChapter: (p: creatChapterProps) =>
    http.post<ResponseData<{ chapter_id: number }>>(
      `${apiUrl}/author/chapter/store`,
      p,
    ),
  //  ????????????
  editWorksChapter: (p: creatChapterProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/chapter/edit`, p),
  //  ????????????
  worksChapterDetails: (p: { book_id: number; chapter_id?: number }) =>
    http.post<ResponseData<chapterDetailsProps>>(
      `${apiUrl}/author/chapter/detail`,
      p,
    ),
  //  ??????????????????
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
  //  ????????????
  codewordCalendar: (p: { date: string }) =>
    http.post<ResponseData<codewordCalendarProps>>(
      `${apiUrl}/author/codewordCalendar`,
      p,
    ),
  //  ????????????
  dataStatistics: () =>
    http.post<ResponseData<dataStatisticsProps>>(
      `${apiUrl}/author/statistics`,
      {},
    ),
  //  ????????????
  writeClass: () =>
    http.get<ResponseData<writeClassProps[]>>(
      `${apiUrl}/author/writingClass`,
      {},
    ),
  //  ????????????
  getAllFee: () =>
    http.post<ResponseData<incomeTotalProps>>(
      `${apiUrl}/author/income/total`,
      {},
    ),
};
export const AuthorContract = {
  // ??????????????????
  signApply: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/signapply`, p),
  //  ?????????????????????
  signApplyStep: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/signapplystep`, p),
  //  ????????????????????????
  authorInfoAudit: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/authorinfoapply`, p),
  //   ?????????????????????
  authorInfoStep: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/authorinfoapplystep`, p),
  //  ????????????
  contractApply: (p: signProcessProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/contractapply`, p),
};
export const AuthorPersonal = {
  // ????????????????????????
  getPersonalInfo: () =>
    http.post<ResponseData<authorPersonalProps>>(`${apiUrl}/author/info`, {}),
  //  ????????????
  getContractList: (p: requestContractProps) =>
    http.post<ResponseData<contractListProps>>(`${apiUrl}/author/sign/list`, p),
  //  ????????????
  signFaceVerify: (p: faceVerifyProps) =>
    http.post<ResponseData<{ link: string }>>(
      `${apiUrl}/author/sign/faceverify`,
      p,
    ),
  //  ????????????????????????
  getSignFaceVerifyInfo: (p: { user_id: string }) =>
    http.post<ResponseData<{ id_card: string; real_name: string }>>(
      `${apiUrl}/author/sign/faceverifyinfo`,
      p,
    ),
  //  ???????????????
  bankVerify: (p: bankVerifyProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/sign/bankverify`, p),
  //  ?????????????????????
  getBankVerifyInfo: (p: { user_id: string }) =>
    http.post<ResponseData<bankInfoProps>>(
      `${apiUrl}/author/sign/bankverifyinfo`,
      p,
    ),
  //   ??????????????????
  getBankList: (p: { keywords: string }) =>
    http.post<ResponseData<bankListProps[]>>(
      `${apiUrl}/author/sign/bankinfo`,
      p,
    ),
  //  ????????????????????????
  modifyAuthorBaseInfo: (p: modifyAuthorBaseInfoProps) =>
    http.post<ResponseData<{}>>(`${apiUrl}/author/edit`, p),
  //   ??????????????????
  authorMessage: (p: authorMessageRequestProps) =>
    http.post<ResponseData<authorMessageProps>>(`${apiUrl}/author/messages`, p),
};
export const AuthorInCome = {
  //  ??????????????????
  incomeTrend: (p: { year: string }) =>
    http.post<ResponseData<number[]>>(`${apiUrl}/author/income/trend`, p),
  //  ????????????
  incomeList: (p: incomeListRequestProps) =>
    http.post<ResponseData<incomeListProps>>(`${apiUrl}/author/income/list`, p),
  //  ????????????
  incomeDistribute: (p: { month: string | undefined }) =>
    http.post<ResponseData<incomeDistributeProps>>(
      `${apiUrl}/author/income/distribute`,
      cleanObject(p),
    ),
};

// --------------------------????????????end-------------------------------------------------
