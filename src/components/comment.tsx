import React, { useState } from 'react';
import { readComponentProps } from '@/type/book';
import { PullLoad } from '@/components/module/PullLoad';
import './style/comment.less';
import { Button, Form, Input } from 'antd';
import { CommentItem } from '@/components/commentItem';

type CommentProps = {
  commentData: readComponentProps | undefined;
  bookId: number;
  width?: string;
  height?: string;
  slotType: 1 | 2;
  setSlotType: (num: 1 | 2) => void;
};
export const Comment = ({
  commentData,
  width,
  height,
  bookId,
  slotType,
  setSlotType,
}: CommentProps) => {
  const { page, page_size, total } = commentData?.page_info || {
    page: 0,
    page_size: 0,
    total: 0,
  };
  // 在评论哪条评论的id
  const [commentReplyId, setReplyId] = useState<null | number>(null);
  return (
    <div className={'comment'} style={{ width, height }}>
      {/*    头*/}
      <div className={'comment_header'}>
        <p className={'font_18 font_bold'} style={{ color: '#000000' }}>
          <span>评论</span>
          <span>（{commentData?.data.length}）</span>
        </p>
        <div className={'comment_header_slider'}>
          <i
            style={{
              transform: `translateX(${slotType === 1 ? '0' : '49px'})`,
            }}
          ></i>
          <span
            style={{ color: slotType === 1 ? '#000000' : '' }}
            onClick={() => setSlotType(1)}
          >
            最新
          </span>
          <span
            style={{ color: slotType === 2 ? '#000000' : '' }}
            onClick={() => setSlotType(2)}
          >
            默认
          </span>
        </div>
      </div>
      <div
        className={'flex comment_sendInput_reserve'}
        style={{ width: '100%', flex: 1, height: 'calc(100% - 41px)' }}
      >
        <div className={'comment_sendInput'}>
          <Form layout={'inline'}>
            <Form.Item name={'commentContainer'} style={{ flex: 1 }}>
              <Input
                autoComplete={'off'}
                placeholder={'请给作者一些评价，让作者更有动力～'}
              />
            </Form.Item>
            <Button type={'primary'}>发送</Button>
          </Form>
        </div>
        <div className={'comment_pullLoadBox'}>
          <PullLoad
            page={page}
            total={total}
            pageSize={page_size}
            bottomHeight={500}
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
        </div>
      </div>
    </div>
  );
};
