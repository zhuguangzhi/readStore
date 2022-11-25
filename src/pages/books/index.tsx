import React, { useState } from 'react';
import './style/index.less';
import { booksThemeProps } from '@/type/book';
import { testBooksThemeData } from '@/assets/testData';
import { UseNode } from '@/components/UseNode';
import { useSetState } from '@/hook';

const readType = [
  { key: 'all', label: '全部' },
  { key: 'mFrequency', label: '男频' },
  { key: 'wFrequency', label: '女频' },
];
const statusList = [
  { key: 'all', label: '全部' },
  { key: 'finish', label: '已完结' },
  { key: 'serial', label: '连载中' },
  { key: 'hot', label: '最热' },
  { key: 'fresh', label: '最新' },
];
const textNum = [
  { key: 'all', label: '全部' },
  { key: '3', label: '30万以下' },
  { key: '5', label: '30万—50万' },
  { key: '10', label: '50万—100万' },
  { key: '200', label: '100万—200万' },
  { key: 'more', label: '200万以上' },
];

export default () => {
  //主题列表
  const [bookTheme] = useState<booksThemeProps[][]>(testBooksThemeData);
  const [currentTheme, setTheme] = useState({
    layerIndex: null as number | null,
    theme: null as booksThemeProps | null,
  });
  const [state, setState] = useState({
    readKey: 'all', //选中读者key
    subThemeId: null as booksThemeProps['id'] | null, //选中二级主题id
    statusKey: 'all', //选中状态key
    textKey: 'all', //选中字数key
  });
  const changeState = useSetState(state, setState);

  // 选择主题
  const choseTheme = (val: booksThemeProps, index: number) => {
    if (val === currentTheme.theme) {
      setTheme({
        layerIndex: null,
        theme: null,
      });
      return false;
    }
    setTheme({
      layerIndex: index,
      theme: val,
    });
    //    修改二级分类
    changeKey('subThemeId', null);
  };
  // 选中键修改
  const changeKey = (type: string, val: unknown) => {
    changeState({ [type]: val });
  };

  return (
    <div className={'read'}>
      {/*    类别*/}
      <div className={'read_box'}>
        {/*    读者*/}
        <div className={'read_box_type'}>
          <span className={'read_label'}>读者：</span>
          {readType.map((type) => {
            return (
              <span
                className={`read_box_type_item ${
                  type.key === state.readKey ? 'read_select' : ''
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
        <div className="read_box_theme">
          <span className={'read_label'}>主题：</span>
          <div>
            {bookTheme.map((themes, index) => {
              return (
                <div key={index} className={'read_box_theme_layer'}>
                  {
                    //    每层
                    themes.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={`read_box_theme_layer_item ${
                            currentTheme.theme?.id === item.id
                              ? 'read_select'
                              : ''
                          }`}
                          onClick={() => choseTheme(item, index)}
                        >
                          <img
                            src={require('@/assets/test/theme.png')}
                            alt=""
                          />
                          <span>{item.name}</span>
                        </div>
                      );
                    })
                  }
                  {/*二级分类*/}
                  <UseNode rIf={currentTheme.layerIndex === index}>
                    <div className={'read_box_theme_layer_subTheme'}>
                      {currentTheme?.theme?.subTheme?.map((subTheme) => {
                        return (
                          <span
                            key={subTheme.id}
                            onClick={() => changeKey('subThemeId', subTheme.id)}
                            className={
                              state.subThemeId === subTheme.id
                                ? 'read_select'
                                : ''
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
            })}
          </div>
        </div>
        {/*    状态*/}
        <div className={'read_box_type color_33'}>
          <span className={'read_label'}>状态：</span>
          {statusList.map((type) => {
            return (
              <span
                className={`read_box_type_item ${
                  type.key === state.statusKey ? 'read_select' : ''
                }`}
                onClick={() => changeKey('statusKey', type.key)}
                key={type.key}
              >
                {type.label}
              </span>
            );
          })}
        </div>
        {/*    字数*/}
        <div className={'read_box_type color_33'}>
          <span className={'read_label'}>字数：</span>
          {textNum.map((type) => {
            return (
              <span
                className={`read_box_type_item ${
                  type.key === state.textKey ? 'read_select' : ''
                }`}
                onClick={() => changeKey('textKey', type.key)}
                key={type.key}
              >
                {type.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
