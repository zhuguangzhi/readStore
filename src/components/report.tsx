import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Values } from 'async-validator';
import './style/report.less';
import { useGetReportOption, useReport } from '@/utils/read';
import { reportOptionProps } from '@/type/user';
import { useAuth } from '@/hook/useAuth';

export type ReportProps = {
  bookId: number;
  chapterId: number;
};
export const Report = ({ bookId, chapterId }: ReportProps) => {
  // 获取举报配置
  const { data: reportOption, isLoading: optionLoading } = useGetReportOption();
  // 举报
  const { mutate: report, isLoading: reportLoading } = useReport();
  const { setLoadingModel } = useAuth();
  const [reportId, setReportId] = useState(0);
  const onSubmit = (val: Values) => {
    report({
      book_id: bookId,
      chapter_id: chapterId,
      report_reason_id: reportId,
      report_detail: val.result,
    });
  };
  useEffect(() => {
    if (!reportOption) return;
    const option = reportOption.find(
      (option) => option.is_default === 1,
    ) as reportOptionProps;
    setReportId(option.id);
  }, [reportOption]);
  useEffect(() => {
    setLoadingModel(optionLoading);
  }, [optionLoading]);
  return (
    <div className={'report'}>
      <p className={'font_16 font_bold report_title'}>举报内容</p>
      <div className={'report_tip'}>
        <span className={'report_tip_icon'}>*</span>
        <span className={'font_14 font_bold'}>请选择举报原因</span>
      </div>
      <div className={'report_type'}>
        {reportOption?.map((type) => {
          return (
            <span
              key={type.id}
              onClick={() => setReportId(type.id)}
              className={`report_type_item ${
                reportId === type.id ? 'reportSelect' : ''
              }`}
            >
              {type.reason}
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
          <Button type={'primary'} htmlType={'submit'} loading={reportLoading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
