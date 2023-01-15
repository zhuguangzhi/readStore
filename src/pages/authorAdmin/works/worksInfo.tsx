import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './style/worksInfo.less';
import { Values } from 'async-validator';
import router, { useSearchParam, useSetUrlParams } from '@/hook/url';
import { WorksChapterId, WorksId } from '@/constants/url';
import {
  uesGetAuthorBookDetails,
  useCreateAuthorBook,
  useGetTageList,
  useModifyAuthorBook,
} from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
import { useGetBookCategory } from '@/utils/bookShelf';
import { bookCategoryProps, createBooksProps } from '@/type/book';
import { useGetTopicList } from '@/utils/topic';
import { worksTabListProps } from '@/pages/authorAdmin/works/index';

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 3 },
  },
};
export const worksInfo = ({
  setTabList,
}: {
  setTabList: (val: worksTabListProps) => void;
}) => {
  const [{ [WorksId]: worksId }] = useSearchParam([WorksId]);
  // 设置路由参数
  const setRouterParam = useSetUrlParams();
  const [formValues] = Form.useForm();
  // 监听频道的改变
  const channelType = Form.useWatch('channel_type', formValues) as 1 | 2;
  // 作品信息
  const { data: worksInfo, isLoading: detailsLoading } =
    uesGetAuthorBookDetails({ id: Number(worksId) });
  // 分类列表
  const [parentCategory, setParentCategory] = useState<
    bookCategoryProps['child'] | null
  >(null);
  // 二级分类
  const [category, setCategory] = useState<bookCategoryProps['child'] | null>(
    null,
  );
  // 获取分类
  const { data: cateGoryData } = useGetBookCategory({});
  // 获取标签列表
  const { data: tagsList } = useGetTageList();
  // 获取话题列表
  const { data: topicLIst } = useGetTopicList({ page: 1, page_size: 99999 });

  const { setLoadingModel } = useAuth();

  // 创建作品
  const { mutate: createAuthorBook, isLoading: creatLoading } =
    useCreateAuthorBook(() => {
      setLoadingModel(false);
    });
  // 修改作品
  const { mutate: modifyAuthorBook, isLoading: modifyLoading } =
    useModifyAuthorBook();

  useEffect(() => {
    setLoadingModel(detailsLoading || creatLoading || modifyLoading);
  }, [detailsLoading, creatLoading, modifyLoading]);

  // 初始时格式化标签
  useEffect(() => {
    if (!worksInfo) return;
    //  书本是否审核通过
    if (worksInfo.book_status > 0) {
      setRouterParam({ [WorksChapterId]: worksInfo.chapter_id });
      setTabList({ label: '上传文章', key: 'addSection' });
    }
    const key = worksInfo.keyword ? worksInfo.keyword.split(',') : [];
    // 表单设置默认值
    formValues.setFieldsValue({ ...worksInfo, keyword: key });
  }, [worksInfo]);
  // 设置分类
  useEffect(() => {
    if (!cateGoryData || !channelType) return;
    setParentCategory(cateGoryData[channelType - 1].child);
    if (!category && worksInfo)
      onParentCategoryChange(
        worksInfo.parent_category_id,
        cateGoryData[channelType - 1].child,
      );
  }, [channelType, cateGoryData, worksInfo]);

  const onSubmit = (values: Values) => {
    if (values.keyword && values.keyword.length > 5) {
      message.error('作品标签数量超过5个');
      return;
    }
    const param = { ...values, keyword: values.keyword?.join(',') };
    if (worksId) {
      modifyAuthorBook({ ...param, id: Number(worksId) } as createBooksProps);
      return;
    }
    createAuthorBook({ ...param } as createBooksProps);
  };
  const onParentCategoryChange = (
    value: number,
    list: bookCategoryProps['child'] = [],
  ) => {
    const arr =
      (parentCategory || list).find((item) => item.id === Number(value))
        ?.child || null;
    setCategory(arr);
  };
  // 清除选中一二级分类 清除标签
  const clearCheckCategory = () => {
    formValues.setFieldsValue({
      parent_category_id: '',
      category_id: '',
      keyword: [],
    });
  };

  return (
    <div className={'worksInfo'}>
      {/*<div className={'worksInfo_left'}>*/}
      {/*  <img*/}
      {/*    className={'worksInfo_left_img'}*/}
      {/*    src={testBookData[8].face}*/}
      {/*    alt=""*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    className={'worksInfo_left_button'}*/}
      {/*    type="default"*/}
      {/*    shape="round"*/}
      {/*    size={'large'}*/}
      {/*  >*/}
      {/*    选择封面*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <div>
        <Form
          form={formValues}
          className={'worksInfo_right'}
          labelAlign={'right'}
          layout="horizontal"
          colon={false}
          disabled={(worksInfo?.book_status || 0) >= 1}
          {...formItemLayout}
          onFinish={onSubmit}
          initialValues={worksId ? {} : { channel_type: 1 }}
          requiredMark={false}
        >
          <Form.Item
            label="作品名称"
            name={'name'}
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input autoComplete={'off'} />
          </Form.Item>
          <Form.Item label="作品频道" name={'channel_type'}>
            <Radio.Group>
              <Radio value={1} onClick={clearCheckCategory}>
                {' '}
                男频{' '}
              </Radio>
              <Radio value={2} onClick={clearCheckCategory}>
                {' '}
                女频{' '}
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="作品类型">
            <div id={'formItemSelect'}>
              <Input.Group compact>
                <Form.Item
                  name={'parent_category_id'}
                  rules={[{ required: true, message: '请选择一级分类' }]}
                >
                  <Select
                    onChange={(value) => {
                      onParentCategoryChange(value);
                      formValues.setFieldsValue({
                        category_id: '',
                      });
                    }}
                    style={{ width: '120px' }}
                    getPopupContainer={() =>
                      document.getElementById(
                        'formItemSelect',
                      ) as HTMLDivElement
                    }
                  >
                    {parentCategory?.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={'category_id'}
                  rules={[{ required: true, message: '请选择二级分类' }]}
                >
                  <Select
                    style={{ width: '120px', marginLeft: '12px' }}
                    getPopupContainer={() =>
                      document.getElementById(
                        'formItemSelect',
                      ) as HTMLDivElement
                    }
                  >
                    {category?.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Input.Group>
              {/*<Select*/}
              {/*  style={{ width: '100px' }}*/}
              {/*  getPopupContainer={() =>*/}
              {/*    document.getElementById('formItemSelect') as HTMLElement*/}
              {/*  }*/}
              {/*>*/}
              {/*  <Select.Option value="demo">Demo</Select.Option>*/}
              {/*</Select>*/}
            </div>
          </Form.Item>
          <Form.Item
            label="话题"
            name={'topic_id'}
            rules={[{ required: true, message: '请选择话题' }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              getPopupContainer={() =>
                document.getElementById('formItemSelect') as HTMLDivElement
              }
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={topicLIst?.data.map((topic) => ({
                value: topic.id,
                label: topic.title,
              }))}
            />
          </Form.Item>
          <Form.Item label="作品标签">
            <Form.Item name={'keyword'}>
              <Select
                style={{ width: '100%' }}
                placeholder="请输入标签(最多五个)"
                showSearch
                optionFilterProp="children"
                mode="multiple"
                getPopupContainer={() =>
                  document.getElementById('formItemSelect') as HTMLDivElement
                }
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={tagsList?.[channelType]?.map((tag) => ({
                  value: tag,
                  label: tag,
                }))}
              />
            </Form.Item>
            {/*<span className={'worksInfo_right_tip'}>*/}
            {/*  多个标签请以空格隔开（最多五个）*/}
            {/*</span>*/}
          </Form.Item>

          <Form.Item label="签约状态">
            <span>未签约</span>
          </Form.Item>
          <Form.Item label="作品状态">
            <span>连载</span>
          </Form.Item>
          <Form.Item label="收藏">
            <span>0</span>
          </Form.Item>
          <Form.Item label="作品简介">
            <Form.Item name={'description'}>
              <TextArea rows={4} style={{ resize: 'none', height: '155px' }} />
            </Form.Item>
            <span
              style={{ color: '#E74E4E', bottom: '-25px' }}
              className={'worksInfo_right_tip'}
            >
              注意：严禁上传任何涉黄、涉赌、涉毒、涉政、涉黑等违规内容。一经查实，全书屏蔽整改并取消福利，情节严重的会追究其法律责任！
            </span>
          </Form.Item>
          <Form.Item label=" ">
            <Button
              htmlType="submit"
              className={'worksInfo_right_button'}
              type="primary"
              shape="round"
            >
              {worksId ? '确定修改' : '创建'}
            </Button>
            <Button
              disabled={false}
              className={'worksInfo_right_button'}
              type="default"
              shape="round"
              onClick={() => router.push('/admin/works')}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default worksInfo;
