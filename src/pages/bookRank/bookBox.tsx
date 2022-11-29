import React from 'react';
import { bookRankProps } from '@/type/book';
import { isFinish, translateNumber } from '@/utils/format';
import './style/bookBox.less';
import { UseNode } from '@/components/UseNode';

export const BookBox = ({ bookList }: { bookList: bookRankProps }) => {
  return (
    <div className={'bookBox'}>
      {bookList.list.map((book, index) => {
        return (
          <div key={book.book_id} className={'bookBox_item'}>
            {/*角标*/}
            <div className={`bookBox_item_mark mark_${index + 1}`}>
              <span>NO.{index + 1}</span>
            </div>
            <UseNode rIf={book.cover !== ''}>
              <img className={'bookBox_item_img'} src={book.cover} alt="" />
            </UseNode>
            <div className={'bookBox_item_right'}>
              <div className={'bookBox_item_right_box'}>
                <p className={'font_16 color_33 textOverflow'}>
                  {book.book_title}
                </p>
                <p className={'bookBox_right_info'}>
                  {`${book.pen_name} · ${book.category_title} · ${isFinish(
                    book.is_finish,
                  )} · ${translateNumber(book.word_count)}`}
                </p>
                <p className={'textOverflow_2'}>{book.description}</p>
                <p style={{ marginTop: '29px' }} className={'textOverflow'}>
                  最后更新：{book.last_update_chapter_title}
                </p>
              </div>
              <div style={{ width: '124px' }}>
                <button className={'bookBox_item_right_btn readBtn'}>
                  立即阅读
                </button>
                <button className={'bookBox_item_right_btn'}>加入书架</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
