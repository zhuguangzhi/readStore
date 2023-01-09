// 签约
import React from 'react';
import { bookInfoProps } from '@/type/book';
import { useAuth } from '@/hook/useAuth';
import { Button } from 'antd';
import './style/contract.less';

type contractProps = {
  bookInfo: bookInfoProps | null;
  contractStatus: 1 | 2 | 3; //1未申请 2申请中 3完成
  setStep: Function;
};
export const Contract = ({
  bookInfo,
  contractStatus,
  setStep,
}: contractProps) => {
  const { authorInfo } = useAuth();
  return (
    <div className={'contract'}>
      <div className={'contract_item'}>
        <p className={'contract_item_label SYBold font_14'}>作品详情</p>
        <div className={'contract_item_info'}>
          {/*<div className={'contract_item_info_detail'}>*/}
          {/*  <p>封面</p>*/}
          {/*  <img src={bookInfo?.cover_url} alt="" />*/}
          {/*</div>*/}
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
        <p className={'contract_item_label SYBold font_14'}>账号信息</p>
        <div className={'contract_item_info'}>
          <div className={'contract_item_info_detail'}>
            <p>笔名</p>
            <span>{authorInfo?.pen_name}</span>
          </div>
        </div>
      </div>
      <div className={'contract_desc'}>
        <p className={'font_bold'}>签约说明</p>
        <div className={'font_500 contract_desc_item SYMedium'}>
          <p>
            当作品字数达到三千字或以上，可发起作品签约，将有编辑进行签约评估{' '}
          </p>
          <p>
            签约后的作品，会授权到各大平台进推荐曝光，请作者大大用心创作，努力更新
          </p>
        </div>
      </div>
      <p className={'contract_tip'}>
        若信息有误，或者填写中有疑问，请及时联系平台工作人员
      </p>
      {contractStatus === 1 ? (
        <Button className={'contract_btn'}>提交申请</Button>
      ) : contractStatus === 2 ? (
        <Button className={'contract_btn contract_disabledBtn'}>
          申请中...
        </Button>
      ) : (
        <Button className={'contract_btn'} onClick={() => setStep()}>
          下一步
        </Button>
      )}
    </div>
  );
};
