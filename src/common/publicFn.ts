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

//  本地缓存
export const setStorage = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
// 获取缓存
export const getStorage = (key: string) => {
  const res = window.localStorage.getItem(key) as string;
  return JSON.parse(res) || null;
};
// 删除指定缓存
export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
// 清空缓存
export const clearStorage = () => {
  window.localStorage.clear();
};
