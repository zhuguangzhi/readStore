import React from 'react';

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (val: unknown) =>
  val === null || val === undefined || val === '';

//删除无效字符对象
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
//阻止事件冒泡
export const stopProp = (
  e: React.MouseEvent<HTMLDivElement>,
  callback: Function,
) => {
  e.stopPropagation();
  callback();
};
