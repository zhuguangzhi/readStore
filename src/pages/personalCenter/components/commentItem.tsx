import React, { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { UseNode } from '@/components/UseNode';
import { IconFont } from '@/components/IconFont';
import { stopProp } from '@/common/publicFn';
import './style/commentItem.less';
import '../style/bookShelf.less';
import { Button, Checkbox, Form, Input } from 'antd';
import { myCommentDataProps } from '@/type/personalCenter';
import { useReply } from '@/utils/read';
import { Values } from 'async-validator';
import { replyRequestProps } from '@/type/book';

type CommentItemProps = {
  comment: myCommentDataProps;
  onSelect?: (comment: myCommentDataProps) => void;
  onDelete?: (comment: myCommentDataProps) => void;
  onCheck?: (value: CheckboxChangeEvent) => void;
  checked?: boolean; //选中check
  isEdit: boolean; //编辑模式
  commentReplyId: number | null;
  setCommentReplyId: (val: null | number) => void;
};

export const CommentItem = ({
  comment,
  onSelect,
  onCheck,
  onDelete,
  isEdit,
  checked,
  ...props
}: CommentItemProps) => {
  const [replyPopup, setReplyPopup] = useState(false);
  const { mutate: replyComment, isLoading } = useReply();
  const [formValue] = Form.useForm();
  const onReply = () => {
    setReplyPopup((val) => !val);
    props.setCommentReplyId(replyPopup ? null : comment.id);
  };
  const onSendReply = (val: Values) => {
    const param: replyRequestProps = {
      comment_id: comment.comment_id,
      content: val.commentContainer,
      book_id: comment.book_id,
    };
    replyComment(param);
  };

  return (
    <div className={'personalComment'} onClick={() => onSelect?.(comment)}>
      {/*    title*/}
      <div className={'personalComment_header'}>
        <div>
          {/*TODO：用户头像*/}
          <img
            className={'personalComment_header_photo'}
            src={require('@/assets/test/personPhoto.png')}
            alt={'photo'}
          />
          {/*回复*/}
          <UseNode rIf={comment.is_comment === 2}>
            <>
              <span className={'personalComment_header_name'}>
                #{comment.reply_user_nickname}&nbsp;&nbsp;
              </span>
              <span className={'font_bold'}>
                回复了你在《{comment.book_title}》的评论
              </span>
            </>
          </UseNode>
          {/*    评论*/}
          <UseNode rIf={comment.is_comment === 1}>
            <span className={'font_bold'}>评价了《{comment.book_title}》</span>
          </UseNode>
        </div>
        {/*    删除/多选*/}
        {isEdit ? (
          <div className={'cursor flex flex_align'}>
            <Checkbox
              style={{ marginRight: '8px' }}
              defaultChecked={false}
              checked={checked}
              onChange={(e) => onCheck?.(e)}
            />
            <span>选择</span>
          </div>
        ) : (
          <div
            className={'cursor flex flex_align'}
            onClick={(event) => stopProp(event, () => onDelete?.(comment))}
          >
            <IconFont
              width={'14px'}
              height={'20px'}
              marginRight={'8px'}
              icon={'delete'}
            />
            <span>删除</span>
          </div>
        )}
      </div>
      {/*    container*/}
      <UseNode rIf={comment.is_comment === 2}>
        <p className={'font_14 color_88'} style={{ paddingTop: '16px' }}>
          {comment.content}
        </p>
      </UseNode>
      {/*    footer*/}
      <div className={'personalComment_footer'}>
        <div>
          <span>
            {comment.is_comment === 1 ? comment.content : comment.reply_content}
          </span>
          <UseNode rIf={comment.is_comment === 2}>
            <span className={'personalComment_footer_reply'} onClick={onReply}>
              回复
            </span>
          </UseNode>
        </div>
        <p className={'personalComment_footer_time'}>{comment.create_time}</p>
      </div>
      {/*     评论框*/}
      <UseNode rIf={replyPopup && props.commentReplyId === comment.id}>
        <Form
          form={formValue}
          layout={'inline'}
          className={'personalComment_sendInput'}
          onFinish={onSendReply}
        >
          <Form.Item name={'commentContainer'} style={{ flex: 1 }}>
            <Input autoComplete={'off'} maxLength={800} />
          </Form.Item>
          <Button htmlType={'submit'} type={'primary'} loading={isLoading}>
            发送
          </Button>
        </Form>
      </UseNode>
    </div>
  );
};
