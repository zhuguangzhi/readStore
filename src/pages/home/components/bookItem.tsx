import React from 'react';
import { bookProps } from '@/type/book';
import { IconFont } from '@/components/IconFont';

export const BookItem = ({ book }: { book: bookProps }) => {
  return (
    <div>
      {/*左侧书皮*/}
      <div></div>
      {/*    右侧内容*/}
      <div>
        {/*标题*/}
        <p className={'font_16'}>{book.title}</p>
        {/*内容*/}
        <div>
          {book.tags?.map((tags, index) => {
            return <span key={index}>{tags}</span>;
          })}
          <span>{book.content}</span>
        </div>
        {/*    底部选项*/}
        <div>
          {/*是否加入书架*/}
          <div>
            <IconFont width={'10px'} height={'10px'} icon={'shujia'} />
            <span>加入书架</span>
          </div>
          <div>
            <div>
              <IconFont width={'16px'} height={'16px'} icon={'xihuan'} />
              <span>喜欢</span>
            </div>
            <div>
              <IconFont
                width={'16px'}
                height={'16px'}
                icon={book.support ? 'support' : 'pinglun'}
              />
              <span>评论（{book.comment}）</span>
            </div>
            <div>
              <IconFont width={'16px'} height={'16px'} icon={'zhuanfa'} />
              <span>转发</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
