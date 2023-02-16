// 连载状态
import { contractProps } from '@/type/authorAdmin/personalInfo';
import { incomeDistributeProps } from '@/type/authorAdmin/income';
import { incomeTotalProps } from '@/type/authorAdmin/home';

export const isFinish = (val: 1 | 2) => (val === 1 ? '完结' : '连载中');
//字数转换万
export const translateNumber = (number: number, unit = true) => {
  if (number < 10000) return `${number}${unit ? '字' : ''}`;
  else return `${(number / 10000).toFixed(2)}万${unit ? '字' : ''}`;
};
//数字转换序号
export const numberToSerial = (num: number) => {
  const serialList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
  return serialList[num - 1] || null;
};
//签约类型转换
export const contractTranslate = (val: 1 | 2 | 3) => {
  const list: { [key in typeof val]: string } = {
    3: '保底签约',
    2: '分成签约',
    1: '买断签约',
  };
  return list[val];
};
// 收入查询饼图数据描述 ---------------------------------start
export const pieDataTranslate = (val: incomeDistributeProps | undefined) => {
  if (!val) return [] as { name: string; value: number }[];
  const list: { key: Partial<keyof incomeDistributeProps>; label: string }[] = [
    { key: 'base_royalties', label: '基础稿费' },
    { key: 'channel', label: '渠道分成' },
    { key: 'gift', label: '礼物收益' },
    { key: 'vip', label: 'vip分成' },
    { key: 'welfare', label: '网站福利' },
  ];
  return list.map((item) => {
    return { name: item.label, value: Number(val[item.key]) };
  });
};
// 全部稿费
export const allFeeTranslate = (
  val: Partial<keyof incomeTotalProps> | undefined,
) => {
  if (!val) return '';
  const list: { key: Partial<keyof incomeTotalProps>; label: string }[] = [
    { key: 'base_royalties', label: '基础签约稿费' },
    { key: 'channel', label: '三方渠道分成' },
    { key: 'gift', label: '礼物打赏分成' },
    { key: 'advert', label: '广告投放分成' },
    { key: 'vip', label: 'vip分成' },
    { key: 'welfare', label: '网站福利' },
  ];
  return list.find((item) => item.key === val)?.label || '';
};
// 收入查询饼图数据描述 ---------------------------------end
// 合同状态
export const contrastStatus = (val: contractProps['sign_status']) => {
  const list = {
    1: '签署中',
    2: '签署完成',
    3: '失败',
    4: '拒签',
  };
  return list[val];
};
