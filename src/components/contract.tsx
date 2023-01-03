// 签约
import React from 'react';
import { bookInfoProps } from '@/type/book';
import { useAuth } from '@/hook/useAuth';
import { Button } from 'antd';
import './style/contract.less';

type contractProps = {
  bookInfo: bookInfoProps | null;
};
export const Contract = ({ bookInfo }: contractProps) => {
  const { authorInfo } = useAuth();
  return (
    <div className={'contract'}>
      <div className={'contract_item'}>
        <p className={'contract_item_label SYBold font_18'}>作品详情</p>
        <div className={'contract_item_info'}>
          <div className={'contract_item_info_detail'}>
            <p>封面</p>
            <img src={bookInfo?.cover_url} alt="" />
          </div>
          <div className={'contract_item_info_detail'}>
            <p>作品名称</p>
            <span>{bookInfo?.name}</span>
          </div>
          <div className={'contract_item_info_detail'}>
            <p>字数</p>
            <span>{bookInfo?.word_count}</span>
          </div>
          <div className={'contract_item_info_detail'}>
            <p>状态</p>
            <span>{bookInfo?.is_finish_text}</span>
          </div>
        </div>
      </div>
      <div className={'contract_item'}>
        <p className={'contract_item_label SYBold font_18'}>账号信息</p>
        <div className={'contract_item_info'}>
          <div className={'contract_item_info_detail'}>
            <p>笔名</p>
            <span>{authorInfo?.pen_name}</span>
          </div>
        </div>
      </div>
      <p className={'contract_tip'}>
        若信息有误，或者填写中有疑问，请及时联系平台工作人员
      </p>
      <Button className={'contract_btn'}>提交审核</Button>
    </div>
  );
};
