import React, { useEffect, useState } from 'react';
import { commentStoreRequestProps, readComponentProps } from '@/type/book';
import { PullLoad } from '@/components/module/PullLoad';
import './style/comment.less';
import { Button, Form, Input } from 'antd';
import { CommentItem } from '@/components/commentItem';
import { Values } from 'async-validator';
import { useCommentStore } from '@/utils/read';
import { useAuth } from '@/hook/useAuth';
import { DefaultNoData } from '@/components/defaultNoData';

type CommentProps = {
  commentData: readComponentProps | undefined;
  isReverse: boolean;
  bookId: number;
  width?: string;
  height?: string;
  slotType: 1 | 2;
  setSlotType: (num: 1 | 2) => void;
  commentPage: number;
  getMoreComment: Function;
  usePullLoad?: boolean;
};
export const Comment = ({
  commentData,
  isReverse,
  width,
  height,
  bookId,
  slotType,
  setSlotType,
  ...props
}: CommentProps) => {
  const { page_size, total } = commentData?.page_info || {
    page: 0,
    page_size: 0,
    total: 0,
  };
  // 在评论哪条评论的id
  const [commentReplyId, setReplyId] = useState<null | number>(null);
  const { mutate: commentStore, isLoading: commentLoading } = useCommentStore();
  const { setLoadingModel } = useAuth();
  const [formValue] = Form.useForm();
  // 发表评论
  const sendComment = (value: Values) => {
    const param: commentStoreRequestProps = {
      book_id: bookId,
      content: value.commentContainer,
    };
    formValue.resetFields();
    commentStore(param);
  };

  useEffect(() => {
    setLoadingModel(commentLoading);
  }, [commentLoading]);
  return (
    <div className={'comment'} style={{ width, height }}>
      {/*    头*/}
      <div className={'comment_header'}>
        <p className={'font_18 font_bold'} style={{ color: '#000000' }}>
          <span>评论</span>
          <span>（{commentData?.page_info.total || 0}）</span>
        </p>
        <div className={'comment_header_slider'}>
          <i
            style={{
              transform: `translateX(${slotType === 2 ? '0' : '49px'})`,
            }}
          ></i>
          <span
            style={{ color: slotType === 2 ? '#000000' : '' }}
            onClick={() => setSlotType(2)}
          >
            最新
          </span>
          <span
            style={{ color: slotType === 1 ? '#000000' : '' }}
            onClick={() => setSlotType(1)}
          >
            默认
          </span>
        </div>
      </div>
      <div
        className={`flex ${
          isReverse ? 'comment_sendInput_reserve' : 'flex_column'
        }`}
        style={{ width: '100%', flex: 1, height: 'calc(100% - 41px)' }}
      >
        <div className={'comment_sendInput'}>
          <Form layout={'inline'} form={formValue} onFinish={sendComment}>
            <Form.Item name={'commentContainer'} style={{ flex: 1 }}>
              <Input
                autoComplete={'off'}
                maxLength={800}
                placeholder={'请给作者一些评价，让作者更有动力～'}
              />
            </Form.Item>
            <Button htmlType={'submit'} type={'primary'}>
              发送
            </Button>
          </Form>
        </div>
        <div className={'comment_pullLoadBox'}>
          {commentData && commentData?.data.length !== 0 ? (
            <PullLoad
              page={props.commentPage}
              total={total}
              pageSize={page_size}
              usePullLoad={props.usePullLoad}
              bottomHeight={560}
              onBottom={() => props.getMoreComment()}
            >
              <>
                {commentData?.data.map((comment) => {
                  return (
                    <CommentItem
                      key={comment.id}
                      bookId={bookId}
                      commentReplyId={commentReplyId}
                      setReplyId={setReplyId}
                      data={comment}
                    />
                  );
                })}
              </>
            </PullLoad>
          ) : (
            <DefaultNoData
              className={'comment_noData'}
              type={'noData'}
              text={'快来抢沙发吧~'}
            />
          )}
        </div>
      </div>
    </div>
  );
};
