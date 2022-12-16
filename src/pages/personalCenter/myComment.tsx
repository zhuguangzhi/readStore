//我的评论

import React, { useCallback, useEffect, useState } from 'react';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import ReadPopup from '@/components/module/ReadPopup';
import { DelPopup } from './utils/index';
import { useDelComment, useGetMyComment } from '@/utils/personalCenter';
import { useAuth } from '@/hook/useAuth';
import { CommentItem } from './components/commentItem';
import { PullLoad } from '@/components/module/PullLoad';
import { myCommentDataProps } from '@/type/personalCenter';
import { DefaultNoData } from '@/components/defaultNoData';
import { setArrayForId } from '@/common/publicFn';

const tabBars = [
  { key: 'all', label: '全部评论' },
  { key: 'myComment', label: '我的评论' },
  { key: 'reply', label: '收到回复' },
];

const MyComment = () => {
  const { setLoadingModel } = useAuth();
  const [commentPage, setPage] = useState(1);
  const [commentList, setCommentList] = useState<myCommentDataProps[]>([]);
  const [currentTab, setCurrentTab] = useState<'all' | 'myComment' | 'reply'>(
    'all',
  );
  // 获取评论数据
  const { data: commentData, isLoading: commentLoading } = useGetMyComment({
    page: commentPage,
    page_size: 10,
    type: currentTab,
  });
  // 删除评论方法
  const { mutate: deleteComment } = useDelComment();
  // 用于控制回复框
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  // 控制展开空内容
  const [showNullData, setNullData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [popupOption, setPopupOption] = useState({
    ids: [] as number[],
    open: false,
    title: '',
  });
  const delPopup = new DelPopup(popupOption, setPopupOption);

  // 上拉加载
  const uploadGetMore = useCallback(() => {
    if (
      !commentLoading &&
      commentData &&
      commentPage * 10 < commentData.page_info.total
    ) {
      setPage((val) => ++val);
    }
  }, [commentLoading, commentPage]);

  // 删除评论
  const confirmDelete = () => {
    deleteComment({ comment_id: popupOption.ids.join(',') });
    setCommentList([]);
    setPopupOption((val) => ({ ...val, open: false }));
    setPage(1);
  };

  useEffect(() => {
    setLoadingModel(commentLoading);
  }, [commentLoading]);
  useEffect(() => {
    if (!commentData || commentData.data.toString() === commentList.toString())
      return;
    if (commentData.data.length === 0 && commentList.length === 0)
      setNullData(true);
    else setNullData(false);
    let arr = [...commentList, ...commentData.data];
    //根据id去重
    arr = setArrayForId(arr);
    arr.sort((a, b) => Date.parse(b.create_time) - Date.parse(a.create_time));
    setCommentList(arr);
  }, [commentData]);

  return (
    <div>
      {/*头*/}
      <PersonalHeader
        useEdit={edit}
        setEdit={setEdit}
        tabs={tabBars}
        defaultSelect={currentTab}
        useIcon={true}
        selectChange={(val) => {
          setCurrentTab(val.key as 'all' | 'myComment' | 'reply');
          setPage(1);
          setCommentList([]);
        }}
        onDelete={() => delPopup.onDelChange('选中内容')}
      />
      <div className={'containerBox'} style={{ height: 'calc(100% - 58px)' }}>
        {showNullData ? (
          <DefaultNoData type={'noData'} text={'暂无评论'} />
        ) : (
          <PullLoad
            page={commentPage}
            total={commentData?.page_info?.total || 0}
            pageSize={10}
            bottomHeight={100}
            onBottom={uploadGetMore}
          >
            <>
              {commentList.map((comment) => {
                return (
                  <CommentItem
                    key={comment.id}
                    commentReplyId={replyCommentId}
                    setCommentReplyId={setReplyCommentId}
                    data={comment}
                    isEdit={edit}
                    checked={popupOption.ids.includes(comment.id)}
                    onCheck={(e) => delPopup.onChangeCheckBox(e, comment.id)}
                    onDelete={() => delPopup.onDelChange('该内容', comment.id)}
                  />
                );
              })}
            </>
          </PullLoad>
        )}
      </div>
      {/*删除*/}
      <ReadPopup
        onClose={delPopup.clearPopup}
        title={`确定移除${popupOption.title}`}
        open={popupOption.open}
        showClose={true}
        onOk={confirmDelete}
      >
        <p>确认删除后，其他用户将无法看到该评论和评论的回复！</p>
      </ReadPopup>
    </div>
  );
};
export default MyComment;
