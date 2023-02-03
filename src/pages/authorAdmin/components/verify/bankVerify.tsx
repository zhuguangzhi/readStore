//银行信息认证

import { Button, Form, FormInstance, Input, message, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import '../../style/formCommon.less';
import './style/bankVerify.less';
import { Values } from 'async-validator';
import {
  useBankVerify,
  useGetBankInfo,
} from '@/utils/authorAdmin/personalInfo';
import { useAuth } from '@/hook/useAuth';
import { useAsync } from '@/hook/useAsync';
import { AuthorPersonal, ErrorCheck } from '@/common/api';
import { bankListProps } from '@/type/authorAdmin/personalInfo';
import { ResponseData } from '@/common/http';

type BankVerifyProps = {
  form?: FormInstance;
  setStep: Function;
  isFinish: boolean;
  onCancel: Function; //关闭弹窗
};
export const BankVerify = ({
  form,
  setStep,
  isFinish,
  onCancel,
}: BankVerifyProps) => {
  // 银行列表
  const [bankList, setBankList] = useState<bankListProps[]>([]);
  // 监听频道的改变
  const bankName = Form.useWatch('bankName', form);
  const debounceRef = useRef<NodeJS.Timer | null>(null);
  // 获取银行卡信息
  const { mutate: getBankInfo, data: bankInfo } = useGetBankInfo();

  const { mutate: bankVerify, isLoading: bankLoading } = useBankVerify(setStep);
  const { userInfo } = useAuth();
  const { run } = useAsync<ResponseData<bankListProps[]>>();
  const onAuthBank = (value: Values) => {
    if (isFinish) {
      onCancel();
      return;
    }
    if (!userInfo) {
      message.error('登陆信息有误请退出后重新登陆');
      return;
    }
    bankVerify({
      user_id: String(userInfo.id),
      bank: value.bankName,
      bank_mobile: value.mobile,
      bank_card: value.cardNum,
      bank_address: value.subBranchName,
      bank_number: value.bankNum,
    });
  };

  // 搜索支行列表
  const searchBank = (keywords: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      const searchRes = await run(
        AuthorPersonal.getBankList({ keywords: (bankName || '') + keywords }),
      );
      setBankList(searchRes?.data || []);
    }, 200);
  };

  useEffect(() => {
    if (!isFinish || !userInfo) return;
    getBankInfo({ user_id: String(userInfo.id) });
  }, [isFinish]);
  useEffect(() => {
    if (!bankInfo || !ErrorCheck(bankInfo)) return;
    const { data: bankValue } = bankInfo;
    form?.setFieldsValue({
      name: bankValue.bank_username,
      cardNum: bankValue.bank_card,
      mobile: bankValue.bank_mobile,
      bankName: bankValue.bank,
      subBranchName: bankValue.bank_address,
      bankNum: bankValue.bank_number,
    });
  }, [bankInfo]);
  return (
    <Form
      labelCol={{ span: 6 }}
      className={'bankVerify'}
      disabled={isFinish}
      form={form}
      onFinish={onAuthBank}
      requiredMark={false}
    >
      <Form.Item
        label={'姓名'}
        name={'name'}
        rules={[{ required: true, message: '请填写姓名' }]}
      >
        <Input className={'bankVerify_input'} autoComplete={'off'} />
      </Form.Item>
      <Form.Item label={'银行卡号'}>
        <div className={'bankVerify_box'}>
          <Form.Item
            name={'cardNum'}
            rules={[{ required: true, message: '请填写银行卡号' }]}
          >
            <Input className={'bankVerify_input'} autoComplete={'off'} />
          </Form.Item>
          <span className={'bankVerify_box_tip'}>
            建议作者使用一类银行卡作为收款账户（二类卡有转账限额，可能导致稿费发放失败）
          </span>
        </div>
      </Form.Item>
      <Form.Item
        label={'银行预留手机号'}
        name={'mobile'}
        rules={[{ required: true, message: '请填写银行预留手机号' }]}
      >
        <Input
          maxLength={11}
          minLength={11}
          className={'bankVerify_input'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item
        label={'开户行名称'}
        name={'bankName'}
        rules={[{ required: true, message: '请填写开户行名称' }]}
      >
        <Input
          className={'bankVerify_input'}
          placeholder={'如: 中国银行'}
          autoComplete={'off'}
        />
      </Form.Item>
      <Form.Item
        label={'开户行支行名称'}
        name={'subBranchName'}
        rules={[{ required: true, message: '请填写开户行支行名称' }]}
      >
        <Select
          showSearch
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          notFoundContent={null}
          onSearch={searchBank}
        >
          {(bankList || []).map((bank, index) => (
            <Select.Option
              key={index + bank.id}
              value={bank.district + bank.name}
            >
              {bank.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={'银行行号'}>
        <div className={'bankVerify_box'}>
          <Form.Item
            name={'bankNum'}
            rules={[{ required: true, message: '请填写银行行号' }]}
          >
            <Input className={'bankVerify_input'} autoComplete={'off'} />
          </Form.Item>
          <span className={'bankVerify_box_tip'}>
            为了方便接受稿费，如不清楚行号，可以电话咨询银行客服。
          </span>
        </div>
      </Form.Item>
      <Button
        className={'readModal_footerBtn'}
        shape="round"
        type={'primary'}
        style={{ marginBottom: '76px' }}
        htmlType={'submit'}
        loading={bankLoading}
        disabled={false}
      >
        {isFinish ? '关闭' : '银行认证'}
      </Button>
    </Form>
  );
};
