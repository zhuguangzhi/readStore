import React, { useEffect, useRef, useState } from 'react';
import {
  useAttentionUser,
  useGetBookContainer,
  useGetBookInfo,
  useGetCommentData,
} from '@/utils/read';
import { useSearchParam } from '@/hook/url';
import { AuthorId, BookId } from '@/constants/url';
import { useAuth } from '@/hook/useAuth';
import { isFinish, translateNumber } from '@/utils/format';
import { IconFont } from '@/components/IconFont';
import './index.less';
import { UseNode } from '@/components/UseNode';
import router from '@/hook/url';
import { ReadOperationTab } from '@/components/readOperationTab';
import { useModifyApproval } from '@/utils/home';
import { ReadModel } from '@/components/module/ReadModel';
import { Comment } from '@/components/comment';
import { readComponentProps } from '@/type/book';
import { ReadContainer } from '@/pages/read/readContainer';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import { setArrayForId } from '@/common/publicFn';
import { netName } from '../../../public/config';

export default () => {
  const webContainerRef = document.querySelector(
    '.webContainer',
  ) as HTMLElement;
  const [{ [BookId]: bookId }] = useSearchParam([BookId]);
  const [scrollTopData, setScrollTop] = useState(0);
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  const dispatch = useDispatch();
  // 评论框实例
  const readContainerRef = useRef<HTMLDivElement>(null);
  // 评论页数
  const [commentPage, setCommentPage] = useState(1);
  // 评论排序方式
  const [commentSlotType, setCommentSlotType] = useState<1 | 2>(2);
  const oldSlotType = useRef(commentSlotType);
  // 是否使用阅读底部信息框
  const [useOperationTab, setOperationTab] = useState(true);
  // 获取内容
  const { data: bookContainer, isLoading: containerLoading } =
    useGetBookContainer({ book_id: parseInt(bookId) });
  // 获取详情
  const { data: bookInfo, isLoading: infoLogin } = useGetBookInfo({
    id: parseInt(bookId),
  });
  const { setLoadingModel, userInfo } = useAuth();
  // 点赞
  const { mutate: setApproval } = useModifyApproval('readBookInfo');
  // 关注
  const { mutate: attentionUser } = useAttentionUser();

  const [commentList, setCommentList] = useState<
    readComponentProps | undefined
  >(undefined);
  // 获取评论内容
  const { data: commentData, isLoading: commentLoading } = useGetCommentData({
    book_id: parseInt(bookId),
    page: commentPage,
    page_size: 10,
    comment_sort_type: commentSlotType,
  });
  // 上拉加载
  const uploadGetMore = () => {
    if (
      !commentLoading &&
      commentData &&
      commentPage * 10 < commentData.page_info.total
    ) {
      setCommentPage((val) => ++val);
    }
  };
  // 设置喜欢
  const onApprovalChange = () => {
    setApproval({
      book_id: bookInfo?.id as number,
      is_approval: bookInfo?.is_user_approval === 2 ? 1 : 2,
    });
  };
  // 关注
  const onAttention = () => {
    if (!bookInfo) return;
    attentionUser({
      attention_user_id: bookInfo.author.id,
      is_attention: bookInfo.is_attention === 1 ? 2 : 1,
    });
  };
  // 重置评论列表
  const initCommentList = () => {
    setCommentPage(1);
    setCommentList(undefined);
  };

  // 监听 触发loading 只有首次获取时才会触发，避免乐观更新时触发
  useEffect(() => {
    setLoadingModel(containerLoading && infoLogin);
  }, [containerLoading, infoLogin]);
  //上拉新增
  useEffect(() => {
    // 排序改变直接赋值
    if (oldSlotType.current !== commentSlotType) {
      setCommentList(commentData);
      oldSlotType.current = commentSlotType;
      return;
    }
    console.log('commentData', commentData, commentList);
    if (!commentData || commentData.data.length === 0) return;
    let list = commentList
      ? { ...commentList }
      : { page_info: commentData.page_info, data: [] };
    // console.log('list.data',list.data,commentData.data)
    list.data = setArrayForId([...list.data, ...commentData.data]);
    list.page_info = commentData.page_info;
    setCommentList(list);
  }, [commentData]);
  useEffect(() => {
    if (!webContainerRef) return;
    webContainerRef.onscroll = () => {
      const webContainerHeight = webContainerRef.clientHeight;
      const scrollTop = webContainerRef.scrollTop;
      const scrollHeight = webContainerRef.scrollHeight;
      setScrollTop(scrollTop);
      if (scrollHeight - (webContainerHeight + scrollTop) < 500) {
        uploadGetMore();
      }
      const readContainerHeight = readContainerRef.current?.clientHeight || 0;
      // 设置底部信息框
      if (scrollTop + webContainerHeight <= readContainerHeight)
        setOperationTab(true);
      else setOperationTab(false);
    };
  }, [commentPage, commentLoading, commentData, commentList]);
  // useMounted(() => {
  //   // document.documentElement.scrollTop = 0;
  //   // document.documentElement.style.scrollBehavior = 'smooth';
  //   // 路由跳转拦截
  //   // return () => {
  //   //   document.documentElement.style.scrollBehavior = 'initial';
  //   // };
  // });

  return (
    <div className={'readBook'}>
      <div className={'readBook_box'}>
        <p className={'readBook_guid'} onClick={() => router.back()}>
          <span>{netName}</span>&nbsp;-&nbsp;
          <span>{bookInfo?.name}</span>
        </p>
        <p className={'readBook_title font_24 font_bold'}>{bookInfo?.name}</p>
        <div className={'readBook_bookInfo'}>
          <span>类型：{bookInfo?.category_name}</span>
          <span>字数：{translateNumber(bookInfo?.word_count as number)}</span>
          <span>[{isFinish(bookInfo?.is_finish || 2)}]</span>
          <span>阅读：{bookInfo?.book_extension?.all_read}</span>
          <span>更新：{bookInfo?.last_update_chapter_time}</span>
        </div>
        {/*作者信息*/}
        <div className={'readBook_author'}>
          <img
            className={'readBook_author_image cursor'}
            src={bookInfo?.author.user_image_url}
            alt=""
            onClick={() =>
              router.push('/personal/authorInfo', {
                [AuthorId]: bookInfo?.author.id,
              })
            }
          />
          <div className={'readBook_author_right'}>
            <p>
              <span>作者：</span>
              <span>{bookInfo?.author.pen_name}</span>
            </p>
            <UseNode
              rIf={
                bookInfo?.is_attention !== 1 &&
                bookInfo?.author.id !== userInfo?.id
              }
            >
              <div
                className={'readBook_author_right_btn'}
                onClick={() => onAttention()}
              >
                <IconFont
                  icon={'jia'}
                  width={'10px'}
                  height={'10px'}
                  marginRight={'2px'}
                />
                <span className={'font_12'}>关注</span>
              </div>
            </UseNode>
          </div>
        </div>
        {/*    内容*/}
        <div className={'readBook_container'} ref={readContainerRef}>
          <ReadContainer
            containerRef={readContainerRef.current}
            bookInfo={bookInfo}
            container={bookContainer?.content || ''}
            scrollTop={scrollTopData}
            allCount={bookContainer?.line_count || 1}
          />
        </div>
        <UseNode rIf={useOperationTab}>
          <div className={'readOperationBox'}>
            <ReadOperationTab
              bookId={bookInfo?.id}
              chapterId={bookInfo?.chapter_id}
              isApproval={bookInfo?.is_user_approval || 2}
              commentChange={() => {
                webContainerRef.scrollTo({
                  top: readContainerRef.current?.clientHeight || 0,
                  behavior: 'smooth',
                });
              }}
              onApproval={onApprovalChange}
              onInput={() =>
                dispatch({ type: 'global/setCommentBox', payload: true })
              }
            />
          </div>
        </UseNode>
      </div>
      {/* 评论区*/}
      <UseNode rIf={!containerLoading}>
        <div className={'readBook_comment'}>
          <Comment
            usePullLoad={false}
            isReverse={false}
            bookId={parseInt(bookId)}
            commentPage={commentPage}
            commentData={commentList}
            setSlotType={(num) => {
              setCommentSlotType(num);
              initCommentList();
            }}
            slotType={commentSlotType}
            sendCommentCallBack={initCommentList}
          />
        </div>
      </UseNode>
      <ReadModel
        width={'947px'}
        useTitle={false}
        open={globalState.openCommentBox}
        onCancel={() =>
          dispatch({ type: 'global/setCommentBox', payload: false })
        }
      >
        <Comment
          isReverse={true}
          bookId={parseInt(bookId)}
          commentPage={commentPage}
          height={'calc((100vh - 100px) * 0.9)'}
          commentData={commentList}
          setSlotType={(num) => {
            setCommentSlotType(num);
            setCommentPage(1);
          }}
          slotType={commentSlotType}
          getMoreComment={uploadGetMore}
          sendCommentCallBack={initCommentList}
        />
      </ReadModel>
    </div>
  );
};
