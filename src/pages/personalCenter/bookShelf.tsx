import React, { ReactElement, useEffect, useState } from 'react';
import { bookProps } from '@/type/book';
import { Checkbox, Progress } from 'antd';
import { IconFont } from '@/components/IconFont';
import './style/bookShelf.less';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import { ShelfFloor } from '@/pages/personalCenter/components/shelfFloor';
import { useMounted } from '@/hook';
//测试数据
import { testBookData } from '@/assets/testData';
import ReadPopup from '@/components/module/ReadPopup';
import { DelPopup } from '@/pages/personalCenter/utils';

export default () => {
  const tabBars = [
    { key: 'myBookShelf', label: '我的书架' },
    { key: 'readHistory', label: '阅读历史' },
  ];
  const [edit, setEdit] = useState(false);
  //最近阅读数据
  const [recentlyList, setRecently] = useState<bookProps[]>([]);
  //书架数据
  const [bookList, setBookList] = useState<(bookProps | null)[][]>([]);
  //需要删除的id list
  // 删除 确认弹窗
  const [popupOption, setPopupOption] = useState({
    ids: [] as number[],
    open: false,
    title: '',
  });
  // 操作实例
  const delPopup = new DelPopup(popupOption, setPopupOption);

  //  设置书架数据
  const setBookData = () => {
    let resData = [...testBookData, null];
    resData.splice(0, 2);
    let bookArray: (bookProps | null)[][] = Array.from({
      length: Math.ceil(resData.length / 5),
    }).map(() => []);
    resData.forEach((book, index) => {
      //通过向下取整方式获取当前列索引
      let currentColumnIndex = Math.floor(index / 5);
      bookArray[currentColumnIndex].push(book);
    });
    setBookList(bookArray);
  };
  //edit为false时清空delPopup.id
  useEffect(() => {
    if (!edit) delPopup.clearPopup();
  }, [edit]);

  useMounted(() => {
    //  数据获取
    //  设置最近阅读数据
    setRecently([testBookData[0], testBookData[1]]);
    //  设置书架数据
    setBookData();
  });

  // 封面
  const BoobFace = ({
    book,
    className,
    children,
  }: {
    book: bookProps;
    children?: ReactElement;
    className?: string;
  }) => {
    return (
      <div className={`bookShelf_face ${className}`}>
        <img
          style={{ width: '100%', height: '100%' }}
          src={book.face}
          alt="封面"
        />
        <div className={`bookShelf_face_mask ${edit ? 'showMask' : ''}`}>
          {edit ? (
            <Checkbox
              className={'bookShelf_face_icon bookShelf_face_check'}
              defaultChecked={false}
              checked={popupOption.ids.includes(book.id)}
              onChange={(e) => delPopup.onChangeCheckBox(e, book.id)}
            />
          ) : (
            <IconFont
              onClick={() => delPopup.onDelChange(book.title, book.id)}
              className={'bookShelf_face_icon'}
              icon={'delete'}
            />
          )}
          {children}
        </div>
      </div>
    );
  };
  // 最近阅读
  const RecentlyRead = ({ book }: { book: bookProps }) => {
    return (
      <div className={'recently'}>
        <BoobFace book={book} className={'recently_face'} />
        <div className={'recently_info'}>
          {/*TODO:对接时换成话题标题*/}
          <p className={'recently_info_topic textOverflow_2'}>
            有没有笑出鹅叫的沙雕 小说推荐？
          </p>
          <p className={'recently_info_title textOverflow'}>{book.title}</p>
          <Progress percent={book.progress} size="small" />
          <div
            className={'justify_between flex_align'}
            style={{ marginTop: '14px' }}
          >
            <div className={'recently_info_read'}>
              <span>继续阅读</span>
              <IconFont width={'9px'} height={'15px'} icon={'right'} />
            </div>
            <IconFont
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
    <div className={'bookShelf'}>
      {/*头*/}
      <PersonalHeader
        useEdit={edit}
        setEdit={setEdit}
        tabs={tabBars}
        defaultSelect={'myBookShelf'}
        useIcon={true}
        onDelete={() => delPopup.onDelChange('所选书籍')}
      />

      {/*最近阅读*/}
      <div className={'bookShelf_recentlyBox'}>
        {recentlyList.map((list) => {
          return <RecentlyRead book={list} key={list.id} />;
        })}
      </div>
      {/*  书架*/}
      <div className={'bookShelf_book'}>
        {
          //每层书架
          bookList.map((bookItem, index) => {
            return (
              <div key={index} className={'bookShelf_book_layer'}>
                <div className={'flex'}>
                  {
                    //每本书
                    bookItem.map((book) => {
                      if (book)
                        return (
                          <div
                            key={book.id}
                            className={'bookShelf_book_layer_item'}
                          >
                            <BoobFace
                              book={book}
                              className={'bookShelf_book_layer_item_face'}
                            >
                              <div
                                style={{ width: '100%', height: '100%' }}
                                className={
                                  'flex flex_column flex_justify flex_align'
                                }
                              >
                                {/*进度条*/}
                                <div
                                  className={'progress bookShelf_face_check'}
                                  style={{
                                    transform: `rotate(${
                                      3.6 * (book.progress as number)
                                    }deg)`,
                                  }}
                                >
                                  <i className={'circle'}></i>
                                  <Progress
                                    className={'rotate'}
                                    style={{
                                      transform: `rotate(${
                                        -3.6 * book.progress
                                      }deg)`,
                                    }}
                                    width={59}
                                    type="circle"
                                    percent={book.progress}
                                    strokeWidth={4}
                                    strokeColor={'#f77a2a'}
                                    format={(percent) => percent}
                                  />
                                </div>
                                <span
                                  className={'font_14'}
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
                                <span className={'bookInfo_tag'}>话题</span>
                                <span className={'color_33'}>
                                  有没有笑出鹅叫的沙雕 小说推荐？
                                </span>
                              </div>
                              <p className={'font_12 textOverflow'}>
                                {book.title}
                              </p>
                            </div>
                          </div>
                        );
                      else
                        return (
                          <div
                            key={'add'}
                            className={'bookShelf_book_layer_item'}
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
      {/*删除*/}
      <ReadPopup
        onClose={delPopup.clearPopup}
        title={`是否移除 "${popupOption.title}"`}
        open={popupOption.open}
        showClose={true}
      >
        <p>移出书架后可重新添加哦！</p>
      </ReadPopup>
    </div>
  );
};
