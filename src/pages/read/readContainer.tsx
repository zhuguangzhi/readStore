import React, { useEffect, useRef } from 'react';
import { rankBook, readBookInfoProps } from '@/type/book';
import { useSaveReadHistory } from '@/utils/read';
import { getToken, useAuth } from '@/hook/useAuth';
import { targetColumnArray } from '@/common/publicFn';
import { useQueryClient } from 'react-query';
import './index.less';
import { IconFont } from '@/components/IconFont';
import { UseNode } from '@/components/UseNode';
import { useDispatch } from '@@/exports';

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
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  // 保存阅读记录
  const { mutate: saveHistory } = useSaveReadHistory();
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const readBox = useRef<HTMLDivElement>(null);
  const token = getToken();
  const { userInfo } = useAuth();
  //滚动到记录的行数
  const toScroll = () => {
    const y =
      readBox.current?.children[
        (bookInfo?.read_line || 1) - 1
      ]?.getBoundingClientRect().top || 0;
    document.querySelector('.webContainer')?.scrollTo({
      top: y + scrollTop,
      behavior: 'smooth',
    });
  };

  //修改阅读行数缓存
  const setReadLineCache = (bookId: number, readLine: number) => {
    queryClient.setQueriesData(
      [`readBookInfo${bookId}`],
      (old?: readBookInfoProps) => {
        if (!old) return {} as readBookInfoProps;
        return {
          ...old,
          read_line: readLine,
        };
      },
    );
  };
  // 打开vip弹窗
  const openVipModel = () => {
    dispatch({
      type: 'global/setVipModel',
      payload: true,
    });
  };

  useEffect(() => {
    if (
      !container ||
      !bookInfo ||
      !readBox.current ||
      readBox.current.children.length !== 0
    )
      return;
    const regExp = /<p[^>]*[^>]*>(.*?)<\/p>/g;
    let arr: string[] = [];
    while (regExp.exec(container) !== null) {
      arr.push(RegExp.$1 + '\n');
    }
    // 每帧加载的标签数
    let once = 120;
    let bookData = targetColumnArray(arr, once);
    let countRender = 0;
    const render = () => {
      const fragment = document.createDocumentFragment();
      // 超过300会出现白屏
      bookData[countRender]?.forEach((data, index) => {
        const p = document.createElement('p');
        // if (content===undefined) return;
        p.id = (once * countRender + index + 1).toString();
        p.innerHTML = data;
        fragment.appendChild(p);
      });
      readBox.current?.appendChild(fragment);
      countRender++;
      if (countRender < bookData.length) {
        // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函    数更新动画。
        window.requestAnimationFrame(render);
      } else {
        // 执行完毕，跳转历史记录
        toScroll();
      }
    };
    render();
    // setBookData(arr);
  }, [container, bookInfo]);
  useEffect(() => {
    // 获取屏幕底部的元素
    const pEl = document.elementFromPoint(
      document.body.clientWidth / 2,
      document.body.clientHeight - 70,
    );

    if (!containerRef || !bookInfo || !pEl || !token) return;
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    let progress: number;
    let currentLine: number;
    // pEl不为p标签或者id不为数字，则说明已经看完了所有内容
    if (pEl.tagName !== 'P' || !Number(pEl.id)) {
      progress = 100;
      currentLine = readBox.current?.children.length || 0;
    } else {
      progress = Math.ceil((Number(pEl.id) / allCount) * 100);
      currentLine = Number(pEl.id);
    }
    timerRef.current = setTimeout(() => {
      saveHistory({
        book_id: bookInfo.id,
        chapter_id: bookInfo.chapter_id,
        read_progress: progress,
        read_line: currentLine,
      });
      setReadLineCache(bookInfo.id, currentLine);
    }, 2000);
  }, [scrollTop]);

  return (
    <>
      <div ref={readBox}>
        {/*{bookData.map((data, index) => {*/}
        {/*  return (*/}
        {/*    <p*/}
        {/*      key={index}*/}
        {/*      id={(index + 1).toString()}*/}
        {/*      dangerouslySetInnerHTML={{ __html: data }}*/}
        {/*    ></p>*/}
        {/*  );*/}
        {/*})}*/}
      </div>
      <UseNode
        rIf={(!userInfo || userInfo.is_vip === 2) && bookInfo?.is_vip === 1}
      >
        <div className={'readBook_vipTip'}>
          <IconFont width={'20px'} height={'20px'} icon={'password'} />
          <span className={'SYMedium'} onClick={openVipModel}>
            开通会员 即可畅游故事，点击开通会员
          </span>
        </div>
      </UseNode>
    </>
  );
};
