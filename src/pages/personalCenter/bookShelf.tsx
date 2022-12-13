import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Checkbox, Progress } from 'antd';
import { IconFont } from '@/components/IconFont';
import './style/bookShelf.less';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import { ShelfFloor } from '@/pages/personalCenter/components/shelfFloor';
//测试数据
import ReadPopup from '@/components/module/ReadPopup';
import { DelPopup } from '@/pages/personalCenter/utils';
import { PullLoad } from '@/components/module/PullLoad';
import { useDelMyBook, useGetMyBooks } from '@/utils/personalCenter';
import { useAuth } from '@/hook/useAuth';
import { myBookProps } from '@/type/personalCenter';
import { setArrayForId, targetColumnArray } from '@/common/publicFn';
import { UseNode } from '@/components/UseNode';
import router from '@/hook/url';
import { BookId } from '@/constants/url';

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
  const { mutate: deleteBooks } = useDelMyBook();
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
    if (!bookLoading && myBooks && page * 10 < myBooks.page_info.total) {
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
    router.push('/read', { [BookId]: book.book_id });
  };

  //edit为false时清空delPopup.id
  useEffect(() => {
    if (!edit) delPopup.clearPopup();
  }, [edit]);
  useEffect(() => {
    setLoadingModel(bookLoading);
  }, [bookLoading]);
  useEffect(() => {
    if (
      !myBooks ||
      (historyList && myBooks.data.toString() === historyList.toString())
    )
      return;
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
  const BoobFace = ({
    book,
    className,
    children,
  }: {
    book: myBookProps;
    children?: ReactElement;
    className?: string;
  }) => {
    return (
      <div className={`myBookShelf_face ${className}`}>
        <img
          style={{ width: '100%', height: '100%' }}
          src={book.cover_url}
          alt="封面"
        />
        <div className={`myBookShelf_face_mask ${edit ? 'showMask' : ''}`}>
          {edit ? (
            <Checkbox
              className={'myBookShelf_face_icon myBookShelf_face_check'}
              defaultChecked={false}
              checked={popupOption.ids.includes(book.book_id)}
              onChange={(e) => delPopup.onChangeCheckBox(e, book.book_id)}
            />
          ) : (
            <IconFont
              onClick={() =>
                delPopup.onDelChange(book.book_title, book.book_id)
              }
              className={'myBookShelf_face_icon'}
              icon={'delete'}
            />
          )}
          {children}
        </div>
      </div>
    );
  };
  // 最近阅读
  const RecentlyRead = ({ book }: { book: myBookProps }) => {
    return (
      <div className={'recently'}>
        <BoobFace book={book} className={'recently_face'} />
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
            <UseNode rIf={currentTab === tabBars[0].key}>
              {/*书架顶部两条数据*/}
              <div className={'myBookShelf_recentlyBox'}>
                {topBookList.map((list) => {
                  return <RecentlyRead book={list} key={list.id} />;
                })}
              </div>
            </UseNode>
            {/*  书架*/}
            <div className={'myBookShelf_book'}>
              {
                //每层书架
                bookList.map((bookItem, index) => {
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
                                  <BoobFace
                                    book={book}
                                    className={
                                      'myBookShelf_book_layer_item_face'
                                    }
                                  >
                                    <div
                                      style={{ width: '100%', height: '100%' }}
                                      className={
                                        'flex flex_column flex_justify flex_align'
                                      }
                                    >
                                      {/*进度条*/}
                                      <div
                                        className={
                                          'progress myBookShelf_face_check'
                                        }
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
                                        onClick={() => goToRead(book)}
                                        style={{
                                          display: 'inline-block',
                                          marginTop: '26px',
                                        }}
                                      >
                                        继续阅读
                                      </span>
                                    </div>
                                  </BoobFace>
                                  <div className={'bookInfo font_14'}>
                                    {/*TODO:需要将话题字段动态*/}
                                    <div
                                      className={'textOverflow_2'}
                                      style={{ width: '100%' }}
                                    >
                                      <span className={'bookInfo_tag'}>
                                        话题
                                      </span>
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
                })
              }
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
