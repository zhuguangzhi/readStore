// 连载状态
export const isFinish = (val: 'Y' | 'N') => (val === 'Y' ? '完结' : '连载中');
//字数转换
export const translateNumber = (number: number) => {
  if (number < 10000) return `${number}字`;
  else return `${number / 10000}万字`;
};
