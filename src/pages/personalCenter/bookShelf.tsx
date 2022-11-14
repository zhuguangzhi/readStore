import React, { ReactElement, useEffect, useState } from 'react';
import { bookProps } from '@/type/book';
import { Checkbox, Progress } from 'antd';
import { IconFont } from '@/components/IconFont';
import './style/bookShelf.less';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import { ShelfFloor } from '@/pages/personalCenter/components/shelfFloor';
import { useMounted } from '@/hook';
//测试数据
import { testBookData } from '@/assets/testData';
import ReadPopup from '@/components/module/ReadPopup';

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
  const [delPopup, setDelPopup] = useState({
    open: false, //打开？
    title: '', //标题
    id: [] as number[], //删除的id数组
  });

  //改变多选框
  const onChangeCheckBox = (value: CheckboxChangeEvent, bookId: number) => {
    let arr = [...delPopup.id];
    if (value.target.checked) arr.push(bookId);
    else arr.splice(arr.indexOf(bookId), 1);
    setDelPopup({ ...delPopup, id: [...arr] });
  };
  //删除按钮点击
  const onDelChange = (book?: bookProps) => {
    setDelPopup({
      title: book ? book.title : '选中书本',
      id: book ? [book.id] : delPopup.id,
      open: true,
    });
  };
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
    if (!edit) setDelPopup({ ...delPopup, id: [] });
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
              checked={delPopup.id.includes(book.id)}
              onChange={(e) => onChangeCheckBox(e, book.id)}
            />
          ) : (
            <IconFont
              onClick={() => onDelChange(book)}
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
        onDelete={onDelChange}
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
        onClose={() => setDelPopup({ ...delPopup, open: false, id: [] })}
        title={`是否移除 "${delPopup.title}"`}
        open={delPopup.open}
        showClose={true}
      >
        <p>删除后30天内可在回收站中找回哦！</p>
      </ReadPopup>
    </div>
  );
};
