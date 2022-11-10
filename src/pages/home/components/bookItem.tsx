import React from 'react';
import { bookProps } from '@/type/book';
import { IconFont } from '@/components/IconFont';
import './style/bookItem.less';
import { UseNode } from '@/components/UseNode';

export const BookItem = ({
  bookList,
  onClick,
}: {
  bookList: Partial<bookProps>[];
  onClick?: (book: Partial<bookProps>) => void;
}) => {
  return (
    <>
      {bookList.map((book) => {
        return (
          <div className={'book'} key={book.id} onClick={() => onClick?.(book)}>
            {/*左侧书皮*/}
            <div className={'book_left'}>
              <img className={'face'} src={book.face} alt="封面" />
              <p className={'font_14 font_bold textOverflow'}>{book.title}</p>
            </div>
            {/*    右侧内容*/}
            <div className={'book_right'}>
              {/*标题*/}
              <p className={'font_18 font_bold cursor'}>{book.title}</p>
              {/*内容*/}
              <div className={'container'}>
                {book.tags?.map((tags, index) => {
                  return (
                    <span className={'container_tags'} key={index}>
                      【{tags}】
                    </span>
                  );
                })}
                <span>{book.abstract}</span>
              </div>
              {/*    底部选项*/}
              <div
                className={`book_right_bottom ${
                  !book.bookshelf ? 'justify_between' : ''
                }`}
              >
                {/*是否加入书架*/}
                <UseNode rIf={!book.bookshelf}>
                  <div className={'book_right_bookshelf'}>
                    <IconFont width={'10px'} height={'10px'} icon={'shujia'} />
                    <span>加入书架</span>
                  </div>
                </UseNode>
                <div className={'book_right_options'}>
                  <div className={'operation'}>
                    <IconFont
                      width={'16px'}
                      height={'16px'}
                      icon={book.support ? 'support' : 'xihuan'}
                    />
                    <span>喜欢</span>
                  </div>
                  <div className={'operation'} style={{ marginRight: '60px' }}>
                    <IconFont width={'16px'} height={'16px'} icon={'pinglun'} />
                    <span>评论（{book.comment}）</span>
                  </div>
                  <div className={'operation'}>
                    <IconFont width={'16px'} height={'16px'} icon={'zhuanfa'} />
                    <span>转发</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
