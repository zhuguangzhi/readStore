import React, { useEffect, useRef, useState } from 'react';
import {
  useAttentionUser,
  useGetBookContainer,
  useGetBookInfo,
  useGetCommentData,
} from '@/utils/read';
import { useCoverUrlParams, useSearchParam } from '@/hook/url';
import { AuthorId, BookId, OpenComment } from '@/constants/url';
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
import { setArrayForId } from '@/common/publicFn';
import { netName } from '../../../public/config';
import { ReadBackTop } from '@/components/module/ReadBackTop';
import { useMounted } from '@/hook';

export default () => {
  const webContainerRef = document.querySelector(
    '.webContainer',
  ) as HTMLElement;
  const [{ [BookId]: bookId, [OpenComment]: openComment }] = useSearchParam([
    BookId,
    OpenComment,
  ]);
  // 覆盖路由 避免刷新再次打开评论框
  const coverUrl = useCoverUrlParams();
  // 滚动距离顶部的值
  const [scrollTopData, setScrollTop] = useState(0);
  // 评论框实例
  const readContainerRef = useRef<HTMLDivElement>(null);
  // 评论页数
  const [commentPage, setCommentPage] = useState(1);
  // 评论排序方式
  const [commentSlotType, setCommentSlotType] = useState<1 | 2>(2);
  // 是否打开评论弹窗
  const [isCommentModel, setCommentModel] = useState(Number(openComment) === 1);
  const oldSlotType = useRef(commentSlotType);
  // 是否使用阅读底部信息框
  // const [useOperationTab, setOperationTab] = useState(true);
  // 默认内容
  const [noData, setNoData] = useState(false);
  // 获取内容
  const { data: bookContainer, isLoading: containerLoading } =
    useGetBookContainer({ book_id: parseInt(bookId) });
  // 获取详情
  const { data: bookInfo, isLoading: infoLoading } = useGetBookInfo({
    id: parseInt(bookId),
  });
  const { setLoadingModel, userInfo } = useAuth();
  // 点赞
  const { mutate: setApproval } = useModifyApproval('readBookInfo');
  // 关注
  const { mutate: attentionUser } = useAttentionUser(
    'readBookInfo',
    parseInt(bookId),
  );

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

  // 监听 触发loading
  useEffect(() => {
    setLoadingModel(containerLoading || infoLoading);
  }, [containerLoading, infoLoading]);
  //上拉新增
  useEffect(() => {
    // 排序改变直接赋值
    if (oldSlotType.current !== commentSlotType) {
      setCommentList(commentData);
      oldSlotType.current = commentSlotType;
      return;
    }
    if (!commentData) return;
    if (commentData.page_info.total === 0) setNoData(true);
    else setNoData(false);
    let list = commentList
      ? { ...commentList }
      : { page_info: commentData.page_info, data: [] };
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
      // 显影底部信息框
      // const readContainerHeight = readContainerRef.current?.clientHeight || 0;
      // // 设置底部信息框
      // if (scrollTop + webContainerHeight <= readContainerHeight)
      //   setOperationTab(true);
      // else setOperationTab(false);
    };
  }, [commentPage, commentLoading, commentData, commentList]);
  useMounted(() => {
    coverUrl({ [BookId]: bookId });
    // document.documentElement.scrollTop = 0;
    // document.documentElement.style.scrollBehavior = 'smooth';
    // 路由跳转拦截
    // return () => {
    //   document.documentElement.style.scrollBehavior = 'initial';
    // };
  });

  return (
    <div className={'readBook'}>
      <div className={'readBook_box'}>
        <p className={'readBook_guid'} onClick={() => router.back()}>
          <span>{netName}</span>&nbsp;{'>'}&nbsp;
          <span>{bookInfo?.name}</span>
        </p>
        <p className={'readBook_title font_24 font_bold'}>{bookInfo?.name}</p>
        <div className={'readBook_bookInfo'}>
          <span>类型：{bookInfo?.category_name}</span>
          <span>字数：{translateNumber(bookInfo?.word_count || 0)}</span>
          <span>[{isFinish(bookInfo?.is_finish || 2)}]</span>
          <span>阅读：{bookInfo?.book_extension?.all_read || 0}</span>
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
        <div className={'readOperationBox'}>
          <ReadOperationTab
            bookId={bookInfo?.id}
            bookName={bookInfo?.name}
            chapterId={bookInfo?.chapter_id}
            isApproval={bookInfo?.is_user_approval || 2}
            commentChange={() => {
              webContainerRef.scrollTo({
                top: readContainerRef.current?.clientHeight || 0,
                behavior: 'smooth',
              });
            }}
            onApproval={onApprovalChange}
            onInput={() => setCommentModel(true)}
          />
        </div>
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
              setCommentPage(1);
            }}
            noData={noData}
            slotType={commentSlotType}
            sendCommentCallBack={initCommentList}
          />
        </div>
      </UseNode>
      <ReadModel
        width={'947px'}
        useTitle={false}
        className={'readBook_model'}
        open={isCommentModel}
        onCancel={() => setCommentModel(false)}
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
          noData={noData}
          getMoreComment={uploadGetMore}
          sendCommentCallBack={initCommentList}
        />
      </ReadModel>
      {/*  回到顶部*/}
      <ReadBackTop />
    </div>
  );
};
