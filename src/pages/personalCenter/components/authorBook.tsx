import React from 'react';
import './style/authorBook.less';
import { bookInfoProps } from '@/type/book';
import router from '@/hook/url';
import { BookId } from '@/constants/url';

type AuthorBookProps = {
  bookList: bookInfoProps[] | undefined;
};
export const AuthorBook = ({ bookList }: AuthorBookProps) => {
  return (
    <div className={'authorBook'}>
      {bookList?.map((book) => {
        return (
          <div key={book.id} className={'authorBook_item'}>
            <img
              className={'authorBook_item_cover'}
              src={book.cover_url}
              alt=""
            />
            <div className={'authorBook_item_box'}>
              <p className={'SYBold font_16 color_33'}>{book.name}</p>
              <div className={'authorBook_item_box_info'}>
                <span>{book.is_finish_text}</span> &nbsp;&nbsp;·&nbsp;&nbsp;
                <span>{book.parent_category_name}</span>{' '}
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <span>{book.category_name}</span>
              </div>
              <p className={'textOverflow_2'} style={{ width: '100%' }}>
                {book.description}
              </p>
              <div className={'authorBook_item_box_topic'}>
                <span>加入话题：</span>
                <span>{book.topic.title}</span>
                <p>{book.create_time}</p>
              </div>
            </div>
            <div className={'authorBook_item_right'}>
              {book.word_count > 10000 ? (
                <p>
                  <span className={'font_22'}>
                    {(book.word_count / 10000).toFixed(2)}
                  </span>
                  <span className={'font_14 color_99'}>万字</span>
                </p>
              ) : (
                <p>
                  <span className={'font_22'}>{book.word_count}</span>
                  <span className={'font_14 color_99'}>字</span>
                </p>
              )}
              <p
                className={'authorBook_item_right_btn'}
                onClick={() => router.push('/read', { [BookId]: book.id })}
              >
                书籍详情
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
