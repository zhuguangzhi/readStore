import React, { useEffect, useState } from 'react';
import './style/index.less';
import { bookCategoryProps, rankBook } from '@/type/book';
import { UseNode } from '@/components/UseNode';
import { useSetState } from '@/hook';
import { useGetBookCategory, useGetBookLibrary } from '@/utils/bookShelf';
import {
  scrollToBottom,
  setArrayForId,
  targetColumnArray,
} from '@/common/publicFn';
import { useAuth } from '@/hook/useAuth';
import { BookLibrary } from '@/pages/books/bookLibrary';
import router, { useSearchParam } from '@/hook/url';
import { authorPenName, BookId, SearchKey } from '@/constants/url';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/modelConnect';
import { globalState } from '@/models/global';
import { DefaultNoData } from '@/components/defaultNoData';

const readType = [
  { key: 0, label: '全部' },
  { key: 1, label: '男频' },
  { key: 2, label: '女频' },
];
const statusList = [
  [
    { key: 0, label: '全部' },
    { key: 1, label: '已完结' },
    { key: 2, label: '连载中' },
  ],
  [
    { key: 3, label: '最热' },
    { key: 4, label: '最新' },
  ],
];
const textNum = [
  { key: 0, label: '全部' },
  { key: 1, label: '30万以下' },
  { key: 2, label: '30万—50万' },
  { key: 3, label: '50万—100万' },
  { key: 4, label: '100万—200万' },
  { key: 5, label: '200万以上' },
];

type ThemeComponentProps = {
  themes: bookCategoryProps[];
  index: number;
  type: 'men' | 'women';
};

const Books = () => {
  const globalState = useSelector(
    (state: ConnectState) => state.global,
  ) as globalState;
  const dispatch = useDispatch();
  const [{ [SearchKey]: searchKey, [authorPenName]: penName }] = useSearchParam(
    [SearchKey, authorPenName],
  );
  //主题列表 用于展示 男频
  const [categoryMenList, setCategoryMenList] = useState<bookCategoryProps[][]>(
    [],
  );
  const [categoryWomenList, setCategoryWomenList] = useState<
    bookCategoryProps[][]
  >([]);
  const [currentTheme, setTheme] = useState({
    layerIndex: null as number | null,
    theme: null as bookCategoryProps | null,
    type: null as 'men' | 'women' | null,
  });
  const [libraryPage, setPage] = useState(1);
  const [state, setState] = useState({ ...globalState.bookLibraryConfig });
  const changeState = useSetState(state, setState);
  const [bookShelfData, setBookShelfData] = useState<rankBook[]>([]);
  const { data: bookShelf, isLoading: shelfLoading } = useGetBookLibrary({
    [state.readKey ? 'channel_type' : '']: state.readKey,
    [currentTheme.theme?.id ? 'parent_category_ids' : '']:
      currentTheme.theme?.id,
    [state.subThemeId ? 'category_ids' : '']: state.subThemeId,
    search_status: state.status.bookState,
    search_sort: state.status.slot,
    search_word_count: state.textKey,
    page: libraryPage,
    page_size: 30,
    [penName ? 'pen_name' : '']: penName,
    [searchKey ? 'search_keywords' : '']: searchKey,
  });
  const { setLoadingModel } = useAuth();
  // 内容是否空
  const [noData, setNoData] = useState(false);

  // 获取分类
  const { data: cateGoryData } = useGetBookCategory({});

  // 选择主题
  const choseTheme = (
    val: bookCategoryProps,
    index: number,
    type: 'men' | 'women',
  ) => {
    if (val === currentTheme.theme) {
      setTheme({
        layerIndex: null,
        theme: null,
        type: null,
      });
      return false;
    }
    setTheme({
      layerIndex: index,
      theme: val,
      type,
    });
    //    修改二级分类
    changeKey('subThemeId', null);
  };
  // 选中键修改
  const changeKey = (type: string, val: unknown) => {
    changeState({ [type]: val });
    setBookShelfData([]);
  };
  // 去阅读
  const toRead = (book: rankBook) => {
    const webContainerRef = document.querySelector(
      '.webContainer',
    ) as HTMLElement;
    dispatch({
      type: 'global/setBookLibrary',
      payload: { ...state, scroll: webContainerRef.scrollTop },
    });
    setBookShelfData([]);
    router.push('/read', { [BookId]: book.id });
  };

  // 触发滚动
  useEffect(() => {
    const webContainerRef = document.querySelector(
      '.webContainer',
    ) as HTMLElement;
    webContainerRef.onscroll = () => {
      scrollToBottom(300, () => {
        const total = bookShelf?.page_info?.total || 0;
        if (libraryPage * 30 >= total) return;
        setPage(libraryPage + 1);
      });
    };
    if (!bookShelf)
      // bookShelfData.toString() === bookShelf.data.toString()
      return;
    if (bookShelf.data.length === 0 && bookShelfData.length === 0)
      setNoData(true);
    else setNoData(false);
    const val = setArrayForId([...bookShelfData, ...bookShelf.data]);
    setBookShelfData(val);
  }, [bookShelf]);
  useEffect(() => {
    if (!cateGoryData || cateGoryData.length === 0) return;
    let menArray = targetColumnArray<bookCategoryProps>(
      cateGoryData[0].child || [],
      6,
    );
    let womenArray = targetColumnArray<bookCategoryProps>(
      cateGoryData[1].child || [],
      6,
    );
    setCategoryMenList(menArray);
    setCategoryWomenList(womenArray);
  }, [cateGoryData]);
  useEffect(() => {
    setLoadingModel(shelfLoading);
  }, [shelfLoading]);
  // 搜索词改变
  useEffect(() => {
    if (searchKey === null) return;
    setBookShelfData([]);
  }, [searchKey]);
  // 滚动到记录位置
  useEffect(() => {
    if (bookShelfData.length === 0) return;
    const webContainerRef = document.querySelector(
      '.webContainer',
    ) as HTMLElement;
    webContainerRef.scrollTop = globalState.bookLibraryConfig.scroll;
    return () => {
      webContainerRef.removeEventListener('onscroll', () => {});
    };
  }, [bookShelfData]);
  const ThemeComponent = ({ themes, index, type }: ThemeComponentProps) => {
    return (
      <div className={'bookShelf_box_theme_layer'}>
        {
          //    每层
          themes.map((item) => {
            return (
              <div
                key={item.id}
                className={`bookShelf_box_theme_layer_item ${
                  currentTheme.theme?.id === item.id ? 'bookShelf_select' : ''
                }`}
                onClick={() => choseTheme(item, index, type)}
              >
                <img src={item.cover_url} alt="" />
                <span>{item.name}</span>
              </div>
            );
          })
        }
        {/*二级分类*/}
        <UseNode
          rIf={currentTheme.layerIndex === index && type === currentTheme.type}
        >
          <div className={'bookShelf_box_theme_layer_subTheme'}>
            {currentTheme?.theme?.child?.map((subTheme) => {
              return (
                <span
                  key={subTheme.id}
                  onClick={() => changeKey('subThemeId', subTheme.id)}
                  className={
                    state.subThemeId === subTheme.id ? 'bookShelf_select' : ''
                  }
                >
                  {subTheme.name}
                </span>
              );
            })}
          </div>
        </UseNode>
      </div>
    );
  };

  return (
    <div className={'bookShelf'}>
      {/*    类别*/}
      <div className={'bookShelf_box'}>
        {/*    读者*/}
        <div className={'bookShelf_box_type'}>
          <span className={'bookShelf_label'}>读者：</span>
          {readType.map((type) => {
            return (
              <span
                className={`bookShelf_box_type_item ${
                  type.key === state.readKey ? 'bookShelf_select' : ''
                }`}
                key={type.key}
                onClick={() => changeKey('readKey', type.key)}
              >
                {type.label}
              </span>
            );
          })}
        </div>
        {/*    主题*/}
        <div className="bookShelf_box_theme">
          <span className={'bookShelf_label'}>主题：</span>
          <div>
            <UseNode rIf={state.readKey !== 2}>
              <div>
                {categoryMenList.map((themes, index) => {
                  return (
                    <ThemeComponent
                      key={'men' + index}
                      themes={themes}
                      index={index}
                      type={'men'}
                    />
                  );
                })}
              </div>
            </UseNode>
            <UseNode rIf={state.readKey !== 1}>
              <div>
                {categoryWomenList.map((themes, index) => {
                  return (
                    <ThemeComponent
                      key={'women' + index}
                      themes={themes}
                      index={index}
                      type={'women'}
                    />
                  );
                })}
              </div>
            </UseNode>
          </div>
        </div>
        {/*    状态*/}
        <div className={'bookShelf_box_type color_33 flex flex_align'}>
          <span className={'bookShelf_label'}>状态：</span>
          <div>
            {statusList[0].map((type) => {
              return (
                <span
                  className={`bookShelf_box_type_item ${
                    type.key === state.status.bookState
                      ? 'bookShelf_select'
                      : ''
                  }`}
                  onClick={() =>
                    changeKey('status', {
                      ...state.status,
                      bookState: type.key,
                    })
                  }
                  key={type.key}
                >
                  {type.label}
                </span>
              );
            })}
            {statusList[1].map((type) => {
              return (
                <span
                  className={`bookShelf_box_type_item ${
                    type.key === state.status.slot ? 'bookShelf_select' : ''
                  }`}
                  onClick={() =>
                    changeKey('status', { ...state.status, slot: type.key })
                  }
                  key={type.key}
                >
                  {type.label}
                </span>
              );
            })}
          </div>
        </div>
        {/*    字数*/}
        <div className={'bookShelf_box_type color_33'}>
          <span className={'bookShelf_label'}>字数：</span>
          {textNum.map((type) => {
            return (
              <span
                className={`bookShelf_box_type_item ${
                  type.key === state.textKey ? 'bookShelf_select' : ''
                }`}
                onClick={() => changeKey('textKey', type.key)}
                key={'textNum' + type.key}
              >
                {type.label}
              </span>
            );
          })}
        </div>
      </div>
      {noData ? (
        <DefaultNoData type={'noData'} className={'bookShelf_noData'} />
      ) : (
        <div>
          <BookLibrary
            bookList={bookShelfData}
            onClick={(book) => toRead(book)}
          />
        </div>
      )}
    </div>
  );
};
export default React.memo(Books);
