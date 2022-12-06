import {
  commentProps,
  replyRequestProps,
  replyStoreProps,
  replyStoreRequestProps,
} from '@/type/book';
import React, { useCallback, useEffect, useState } from 'react';
import { IconFont } from '@/components/IconFont';
import './style/commentItem.less';
import { UseNode } from '@/components/UseNode';
import { Button, Form, Input, Pagination } from 'antd';
import { useReply, useReplyStore } from '@/utils/read';
import { useAuth } from '@/hook/useAuth';
import { Values } from 'async-validator';

type CommentItemProps = {
  bookId: number;
  data: commentProps;
  commentReplyId: number | null;
  setReplyId: Function;
};
export const CommentItem = ({
  data,
  commentReplyId,
  setReplyId,
  bookId,
}: CommentItemProps) => {
  const { setLoadingModel } = useAuth();
  const formValue = Form.useFormInstance();
  // 展示的回复
  const [replyList, setReplyList] = useState<replyStoreProps[]>([]);
  // 是否展开更多回复
  const [showMore, setShowMore] = useState(false);
  // 是否打开评论的回复
  const [replyParam, setReplyParam] = useState({
    type: 'reply' as 'replyStore' | 'reply',
    reply: null as replyStoreProps | commentProps | null,
    open: false,
  });
  // 回复页数
  const [replyPage] = useState(1);
  // 设置回复
  const onCommentReply = useCallback(
    (reply: replyStoreProps | commentProps, type: 'replyStore' | 'reply') => {
      if (reply === replyParam.reply) {
        setReplyId(null);
        return setReplyParam({ reply: null, open: false, type });
      }
      setReplyId(data.id);
      setReplyParam({ reply, open: true, type });
    },
    [],
  );
  // 发表回复的回复
  const { mutate: replyStore, isLoading: replyStoreLogin } = useReplyStore();
  // 发表评论的回复
  const { mutate: reply, isLoading: replyLogin } = useReply();

  const onSendReply = (value: Values) => {
    let param = {
      comment_id: data.id,
      book_id: bookId,
      content: value.commentContainer,
    } as replyStoreRequestProps | replyRequestProps;
    if (replyParam.type === 'replyStore') {
      param = {
        ...param,
        to_user_id: (replyParam.reply as replyStoreProps).user_id,
        target_id: (replyParam.reply as replyStoreProps).id,
      } as replyStoreRequestProps;
      replyStore(param as replyStoreRequestProps);
    }
    reply(param as replyRequestProps);
    formValue.setFieldValue('commentContainer', '');
  };

  // 回复的回复组件
  const ReplyComment = ({ reply }: { reply: replyStoreProps }) => {
    return (
      <div className={'commentItem reply'}>
        <img
          className={'commentItem_userImage'}
          src={reply.user_image_url}
          style={{ marginRight: '9px' }}
          alt={''}
        />
        <div className={'commentItem_box reply_box'}>
          {/*    名称*/}
          <div className={'reply_infoBox'}>
            <span>{reply.user_nickname}</span>
            <UseNode rIf={reply.to_user_id}>
              <span>回复{reply.to_user_nickname}</span>
            </UseNode>
            ：<span>{reply.content}</span>
          </div>
          <div className={'commentItem_box_infoBox'}>
            <span className={'font_14 color_99'}>{data.create_time}</span>
            <span>
              <IconFont
                icon={data.is_user_approval === 1 ? 'support' : 'xihuan'}
                marginRight={'3px'}
                width={'14px'}
                height={'14px'}
              />
              点赞
            </span>
            <span onClick={() => onCommentReply(reply, 'replyStore')}>
              <IconFont
                icon={'comment2'}
                marginRight={'3px'}
                width={'15px'}
                height={'15px'}
              />
              回复
            </span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setLoadingModel(replyStoreLogin || replyLogin);
  }, [replyStoreLogin, replyLogin]);
  // 设置展示评论
  useEffect(() => {
    const arr = [...data.data];
    const replyLength = data.data.length;
    if (replyLength < 3 || showMore) setReplyList(arr);
    else if (replyLength === 4) setReplyList(arr.splice(0, 2));
    else setReplyList(arr.splice(0, 3));
  }, [data.data]);
  return (
    <div className={'commentItem'}>
      <img
        className={'commentItem_userImage'}
        src={data.user_image_url}
        alt=""
      />
      <div className={'commentItem_box'}>
        <p className={'font_16 commentItem_box_name'}>{data.user_nickname}</p>
        <p className={'font_14 commentItem_box_content'}>{data.content}</p>
        <div className={'commentItem_box_infoBox'}>
          <span className={'font_14 color_99'}>{data.create_time}</span>
          <span>
            <IconFont
              icon={data.is_user_approval === 1 ? 'support' : 'xihuan'}
              marginRight={'3px'}
              width={'14px'}
              height={'14px'}
            />
            点赞
          </span>
          <span onClick={() => onCommentReply(data, 'reply')}>
            <IconFont
              icon={'comment2'}
              marginRight={'3px'}
              width={'15px'}
              height={'15px'}
            />
            回复
          </span>
        </div>
        <UseNode rIf={data.data.length > 0}>
          <div>
            {replyList.map((reply) => (
              <ReplyComment key={reply.id} reply={reply} />
            ))}
            {replyList.length < data.data.length && !showMore ? (
              <p className={'color_99 font_12'}>
                <span>共{data.reply}条回复，</span>
                <span
                  className={'cursor'}
                  onClick={() => {
                    setReplyList([...data.data]);
                    setShowMore(true);
                  }}
                >
                  点击展开查看
                </span>
              </p>
            ) : (
              <Pagination
                hideOnSinglePage={true}
                defaultCurrent={replyPage}
                total={data.reply}
                pageSize={10}
                simple={true}
              />
            )}
          </div>
        </UseNode>
        {/*     评论框*/}
        <UseNode rIf={replyParam.open && commentReplyId === data.id}>
          <Form
            form={formValue}
            layout={'inline'}
            className={'comment_sendInput reply_sendInput'}
            onFinish={onSendReply}
          >
            <Form.Item name={'commentContainer'} style={{ flex: 1 }}>
              <Input
                autoComplete={'off'}
                placeholder={'回复：' + replyParam.reply?.user_nickname}
              />
            </Form.Item>
            <Button htmlType={'submit'} type={'primary'}>
              发送
            </Button>
          </Form>
        </UseNode>
      </div>
    </div>
  );
};
