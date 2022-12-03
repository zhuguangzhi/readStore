// 连载状态
import { contractType } from '@/type';

export const isFinish = (val: 1 | 2) => (val === 'Y' ? '完结' : '连载中');
//字数转换万
export const translateNumber = (number: number) => {
  if (number < 10000) return `${number}字`;
  else return `${number / 10000}万字`;
};
//数字转换序号
export const numberToSerial = (num: number) => {
  const serialList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'];
  return serialList[num - 1] || null;
};
//签约类型转换
export const contractTranslate = (val: contractType) => {
  const list: { [key in contractType]: string } = {
    minimum: '保底签约',
    hierarchy: '分成签约',
    buyout: '买断签约',
  };
  return list[val];
};
