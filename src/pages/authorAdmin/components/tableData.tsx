import React from 'react';
import { contractType } from '@/type';
import { contractTranslate } from '@/utils/format';
import './styles/tableData.less';

export type incomeType = {
  base?: string; //基础稿费
  vip?: string; //vip分成
  gift: string; //礼物收益
  channel: string; //渠道分成
  welfare: string; //网站福利
  advertising: string; //广告收益
  count: string; //总计
  time: string; //发放时间
  actualAmount: string; //实发
};
export type TableDataType = {
  id: number;
  bookName: string;
  type: contractType; //签约类型
  income: incomeType;
};

export const TableData = ({ bookName, type, income }: TableDataType) => {
  //保底
  const MinimumComponent = () => {
    return (
      <table className={'tableData'}>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <p>{bookName}</p>
              <p>（{contractTranslate(type)}）</p>
            </td>
            <td colSpan={6} style={{ color: '#DAD7D7' }}>
              基础稿费 {income.base}
            </td>
            <td>发放时间</td>
            <td>实发稿费</td>
          </tr>
          <tr>
            <td>vip分成 {income.vip}</td>
            <td>礼物收益 {income.gift}</td>
            <td>渠道分成 {income.channel}</td>
            <td>网站福利 {income.welfare}</td>
            <td>广告 {income.advertising}</td>
            <td>总计 {income.count}</td>
            <td>{income.time}</td>
            <td>{income.actualAmount}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  //买断
  const BuyoutComponent = () => {
    return (
      <table className={'tableData otherTable'}>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <p>{bookName}</p>
              <p>（{contractTranslate(type)}）</p>
            </td>
            <td>基础稿费</td>
            <td>礼物收益</td>
            <td>渠道分成</td>
            <td>网站福利</td>
            <td>广告</td>
            <td>总计</td>
            <td>发放时间</td>
            <td>实发稿费</td>
          </tr>
          <tr>
            <td>{income.base}</td>
            <td>{income.gift}</td>
            <td>{income.channel}</td>
            <td>{income.welfare}</td>
            <td>{income.advertising}</td>
            <td>{income.count}</td>
            <td>{income.time}</td>
            <td>{income.actualAmount}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  //分层
  const HierarchyComponent = () => {
    return (
      <table className={'tableData otherTable'}>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <p>{bookName}</p>
              <p>（{contractTranslate(type)}）</p>
            </td>
            <td>VIP分成</td>
            <td>礼物收益</td>
            <td>渠道分成</td>
            <td>网站福利</td>
            <td>广告</td>
            <td>总计</td>
            <td>发放时间</td>
            <td>实发稿费</td>
          </tr>
          <tr>
            <td>{income.vip}</td>
            <td>{income.gift}</td>
            <td>{income.channel}</td>
            <td>{income.welfare}</td>
            <td>{income.advertising}</td>
            <td>{income.count}</td>
            <td>{income.time}</td>
            <td>{income.actualAmount}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  return type === 'minimum' ? (
    <MinimumComponent />
  ) : type === 'buyout' ? (
    <BuyoutComponent />
  ) : (
    <HierarchyComponent />
  );
};
