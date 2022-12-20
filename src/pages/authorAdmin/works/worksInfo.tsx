import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './style/worksInfo.less';
import { Values } from 'async-validator';
import router, { useSearchParam } from '@/hook/url';
import { WorksId } from '@/constants/url';
import {
  uesGetAuthorBookDetails,
  useCreateAuthorBook,
  useModifyAuthorBook,
} from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
import { useGetBookCategory } from '@/utils/bookShelf';
import { bookCategoryProps, createBooksProps } from '@/type/book';

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 3 },
  },
};
export const worksInfo = () => {
  const [{ [WorksId]: worksId }] = useSearchParam([WorksId]);
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
  const [formValues] = Form.useForm();
  // 监听频道的改变
  const channelType = Form.useWatch('channel_type', formValues) as 1 | 2;
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

  useEffect(() => {
    if (!worksInfo) return;
    formValues.setFieldsValue({ ...worksInfo });
  }, [worksInfo]);
  useEffect(() => {
    if (!cateGoryData || !worksInfo || !channelType) return;
    setParentCategory(cateGoryData[channelType - 1].child);
    if (!category)
      onParentCategoryChange(
        worksInfo.parent_category_id,
        cateGoryData[channelType - 1].child,
      );
  }, [channelType, cateGoryData, worksInfo]);

  const onSubmit = (values: Values) => {
    if (worksId) {
      modifyAuthorBook({ ...values, id: Number(worksId) } as createBooksProps);
      return;
    }
    createAuthorBook({ ...values } as createBooksProps);
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
  // 清除选中一二级分类
  const clearCheckCategory = () => {
    formValues.setFieldsValue({
      parent_category_id: '',
      category_id: '',
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
                    onChange={(value) => onParentCategoryChange(value)}
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
          <Form.Item label="作品标签">
            <Form.Item name={'tags'}>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="请输入标签(超出5个无效)"
                getPopupContainer={() =>
                  document.getElementById('formItemSelect') as HTMLDivElement
                }
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
            <Form.Item name={'worksDescription'}>
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
              className={'worksInfo_right_button'}
              type="default"
              shape="round"
              onClick={() => router.back()}
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
