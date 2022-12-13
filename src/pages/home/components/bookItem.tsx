import React from 'react';
import { approvalProps, bookInfoProps } from '@/type/book';
import { IconFont } from '@/components/IconFont';
import './style/bookItem.less';
import { UseNode } from '@/components/UseNode';
import { homeChartProps } from '@/type/home';
import { useAddBookCase } from '@/utils/rank';
import { stopProp } from '@/common/publicFn';

type BookItemProps = {
  tabIndex: number;
  bookList: homeChartProps | null;
  onClick?: (book: bookInfoProps) => void;
  onApprove?: (param: approvalProps) => void;
  onComment?: (param: bookInfoProps) => void;
};
export const BookItem = ({
  bookList,
  onClick,
  onComment,
  onApprove,
  tabIndex,
}: BookItemProps) => {
  const setApprove = (book: bookInfoProps) => {
    const param: approvalProps = {
      book_id: book.id,
      is_approval: book.is_user_approval === 1 ? 2 : 1,
    };
    onApprove?.(param);
  };
  // 加入书架
  const { mutate: addBookCase } = useAddBookCase('home', tabIndex);
  return (
    <>
      {bookList?.data.map((book) => {
        return (
          <div className={'book'} key={book.id} onClick={() => onClick?.(book)}>
            {/*左侧书皮*/}
            <UseNode rIf={book.cover !== ''}>
              <div className={'book_left'}>
                <img className={'face'} src={book.cover_url} alt="封面" />
                <p className={'font_14 font_bold textOverflow'}>{book.name}</p>
              </div>
            </UseNode>
            {/*    右侧内容*/}
            <div className={'book_right'}>
              {/*标题*/}
              <p className={'font_18 font_bold cursor'}>
                {book.topic.title ? `来自话题：${book.topic.title}` : book.name}
              </p>
              {/*内容*/}
              <div className={'container'}>
                {book.tag?.map((tags, index) => {
                  return (
                    <span className={'container_tags'} key={index}>
                      【{tags}】
                    </span>
                  );
                })}
                <span>{book.description}</span>
              </div>
              {/*    底部选项*/}
              <div
                className={`book_right_bottom ${
                  book.in_user_case === 1 ? '' : 'justify_between'
                }`}
                onClick={(e) => stopProp(e, () => {})}
              >
                {/*是否加入书架*/}
                <UseNode rIf={book.in_user_case !== 1}>
                  <div
                    className={'book_right_bookshelf'}
                    onClick={() => addBookCase({ book_id: book.id })}
                  >
                    <IconFont
                      width={'10px'}
                      height={'10px'}
                      icon={book.is_vip ? 'shujia' : 'topic'}
                    />
                    <span>{book.is_vip ? '加入书架' : '加入话题'}</span>
                  </div>
                </UseNode>
                <div className={'book_right_options'}>
                  <div className={'operation'} onClick={() => setApprove(book)}>
                    <IconFont
                      width={'16px'}
                      height={'16px'}
                      icon={book.is_user_approval === 1 ? 'support' : 'xihuan'}
                    />
                    <span>喜欢</span>
                  </div>
                  <div
                    className={'operation'}
                    style={{ marginRight: '60px' }}
                    onClick={() => onComment?.(book)}
                  >
                    <IconFont width={'16px'} height={'16px'} icon={'pinglun'} />
                    <span>评论（{book.book_extension?.all_comments}）</span>
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
