// 连载状态
export const isFinish = (val: 'Y' | 'N') => (val === 'Y' ? '完结' : '连载中');
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
