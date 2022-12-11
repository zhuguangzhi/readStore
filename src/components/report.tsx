import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Values } from 'async-validator';
import './style/report.less';

export const Report = () => {
  const reportType = [
    { key: 0, label: '垃圾广告' },
    { key: 1, label: '有害信息' },
    { key: 2, label: '政治敏感' },
    { key: 3, label: '低俗色情' },
    { key: 4, label: '人身攻击' },
    { key: 5, label: '涉嫌侵权' },
    { key: 6, label: '骚扰' },
  ];
  const [reportIndex, setReportIndex] = useState(0);
  const onSubmit = (val: Values) => {
    console.log(val.result);
  };
  return (
    <div className={'report'}>
      <p className={'font_16 font_bold report_title'}>举报内容</p>
      <div className={'report_tip'}>
        <span className={'report_tip_icon'}>*</span>
        <span className={'font_14 font_bold'}>请选择举报原因</span>
      </div>
      <div className={'report_type'}>
        {reportType.map((type) => {
          return (
            <span
              key={type.key}
              onClick={() => setReportIndex(type.key)}
              className={`report_type_item ${
                reportIndex === type.key ? 'reportSelect' : ''
              }`}
            >
              {type.label}
            </span>
          );
        })}
      </div>
      <p style={{ marginTop: '30px' }}>
        <span className={'font_14 font_bold'}>举报内容</span>
        <span className={'font_14 color_99'}>（选填）</span>
      </p>
      <Form onFinish={onSubmit} className={'report_box'}>
        <Form.Item name={'result'}>
          <Input.TextArea
            style={{ resize: 'none' }}
            className={'report_box_input'}
            placeholder={'提供更多信息有利于快速处理～'}
          />
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
