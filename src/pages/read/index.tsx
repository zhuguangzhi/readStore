import React, { useEffect, useState } from 'react';
import {
  useGetBookContainer,
  useGetBookInfo,
  useGetCommentData,
} from '@/utils/read';
import { useSearchParam } from '@/hook/url';
import { BookId } from '@/constants/url';
import { useAuth } from '@/hook/useAuth';
import { isFinish, translateNumber } from '@/utils/format';
import { IconFont } from '@/components/IconFont';
import './index.less';
import { UseNode } from '@/components/UseNode';
import router from '@/hook/url';
import { ReadOperationTab } from '@/components/readOperationTab';
import { useModifyApproval } from '@/utils/home';
import { ReadModel } from '@/components/module/ReadModel';
import { Comment } from '@/components/comment';

export default () => {
  const [{ [BookId]: bookId }] = useSearchParam([BookId]);
  // 评论排序方式
  const [commentSlotType, setCommentSlotType] = useState<1 | 2>(1);
  //  是否打开弹窗
  const [commentModel, setCommentModel] = useState(false);
  // 获取内容
  const { data: bookContainer, isLoading: containerLogin } =
    useGetBookContainer({ book_id: parseInt(bookId) });
  // 获取详情
  const { data: bookInfo, isLoading: infoLogin } = useGetBookInfo({
    id: parseInt(bookId),
  });
  const { setLoadingModel } = useAuth();
  // 点赞
  const { mutate: setApproval } = useModifyApproval('readBookInfo');
  // 获取评论内容
  const { data: commentData } = useGetCommentData({
    book_id: parseInt(bookId),
    page: 1,
    page_size: 10,
    comment_sort_type: commentSlotType,
  });

  // 监听 触发loading 只有首次获取时才会触发，避免乐观更新时触发
  useEffect(() => {
    setLoadingModel(containerLogin && infoLogin);
  }, [containerLogin, infoLogin]);

  const onToComment = () => {};
  // 设置喜欢
  const onApprovalChange = () => {
    setApproval({
      book_id: bookInfo?.id as number,
      is_approval: bookInfo?.is_user_approval === 2 ? 1 : 2,
    });
  };

  return (
    <div className={'readBook'}>
      <p className={'readBook_guid'} onClick={() => router.back()}>
        <span>首页</span>&nbsp;-&nbsp;
        <span>{bookInfo?.name}</span>
      </p>
      <p className={'readBook_title font_24 font_bold'}>{bookInfo?.name}</p>
      <div className={'readBook_bookInfo'}>
        <span>类型：{bookInfo?.category_name}</span>
        <span>字数：{translateNumber(bookInfo?.word_count as number)}</span>
        <span>[{isFinish(bookInfo?.is_finish || 2)}]</span>
        <span>阅读：{bookInfo?.book_extension?.all_read}</span>
        <span>发布：{bookInfo?.create_time}</span>
      </div>
      {/*作者信息*/}
      <div className={'readBook_author'}>
        <img
          className={'readBook_author_image'}
          src={bookInfo?.author.user_image_url}
          alt=""
        />
        <div className={'readBook_author_right'}>
          <p>
            <span>作者：</span>
            <span>{bookInfo?.author.pen_name}</span>
          </p>
          <UseNode rIf={bookInfo?.is_attention !== 1}>
            <div className={'readBook_author_right_btn'}>
              <IconFont
                icon={'jia'}
                width={'10px'}
                height={'10px'}
                marginRight={'2px'}
              />
              <span className={'font_12'}>关注</span>
            </div>
          </UseNode>
        </div>
      </div>
      {/*    内容*/}
      <div className={'readBook_container'}>
        <p
          dangerouslySetInnerHTML={{ __html: bookContainer?.content || '' }}
        ></p>
      </div>
      <div className={'readOperationBox'}>
        <ReadOperationTab
          bookId={bookInfo?.id}
          isApproval={bookInfo?.is_user_approval || 2}
          commentChange={onToComment}
          onApproval={onApprovalChange}
          onInput={() => setCommentModel(true)}
        />
      </div>
      <ReadModel
        width={'947px'}
        useTitle={false}
        open={commentModel}
        onCancel={() => setCommentModel(false)}
      >
        <Comment
          bookId={parseInt(bookId)}
          height={'calc((100vh - 100px) * 0.9)'}
          commentData={commentData}
          setSlotType={(num) => setCommentSlotType(num)}
          slotType={commentSlotType}
        />
      </ReadModel>
    </div>
  );
};
