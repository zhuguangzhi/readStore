import React from 'react';
import { RcFile } from 'antd/es/upload';
import { message } from 'antd';
import router from '@/hook/url';
import { BookId } from '@/constants/url';

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
  return res ? JSON.parse(res) : null;
};
// 删除指定缓存
export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
// 清空缓存
export const clearStorage = () => {
  window.localStorage.clear();
};
// 转为指定列数的数组
export const targetColumnArray = <T>(value: T[], columnNum: number) => {
  const arr = [...value];
  let columnArray: T[][] = Array.from({
    length: Math.ceil(arr.length / columnNum),
  }).map(() => []);
  arr.forEach((book, index) => {
    //通过向下取整方式获取当前列索引
    let currentColumnIndex = Math.floor(index / columnNum);
    columnArray[currentColumnIndex].push(book);
  });
  return columnArray;
};
// 滚动到底部
export const scrollToBottom = (distance: number = 0, call?: Function) => {
  const webContainerRef = document.querySelector(
    '.webContainer',
  ) as HTMLElement;
  const bodyHeight = webContainerRef.clientHeight;
  const scrollTop = webContainerRef.scrollTop;
  const scrollHeight = webContainerRef.scrollHeight;
  if (scrollHeight - (bodyHeight + scrollTop) <= distance) {
    call?.();
  }
};
// 根据id去重
export const setArrayForId = (arr: { id: number }[]) => {
  let map = new Map();
  for (let item of arr) {
    // if (map.has(item.id)) {
    //   //  数组中存在 覆盖原有内容
    //   map.delete(item.id)
    // }
    map.set(item.id, item);
  }
  return [...map.values()];
};
/**
 * 用word方式计算正文字数
 */
export const fnGetCpmisWords = (str: string) => {
  let sLen = 0;
  try {
    // 先将回车换行符做特殊处理
    str = str.replace(/(\r\n+|\s+| +)/g, '龘');
    // 处理英文字符数字，连续字母、数字、英文符号视为一个单词
    str = str.replace(/[\x00-\xff]/g, 'm');
    // 合并字符m，连续字母、数字、英文符号视为一个单词
    str = str.replace(/m+/g, '*');
    // 去掉回车换行符
    str = str.replace(/龘+/g, '');
    // 返回字数
    sLen = str.length;
  } catch (e) {}
  return sLen;
};
// 图片转Base64
export const imgToBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
//复制文字
export const copy = (context: string) => {
  // 创建一个文本输入框元素
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = context;

  // 将文本输入框元素添加到文档中
  document.body.appendChild(inputElement);

  // 选中文本输入框中的文本
  inputElement.select();

  // 复制选中的文本
  document.execCommand('copy');

  // 从文档中移除文本输入框元素
  document.body.removeChild(inputElement);
  message.success('复制成功');
  // navigator.clipboard.writeText(context).then(() => {
  //   message.success('复制成功');
  // });
};
// 阅读
export const toRead = (
  chapterId: number,
  bookId: number,
  p?: { [key: string]: unknown },
) => {
  if (chapterId === 0) {
    message.error('该书正在努力上传中~');
    return;
  }
  router.push('/read', { [BookId]: bookId, ...p }, true);
};
