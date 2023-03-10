import React from 'react';
import { approvalProps, bookInfoProps } from '@/type/book';
import { IconFont } from '@/components/IconFont';
import './style/bookItem.less';
import { UseNode } from '@/components/UseNode';
import { homeChartProps } from '@/type/home';
import { copy, stopProp } from '@/common/publicFn';
import { translateNumber } from '@/utils/format';
import { netUrl } from '../../../../public/config';
import { BookId } from '@/constants/url';

type BookItemProps = {
  bookList: homeChartProps['data'] | null;
  onClick?: (book: bookInfoProps) => void;
  onApprove?: (param: approvalProps) => void;
  onComment?: (param: bookInfoProps) => void;
  onAddBookCase?: (bookId: number, isAdd: 1 | 2) => void; //1加入 2移出
  clickTitle?: (topicId: number) => void;
};
export const BookItem = ({
  bookList,
  onClick,
  onComment,
  onApprove,
  onAddBookCase,
}: BookItemProps) => {
  const setApprove = (book: bookInfoProps) => {
    const param: approvalProps = {
      book_id: book.id,
      is_approval: book.is_user_approval === 1 ? 2 : 1,
    };
    onApprove?.(param);
  };

  return (
    <>
      {bookList?.map((book) => {
        return (
          <div className={'book'} key={book.id} onClick={() => onClick?.(book)}>
            {/*左侧书皮*/}
            <UseNode rIf={book.cover_url !== ''}>
              <div className={'book_left'}>
                <img className={'face'} src={book.cover_url} alt="封面" />
                <p className={'font_14 font_600 SYBold textOverflow'}>
                  {book.name}
                </p>
              </div>
            </UseNode>
            {/*    右侧内容*/}
            <div className={'book_right'}>
              {/*标题*/}
              <p
                className={'font_18 font_500 SYMedium cursor'}
                // onClick={(e) => book.is_vip === 2?stopProp(e, () => clickTitle?.(book.topic?.id)):{}}
              >
                {`来自话题：${book.topic.title || '暂无话题'}`}
              </p>
              {/*内容*/}
              <div className={'container'} onTouchStart={() => onClick?.(book)}>
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
                className={`book_right_bottom justify_between`}
                onClick={(e) => stopProp(e, () => {})}
              >
                {/*是否加入书架*/}
                <div className={'book_right_bookshelf'}>
                  {book.in_user_case !== 1 ? (
                    <div onClick={() => onAddBookCase?.(book.id, 1)}>
                      <IconFont
                        width={'10px'}
                        height={'10px'}
                        icon={book.is_vip ? 'shujia' : 'topic'}
                      />
                      <span>{book.is_vip === 1 ? '加入书架' : '加入话题'}</span>
                    </div>
                  ) : (
                    <span
                      onClick={() => onAddBookCase?.(book.id, 2)}
                      style={{ color: '#E85D01' }}
                    >
                      {book.is_vip === 1 ? '已加入书架' : '已加入话题'}
                    </span>
                  )}
                </div>
                <div className={'book_right_options'}>
                  <div className={'operation'} onClick={() => setApprove(book)}>
                    <IconFont
                      width={'16px'}
                      height={'16px'}
                      icon={book.is_user_approval === 1 ? 'support' : 'xihuan'}
                    />
                    <span>
                      喜欢 （
                      {translateNumber(
                        book.book_extension?.all_approval || 0,
                        false,
                      )}
                      ）
                    </span>
                  </div>
                  <div
                    className={'operation'}
                    onClick={() => onComment?.(book)}
                  >
                    <IconFont width={'16px'} height={'16px'} icon={'pinglun'} />
                    <span>
                      评论（
                      {translateNumber(
                        book.book_extension?.all_comments || 0,
                        false,
                      )}
                      ）
                    </span>
                  </div>
                  <div
                    className={'operation cursor'}
                    onClick={() =>
                      copy(
                        `【${book.name}】 ${netUrl}/read?${[BookId]}=${
                          book.id
                        }`,
                      )
                    }
                  >
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
