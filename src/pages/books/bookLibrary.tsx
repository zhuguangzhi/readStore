import React from 'react';
import { rankBook } from '@/type/book';
import { isFinish, translateNumber } from '@/utils/format';
import './style/bookLibrary.less';

type BookLibraryProps = {
  bookList: rankBook[] | undefined;
  onClick?: (book: rankBook) => void;
};
export const BookLibrary = ({ bookList, onClick }: BookLibraryProps) => {
  return (
    <div className={'bookLibrary'}>
      {bookList?.map((book) => {
        return (
          <div
            className={'bookLibrary_item'}
            key={book.id}
            onClick={() => onClick?.(book)}
          >
            <img
              src={book.cover_url}
              alt=""
              className={'bookLibrary_item_img'}
            />
            <div className={'bookLibrary_item_container'}>
              <p
                className={'font_16 color_33 font_bold SYBold'}
                style={{ marginBottom: '6px' }}
              >
                {book.name}
              </p>
              <p>作者：{book.author.pen_name}</p>
              <div className={'bookLibrary_item_container_infoBox'}>
                <span>{isFinish(book.is_finish)}</span>
                <span>{translateNumber(book.word_count)}</span>
              </div>
              <p className={'textOverflow_2'} style={{ marginBottom: '6px' }}>
                {book.description}
              </p>
              <p>发布时间：{book.create_time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
