import React, { useCallback, useEffect, useState } from 'react';
import { Progress } from 'antd';
import { IconFont } from '@/components/IconFont';
import './style/bookShelf.less';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import ReadPopup from '@/components/module/ReadPopup';
import { DelPopup } from '@/pages/personalCenter/utils';
import { PullLoad } from '@/components/module/PullLoad';
import { useDelMyBook, useGetMyBooks } from '@/utils/personalCenter';
import { useAuth } from '@/hook/useAuth';
import { myBookProps } from '@/type/personalCenter';
import { setArrayForId, targetColumnArray, toRead } from '@/common/publicFn';
import { UseNode } from '@/components/UseNode';
import { BookFace } from '@/pages/personalCenter/components/bookFace';
import { BookLayer } from '@/pages/personalCenter/components/bookLayer';

const tabBars = [
  { key: 'getMyBookList', label: '我的书架' },
  { key: 'getReadHistory', label: '阅读历史' },
];
export default () => {
  const [currentTab, setTab] = useState(tabBars[0].key);
  const [edit, setEdit] = useState(false);
  const [page, setPage] = useState(1);
  //最近阅读数据
  const [topBookList, setTopBookList] = useState<myBookProps[]>([]);
  // 用于存储历史数据
  const [historyList, setHistoryList] = useState<myBookProps[] | null>(null);
  //书架数据
  const [bookList, setBookList] = useState<(myBookProps | null)[][]>([]);
  const { setLoadingModel } = useAuth();
  // 移出书架
  const { mutate: deleteBooks } = useDelMyBook('myBooks');
  //需要删除的id list 删除 确认弹窗
  const [popupOption, setPopupOption] = useState({
    ids: [] as number[],
    open: false,
    title: '',
  });
  // 操作实例
  const delPopup = new DelPopup(popupOption, setPopupOption);
  const { data: myBooks, isLoading: bookLoading } = useGetMyBooks({
    page: { page: page, page_size: 22 },
    type: currentTab as 'getMyBookList' | 'getReadHistory',
  });

  const getMore = useCallback(() => {
    if (!bookLoading && myBooks && page * 22 < myBooks.page_info.total) {
      setPage((val) => ++val);
    }
  }, [bookLoading]);
  const confirmDeleteBooks = () => {
    deleteBooks({ book_id: popupOption.ids.join(',') });
    setHistoryList([]);
    setPopupOption((val) => ({ ...val, open: false }));
  };
  // 继续阅读
  const goToRead = (book: myBookProps) => {
    toRead(book.chapter_id, book.book_id);
  };

  //edit为false时清空delPopup.id
  useEffect(() => {
    if (!edit) delPopup.clearPopup();
  }, [edit]);
  useEffect(() => {
    setLoadingModel(bookLoading);
  }, [bookLoading]);
  useEffect(() => {
    if (!myBooks) return;
    let arr = [...(historyList || []), ...myBooks.data];
    //根据id去重
    arr = setArrayForId(arr);
    arr.sort((a, b) => b.id - a.id);
    let books = [...arr];
    if (currentTab === tabBars[0].key) setTopBookList([...books.splice(0, 2)]);
    setHistoryList(arr);
    setBookList(targetColumnArray([...books, null], 5));
  }, [myBooks]);

  // 封面

  // 最近阅读
  const RecentlyRead = ({ book }: { book: myBookProps }) => {
    return (
      <div className={'recently'}>
        <BookFace
          book={book}
          className={'recently_face'}
          edit={edit}
          selectIds={popupOption.ids}
          onDelete={() => delPopup.onDelChange(book.book_title, book.book_id)}
          onCheckBox={(event, bookId) =>
            delPopup.onChangeCheckBox(event, bookId)
          }
        />
        <div className={'recently_info'}>
          {/*TODO:对接时换成话题标题*/}
          <p className={'recently_info_topic textOverflow_2'}>
            {book.topic_title}
          </p>
          <p className={'recently_info_title textOverflow'}>
            {book.book_title}
          </p>
          <Progress percent={Number(book.read_progress)} size="small" />
          <div
            className={'justify_between flex_align'}
            style={{ marginTop: '14px' }}
          >
            <div
              className={'recently_info_read'}
              onClick={() => goToRead(book)}
            >
              <span>继续阅读</span>
              <IconFont width={'9px'} height={'15px'} icon={'right'} />
            </div>
            <IconFont
              onClick={() =>
                delPopup.onDelChange(book.book_title, book.book_id)
              }
              className={'cursor'}
              color={'var(--themeColor)'}
              width={'14px'}
              height={'16px'}
              icon={'delete'}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={'myBookShelf'}>
      {/*头*/}
      <PersonalHeader
        useEdit={edit}
        setEdit={setEdit}
        tabs={tabBars}
        defaultSelect={currentTab}
        useIcon={true}
        selectChange={(val) => {
          setTab(val.key);
          setPage(1);
          setTopBookList([]);
          setHistoryList(null);
        }}
        onDelete={() => delPopup.onDelChange('所选书籍')}
      />
      <div className={'myBookShelf_box'}>
        <PullLoad
          showText={false}
          page={page}
          total={myBooks?.page_info.total || 0}
          pageSize={22}
          bottomHeight={200}
          onBottom={getMore}
        >
          <>
            <UseNode
              rIf={currentTab === tabBars[0].key && topBookList.length !== 0}
            >
              {/*书架顶部两条数据*/}
              <div className={'myBookShelf_recentlyBox'}>
                {topBookList.map((list) => {
                  return <RecentlyRead book={list} key={list.id} />;
                })}
              </div>
            </UseNode>
            {/*  书架*/}
            <div className={'myBookShelf_book'}>
              <BookLayer
                bookList={bookList}
                edit={edit}
                selectIds={popupOption.ids}
                onDelete={(title, id) => delPopup.onDelChange(title, id)}
                onCheckBox={(event, bookId) =>
                  delPopup.onChangeCheckBox(event, bookId)
                }
                goToRead={goToRead}
              />
            </div>
          </>
        </PullLoad>
      </div>
      {/*删除*/}
      <ReadPopup
        onClose={delPopup.clearPopup}
        title={`是否移除 "${popupOption.title}"`}
        open={popupOption.open}
        showClose={true}
        onOk={confirmDeleteBooks}
      >
        <p>
          {currentTab === tabBars[0].key
            ? '移出书架后可重新添加哦！'
            : '移出历史记录后不再保存阅读进度！'}
        </p>
      </ReadPopup>
    </div>
  );
};
