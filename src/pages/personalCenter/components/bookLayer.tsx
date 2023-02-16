import React from 'react';
import { Progress } from 'antd';
import router from '@/hook/url';
import { IconFont } from '@/components/IconFont';
import { myBookProps } from '@/type/personalCenter';
import {
  BookFaceProps,
  BookFace,
} from '@/pages/personalCenter/components/bookFace';
import { ShelfFloor } from '@/pages/personalCenter/components/shelfFloor';
import '../style/bookShelf.less';

interface BookLayerProps extends Omit<BookFaceProps, 'book'> {
  bookList: (myBookProps | null)[][];
  goToRead: (book: myBookProps) => void;
}
// //每层书架
// bookList.map((bookItem, index) => {
//     return (
//         <div key={index} className={'myBookShelf_book_layer'}>
//             <div className={'flex'}>
//                 {
//                 }
//             </div>
//             <ShelfFloor />
//         </div>
//     );
// })
export const BookLayer = ({ bookList, ...props }: BookLayerProps) => {
  return (
    <>
      {bookList.map((bookItem, index) => {
        return (
          <div key={index} className={'myBookShelf_book_layer'}>
            <div className={'flex'}>
              {
                //每本书
                bookItem.map((book) => {
                  if (book)
                    return (
                      <div
                        key={book.id}
                        className={'myBookShelf_book_layer_item'}
                      >
                        <BookFace
                          book={book}
                          className={'myBookShelf_book_layer_item_face'}
                          edit={props.edit}
                          selectIds={props.selectIds}
                          onDelete={props.onDelete}
                          onCheckBox={props.onCheckBox}
                          isHiddenDel={props.isHiddenDel}
                        >
                          <div
                            style={{ width: '100%', height: '100%' }}
                            className={
                              'flex flex_column flex_justify flex_align'
                            }
                          >
                            {/*进度条*/}
                            <div
                              className={'progress myBookShelf_face_check'}
                              style={{
                                transform: `rotate(${
                                  3.6 * Number(book.read_progress)
                                }deg)`,
                              }}
                            >
                              <i className={'circle'}></i>
                              <Progress
                                className={'rotate'}
                                style={{
                                  transform: `rotate(${
                                    -3.6 * Number(book.read_progress)
                                  }deg)`,
                                }}
                                width={59}
                                type="circle"
                                percent={Number(book.read_progress)}
                                strokeWidth={4}
                                strokeColor={'#f77a2a'}
                                format={(percent) => percent}
                              />
                            </div>
                            <span
                              className={'font_14'}
                              onClick={() => props.goToRead(book)}
                              style={{
                                display: 'inline-block',
                                marginTop: '26px',
                              }}
                            >
                              继续阅读
                            </span>
                          </div>
                        </BookFace>
                        <div className={'bookInfo font_14'}>
                          <div
                            className={'textOverflow_2'}
                            style={{ width: '100%' }}
                          >
                            <span className={'bookInfo_tag'}>话题</span>
                            <span className={'color_33'}>
                              {book.topic_title}
                            </span>
                          </div>
                          <p className={'font_12 textOverflow'}>
                            {book.book_title}
                          </p>
                        </div>
                      </div>
                    );
                  else
                    return (
                      <div
                        key={'add'}
                        className={'myBookShelf_book_layer_item'}
                        onClick={() => router.push('/books')}
                      >
                        <i className={'addBook'}>
                          <IconFont
                            className={'cursor'}
                            icon={'jia'}
                            width={'36px'}
                            height={'36px'}
                            color={'#C6CECD'}
                          />
                        </i>
                      </div>
                    );
                })
              }
            </div>
            <ShelfFloor />
          </div>
        );
      })}
    </>
  );
};
