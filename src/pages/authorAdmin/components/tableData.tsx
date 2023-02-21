import React, { useMemo } from 'react';
import './styles/tableData.less';
import { incomeListDataProps } from '@/type/authorAdmin/income';
import moment from 'moment';

export const TableData = ({
  name,
  searchDate,
  ...props
}: incomeListDataProps) => {
  //保底
  const MinimumComponent = () => {
    // 基础稿费是否大于等于其他合计
    const baseIsMore = useMemo(() => {
      const otherMoney =
        props.vip + props.gift + props.channel + props.welfare + props.advert;
      return props.base_royalties >= otherMoney;
    }, [props]);
    return (
      <table className={'tableData'}>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <p>{name}</p>
              <p>（{props.signing_type_text}）</p>
            </td>
            <td colSpan={6} className={baseIsMore ? 'feeSend' : 'feeNoSend'}>
              基础稿费：{props.base_royalties}
              <span style={{ color: '#656a7a' }}>
                {' '}
                (分成稿费低于基础稿费时，发放基础稿费){' '}
              </span>
            </td>
            <td className={baseIsMore ? 'feeSend' : 'feeNoSend'}>发放时间</td>
            <td className={baseIsMore ? 'feeSend' : 'feeNoSend'}>实发稿费</td>
          </tr>
          <tr className={!baseIsMore ? 'feeSend' : 'feeNoSend'}>
            <td>vip分成：{props.vip}</td>
            <td>
              礼物收益
              {moment(searchDate) < moment('2023-02') ? '(订阅+打赏)' : ''}：
              {props.gift}
            </td>
            <td>渠道分成：{props.channel}</td>
            <td>网站福利：{props.welfare}</td>
            <td>广告：{props.advert}</td>
            <td>总计：{props.total}</td>
            <td>{props.release_time}</td>
            <td>{props.actual_royalties}</td>
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
              <p>{name}</p>
              <p>（{props.signing_type_text}）</p>
            </td>
            <td>基础稿费</td>
            <td>
              礼物收益
              {moment(searchDate) < moment('2023-02') ? '（订阅+打赏）' : ''}
            </td>
            <td>渠道分成</td>
            <td>网站福利</td>
            <td>广告</td>
            <td>总计</td>
            <td>发放时间</td>
            <td>实发稿费</td>
          </tr>
          <tr>
            <td>{props.base_royalties}</td>
            <td>——</td>
            <td>——</td>
            <td>——</td>
            <td>——</td>
            <td>{props.total}</td>
            <td>{props.release_time}</td>
            <td>{props.actual_royalties}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  //分成
  const HierarchyComponent = () => {
    return (
      <table className={'tableData otherTable'}>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <p>{name}</p>
              <p>（{props.signing_type_text}）</p>
            </td>
            <td>VIP分成</td>
            <td>
              礼物收益
              {moment(searchDate) < moment('2023-02') ? '（订阅+打赏）' : ''}
            </td>
            <td>渠道分成</td>
            <td>网站福利</td>
            <td>广告</td>
            <td>总计</td>
            <td>发放时间</td>
            <td>实发稿费</td>
          </tr>
          <tr>
            <td>{props.vip}</td>
            <td>{props.gift}</td>
            <td>{props.channel}</td>
            <td>{props.welfare}</td>
            <td>{props.advert}</td>
            <td>{props.total}</td>
            <td>{props.release_time}</td>
            <td>{props.actual_royalties}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  return props.signing_type === 1 ? (
    <BuyoutComponent />
  ) : props.signing_type === 2 ? (
    <HierarchyComponent />
  ) : (
    <MinimumComponent />
  );
};
