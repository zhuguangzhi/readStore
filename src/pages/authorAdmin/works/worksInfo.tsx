import React from 'react';
import { testBookData } from '@/assets/testData';
import { Button, Form, Input, Radio, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './style/worksInfo.less';
import { Values } from 'async-validator';
import router from '@/hook/url';

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 3 },
  },
};
export const worksInfo = () => {
  const formValues = Form.useFormInstance();

  const onSubmit = (values: Values) => {
    console.log('values', values);
  };

  return (
    <div className={'worksInfo'}>
      <div className={'worksInfo_left'}>
        <img
          className={'worksInfo_left_img'}
          src={testBookData[8].face}
          alt=""
        />
        <Button
          className={'worksInfo_left_button'}
          type="default"
          shape="round"
          size={'large'}
        >
          选择封面
        </Button>
      </div>
      <div>
        <Form
          form={formValues}
          className={'worksInfo_right'}
          labelAlign={'right'}
          layout="horizontal"
          colon={false}
          {...formItemLayout}
          onFinish={onSubmit}
        >
          <Form.Item label="作品名称" name={'worksName'}>
            <Input />
          </Form.Item>
          <Form.Item label="作品频道" name={'worksChannel'}>
            <Radio.Group>
              <Radio value={1}> 男频 </Radio>
              <Radio value={2}> 女频 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="作品类型" name={'worksType'}>
            <div id={'formItemSelect'}>
              <Select
                style={{ width: '100px' }}
                getPopupContainer={() =>
                  document.getElementById('formItemSelect') as HTMLElement
                }
              >
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </div>
          </Form.Item>
          <Form.Item label="作品标签">
            <Form.Item name={'tags'}>
              <Input />
            </Form.Item>
            <span className={'worksInfo_right_tip'}>
              多个标签请以空格隔开（最多五个）
            </span>
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
              注意：严禁上传任何涉黄、涉赌、涉毒、涉政、涉黑等违规内容。一经查实，全书屏蔽整改并取消福利，情节严重的会追
            </span>
          </Form.Item>
          <Form.Item label=" ">
            <Button
              htmlType="submit"
              className={'worksInfo_right_button'}
              type="primary"
              shape="round"
            >
              确定修改
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
