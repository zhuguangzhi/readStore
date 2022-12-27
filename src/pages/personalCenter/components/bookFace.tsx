import { myBookProps } from '@/type/personalCenter';
import React, { ReactElement } from 'react';
import { Checkbox } from 'antd';
import { IconFont } from '@/components/IconFont';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import '../style/bookShelf.less';

export type BookFaceProps = {
  book: myBookProps;
  children?: ReactElement;
  className?: string;
  edit: boolean;
  selectIds: number[];
  onDelete: (title: string, id: number) => void; //删除
  onCheckBox: (event: CheckboxChangeEvent, bookId: number) => void; //多选框选中
};
export const BookFace = ({
  book,
  className,
  children,
  edit,
  selectIds,
  ...props
}: BookFaceProps) => {
  return (
    <div className={`myBookShelf_face ${className}`}>
      <img
        style={{ width: '100%', height: '100%' }}
        src={book.cover_url}
        alt="封面"
      />
      <div className={`myBookShelf_face_mask ${edit ? 'showMask' : ''}`}>
        {edit ? (
          <Checkbox
            className={'myBookShelf_face_icon myBookShelf_face_check'}
            defaultChecked={false}
            checked={selectIds.includes(book.book_id)}
            onChange={(e) => props.onCheckBox(e, book.book_id)}
            // onChange={(e) => delPopup.onChangeCheckBox(e, book.book_id)}
          />
        ) : (
          <IconFont
            onClick={
              () => props.onDelete(book.book_title, book.book_id)
              // delPopup.onDelChange(book.book_title, book.book_id)
            }
            className={'myBookShelf_face_icon'}
            icon={'delete'}
          />
        )}
        {children}
      </div>
    </div>
  );
};
