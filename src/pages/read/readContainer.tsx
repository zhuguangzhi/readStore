import React, { useEffect, useRef, useState } from 'react';
import { rankBook } from '@/type/book';
import { useSaveReadHistory } from '@/utils/read';

type ReadContainerProps = {
  container: string;
  bookInfo: rankBook | undefined;
  containerRef: HTMLDivElement | null;
  scrollTop: number;
  allCount: number; //总行数
};
export const ReadContainer = ({
  container,
  bookInfo,
  containerRef,
  scrollTop,
  allCount,
}: ReadContainerProps) => {
  // 保存阅读记录
  const { mutate: saveHistory } = useSaveReadHistory();
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const readBox = useRef<HTMLDivElement>(null);
  // 展示列表数据 默认只显示showDataNum行
  const [bookData, setBookData] = useState<string[]>([]);
  useEffect(() => {
    if (!container || !bookInfo) return;
    const regExp = /<p[^>]*[^>]*>(.*?)<\/p>/g;
    let arr = [];
    while (regExp.exec(container) !== null) {
      arr.push(RegExp.$1 + '\n'); //如果是RegExp.$1那么匹配的就是href里的属性了!
    }
    setBookData(arr);
  }, [container, bookInfo]);
  useEffect(() => {
    // 获取屏幕底部的元素
    const pEl = document.elementFromPoint(
      document.body.clientWidth / 2,
      document.body.clientHeight - 70,
    );
    if (!containerRef || !bookInfo || !pEl) return;
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    let progress: number;
    let currentLine: number;
    // pEl不为p标签或者id不为数字，则说明已经看完了所有内容
    if (pEl.tagName !== 'P' || !Number(pEl.id)) {
      progress = 100;
      currentLine = bookData.length;
    } else {
      progress = Math.ceil((Number(pEl.id) / allCount) * 100);
      currentLine = Number(pEl.id);
    }
    timerRef.current = setTimeout(() => {
      saveHistory({
        book_id: Number(bookInfo.id),
        chapter_id: bookInfo.chapter_id,
        read_progress: progress,
        read_line: currentLine,
      });
    }, 2000);
  }, [scrollTop]);

  return (
    <div ref={readBox}>
      {bookData.map((data, index) => {
        return (
          <p
            key={index}
            id={(index + 1).toString()}
            dangerouslySetInnerHTML={{ __html: data }}
          ></p>
        );
      })}
    </div>
  );
};
