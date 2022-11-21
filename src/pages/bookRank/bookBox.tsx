import React from 'react';
import { bookRankProps } from '@/type/book';
import { isFinish, translateNumber } from '@/utils/format';

export const BookBox = ({ bookList }: { bookList: bookRankProps }) => {
  return (
    <div className={'bookBox'}>
      {bookList.list.map((book) => {
        return (
          <div key={book.book_id} className={'bookBox_item'}>
            <img className={'bookBox_item_img'} src={book.cover} alt="" />
            <div className={'bookBox_item_right'}>
              <p className={'font_16 color_33'}>{book.book_title}</p>
              <p className={'bookBox_right_info'}>
                {`${book.pen_name}·${book.category_title}·${isFinish(
                  book.is_finish,
                )}·${translateNumber(book.word_count)}`}
              </p>
              <p style={{ width: '525px' }}>{book.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
