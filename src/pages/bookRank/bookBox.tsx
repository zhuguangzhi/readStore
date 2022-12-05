import React from 'react';
import { rankBookInfoProps } from '@/type/book';
import { isFinish, translateNumber } from '@/utils/format';
import './style/bookBox.less';
import { UseNode } from '@/components/UseNode';
import { useAddBookCase } from '@/utils/rank';

export const BookBox = ({
  bookList,
}: {
  bookList: rankBookInfoProps | undefined;
}) => {
  const { mutate: addBookCase } = useAddBookCase('rank');
  return (
    <div className={'bookBox'}>
      {bookList?.data.map((book, index) => {
        return (
          <div
            key={book.id}
            className={`bookBox_item ${
              book.cover_url !== '' ? 'imageItem' : ''
            }`}
          >
            {/*角标*/}
            <div className={`bookBox_item_mark mark_${index + 1}`}>
              <span>NO.{index + 1}</span>
            </div>
            <UseNode rIf={book.cover_url !== ''}>
              <img className={'bookBox_item_img'} src={book.cover_url} alt="" />
            </UseNode>
            <div className={'bookBox_item_right'}>
              <div className={'bookBox_item_right_box'}>
                <p className={'font_16 color_33 textOverflow'}>{book.name}</p>
                <p className={'bookBox_right_info'}>
                  {`${book.author.pen_name} · ${
                    book.category_name
                  } · ${isFinish(book.is_finish)} · ${translateNumber(
                    book.word_count,
                  )}`}
                </p>
                <p className={'textOverflow_2'}>{book.description}</p>
                <p style={{ marginTop: '29px' }} className={'textOverflow'}>
                  最后更新：{book.last_update_chapter_time}
                </p>
              </div>
              <div style={{ width: '124px' }}>
                <button className={'bookBox_item_right_btn readBtn'}>
                  立即阅读
                </button>
                <UseNode rIf={book.in_user_case === 2}>
                  <button
                    className={'bookBox_item_right_btn'}
                    onClick={() => addBookCase({ book_id: book.id })}
                  >
                    加入书架
                  </button>
                </UseNode>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
