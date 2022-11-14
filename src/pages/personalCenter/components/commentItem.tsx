import { commentProps } from '@/type/book';
import React from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { UseNode } from '@/components/UseNode';
import { IconFont } from '@/components/IconFont';
import { stopProp } from '@/utils/publicFn';
import './style/commentItem.less';
import '../style/bookShelf.less';
import { Checkbox } from 'antd';

type CommentItemProps = {
  comment: commentProps;
  onSelect?: (comment: commentProps) => void;
  onDelete?: (comment: commentProps) => void;
  onCheck?: (value: CheckboxChangeEvent) => void;
  checked?: boolean; //选中check
  isEdit: boolean; //编辑模式
};

export const CommentItem = ({
  comment,
  onSelect,
  onCheck,
  onDelete,
  isEdit,
  checked,
}: CommentItemProps) => {
  return (
    <div className={'commentItem'} onClick={() => onSelect?.(comment)}>
      {/*    title*/}
      <div className={'commentItem_header'}>
        <div>
          {/*TODO：用户头像*/}
          <img
            className={'commentItem_header_photo'}
            src={require('@/assets/test/personPhoto.png')}
            alt={'photo'}
          />
          {/*回复*/}
          <UseNode rIf={comment.target_type === 2}>
            <>
              <span className={'commentItem_header_name'}>
                #{comment.reply_user_name}{' '}
              </span>
              <span className={'font_bold'}>
                {' '}
                回复了你在《{comment.book_title}》的评论
              </span>
            </>
          </UseNode>
          {/*    评论*/}
          <UseNode rIf={comment.target_type === 1}>
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
      <UseNode rIf={comment.target_type === 2}>
        <p className={'font_14 color_88'} style={{ paddingTop: '16px' }}>
          {comment.content}
        </p>
      </UseNode>
      {/*    footer*/}
      <div className={'commentItem_footer'}>
        <div>
          <span>
            {comment.target_type === 1
              ? comment.content
              : comment.reply_content}
          </span>
          <span className={'commentItem_footer_reply'}>回复</span>
        </div>
        <p className={'commentItem_footer_time'}>{comment.time}</p>
      </div>
    </div>
  );
};
