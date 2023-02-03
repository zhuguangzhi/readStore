import { tagsDataProps } from '@/type/authorAdmin/worksManager';
import React, { ChangeEvent, useEffect, useState } from 'react';
import './style/worksTags.less';
import { Input, message } from 'antd';
import { IconFont } from '@/components/IconFont';
import { ReadModel } from '@/components/module/ReadModel';

type WorksTagsProps = {
  tagsList: tagsDataProps[] | undefined;
  onOk: (tags: string[]) => void;
  openTagsModel: boolean;
  setTagsModel: (open: boolean) => void;
  defaultTags: string[];
};
type tagsProps = {
  name: string;
  tags: string[];
  count: number;
};
export const WorksTags = ({ tagsList, ...props }: WorksTagsProps) => {
  // 标签类别选中索引
  const [currentTab, setCurrentTab] = useState(0);
  const [tabList, setTabList] = useState<Omit<tagsProps, 'tags'>[]>([]);
  // 存储标签
  const [tags, setTags] = useState<tagsProps[]>([]);
  // 展示标签
  const [showTags, setShowTags] = useState<tagsProps[]>([]);
  const [choseTags, setChoseTags] = useState<string[]>(props.defaultTags);
  // 搜索keyword
  const [searchKeyword, setKeyword] = useState('');

  // 添加||移除标签
  const addChoseTags = (tag: string) => {
    let tagArray = [...choseTags];
    const haveTag = choseTags.indexOf(tag);
    if (haveTag !== -1) {
      tagArray.splice(haveTag, 1);
      setChoseTags(tagArray);
      return;
    }
    if (tagArray.length >= 5) {
      message.error('最多选择5个标签');
      return;
    }
    tagArray.push(tag);
    setChoseTags(tagArray);
  };
  // 标签类型改变
  const tabChange = (index: number) => {
    setCurrentTab(index);
    setKeyword('');
    if (index === 0) {
      setShowTags(tags);
      return;
    }
    setShowTags([tags[index - 1]]);
  };
  // 输入框改变
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchValue: tagsProps[] = [];
    setKeyword(e.target.value);
    tags.forEach((tag) => {
      const arr = tag.tags.filter((item) => item.includes(e.target.value));
      if (arr.length > 0) {
        searchValue.push({ name: tag.name, count: arr.length, tags: arr });
      }
    });
    setShowTags(searchValue);
  };
  // 关闭弹窗
  const closeModel = () => {
    props.setTagsModel(false);
    setCurrentTab(0);
  };

  useEffect(() => {
    if (tagsList === undefined) return;
    // 标签类型tab
    let tabArray: Omit<tagsProps, 'tags'>[] = [{ name: '全部', count: 0 }];
    // 标签列表
    let tagsArray: tagsProps[] = [];
    tagsList.forEach(async (item) => {
      let tags = item.content.split(',');
      tabArray[0].count += tags.length;
      tabArray.push({ name: item.name, count: tags.length });
      tagsArray.push({
        name: item.name,
        tags: tags,
        count: tags.length,
      });
    });
    setTags(tagsArray);
    setTabList(tabArray);
    setShowTags(tagsArray);
  }, [tagsList]);
  useEffect(() => {
    setChoseTags(props.defaultTags);
  }, [props.defaultTags]);

  return (
    <ReadModel
      useTitle={false}
      open={props.openTagsModel}
      width={'791px'}
      className={'worksInfo_tagsModel'}
      onCancel={closeModel}
      onOk={() => {
        props.onOk(choseTags);
        closeModel();
      }}
    >
      <div className={'worksTags'}>
        <div className={'worksTags_header'}>
          <span>选择标签</span>
        </div>
        <div className={'worksTags_container'}>
          {/*类别*/}
          <div className={'worksTags_container_type'}>
            <p className={'worksTags_container_label'}>标签类别</p>
            {tabList?.map((tag, index) => {
              return (
                <span
                  className={`worksTags_container_type_tag ${
                    currentTab === index ? 'worksTags_typeSelect' : ''
                  }`}
                  key={index}
                  onClick={() => tabChange(index)}
                >
                  {tag.name}({tag.count})
                </span>
              );
            })}
            <Input
              className={'worksTags_container_type_input'}
              onChange={inputChange}
              value={searchKeyword}
              placeholder={'请输入标签名称'}
              suffix={<IconFont icon={'search'} />}
            />
          </div>
          {/*  标签*/}
          <div className={'worksTags_container_tagList'}>
            {showTags.map((item, index) => {
              return (
                <div key={index} className={'worksTags_container_tagList_item'}>
                  <p className={'worksTags_container_label'}>{item.name}</p>
                  <div className={'tagsBox'}>
                    {item.tags.map((tag, tagIndex) => {
                      return (
                        <span
                          className={`tagsBox_tag ${
                            choseTags.includes(tag) ? 'worksTags_tagSelect' : ''
                          }`}
                          key={tagIndex}
                          onClick={() => addChoseTags(tag)}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/*  已选标签*/}
          <div className={'worksTags_container_choseTags'}>
            <div className={'justify_between'}>
              <p className={'worksTags_container_label'}>
                <span>已选标签</span>
                <span className={'color_99'}>({choseTags.length}/5)</span>
              </p>
              <p
                className={'color_99 flex flex_align cursor'}
                onClick={() => setChoseTags([])}
              >
                <IconFont icon={'delete'} marginRight={'4px'} />
                <span>清空</span>
              </p>
            </div>
            <div className={'worksTags_container_choseTags_list'}>
              {choseTags.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={'worksTags_container_choseTags_list_item'}
                  >
                    <span>{item}</span>
                    <IconFont
                      icon={'cha'}
                      onClick={() => addChoseTags(item)}
                      className={
                        'worksTags_container_choseTags_list_item_delete'
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ReadModel>
  );
};
