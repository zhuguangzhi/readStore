import React, { useEffect } from 'react';
import './style/index.less';
import './style/userInfo.less';
import './style/authorInfo.less';
import router, { useSearchParam } from '@/hook/url';
import { netName } from '../../../public/config';
import { AuthorId } from '@/constants/url';
import { useGetAuthorInfo } from '@/utils/personalCenter';
import { useAuth } from '@/hook/useAuth';
import { UseNode } from '@/components/UseNode';
import { AuthorBook } from '@/pages/personalCenter/components/authorBook';
import { DefaultNoData } from '@/components/defaultNoData';

export default () => {
  const [{ [AuthorId]: authorId }] = useSearchParam([AuthorId]);
  const { data: authorInfo, isLoading: authorLoading } = useGetAuthorInfo({
    id: Number(authorId),
  });
  const { setLoadingModel } = useAuth();

  useEffect(() => {
    setLoadingModel(authorLoading);
  }, [authorLoading]);
  return (
    <div className={'personal userInfo authorInfo'}>
      {/*    面包屑*/}
      <div className={'personal_breadcrumb'}>
        <span>当前位置：</span>
        <span className={'cursor'} onClick={() => router.push('/home')}>
          {netName}
          {'>'}
        </span>
        <span className={'cursor'}>个人中心</span>
      </div>
      {/*    作者信息*/}
      <div className={'authorInfo_info'}>
        {/*    头像*/}
        <img
          className={'authorInfo_info_photo'}
          src={authorInfo?.user_image_url}
          alt=""
        />
        <div className={'authorInfo_info_box'}>
          <div className={'flex'}>
            <p className={'font_18 SYBold'}>{authorInfo?.pen_name}</p>
            <UseNode rIf={authorInfo?.is_signing_author === 1}>
              <p className={'authorInfo_info_box_sign'}>签约作家</p>
            </UseNode>
          </div>
          <div className={'authorInfo_info_box_works'}>
            <div>
              <p className={'color_99 font_14'}>作品总字数</p>
              <p>
                <span className={'font_20'}>{authorInfo?.word_count || 0}</span>
                <span className={'color_99 font_12'}>&nbsp;&nbsp;字</span>
              </p>
            </div>
            <div>
              <p className={'color_99 font_14'}>创作天数</p>
              <p>
                <span className={'font_20'}>{authorInfo?.write_day || 0}</span>
                <span className={'color_99 font_12'}>&nbsp;&nbsp;天</span>
              </p>
            </div>
            <div>
              <p className={'color_99 font_14'}>总作品数</p>
              <p className={'font_20'}>{authorInfo?.book_count || 0}</p>
            </div>
          </div>
        </div>
        <img
          className={'authorInfo_info_pen'}
          src={require('@/assets/image/home/pen.png')}
          alt=""
        />
        <div
          className={'authorInfo_info_btn'}
          onClick={() => router.push('/personal/userInfo')}
        >
          <span>切换到个人中心</span>
        </div>
      </div>
      {/*    连载作品*/}
      <UseNode rIf={authorInfo && authorInfo.continue_books.length > 0}>
        <div className={'userInfo_bookShelf'}>
          <div className={'userInfo_bookShelf_title'} style={{ margin: 0 }}>
            <div>
              <span>正在连载</span>
              <span className={'userInfo_bookShelf_title_num'}>
                {authorInfo?.continue_count}
              </span>
            </div>
          </div>
          <AuthorBook bookList={authorInfo?.continue_books} />
        </div>
      </UseNode>
      {/*    全部作品*/}
      <div className={'userInfo_bookShelf'}>
        <div className={'userInfo_bookShelf_title'} style={{ margin: 0 }}>
          <div>
            <span>全部作品</span>
            <span className={'userInfo_bookShelf_title_num'}>
              {authorInfo?.book_count}
            </span>
          </div>
        </div>
        {!authorInfo || authorInfo.books.length === 0 ? (
          <DefaultNoData
            className={'authorInfo_noData'}
            type={'noData'}
            text={'该作者暂无作品'}
          />
        ) : (
          <AuthorBook bookList={authorInfo?.books} />
        )}
      </div>
    </div>
  );
};
