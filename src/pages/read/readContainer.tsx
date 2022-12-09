import React, { useCallback, useEffect } from 'react';

type ReadContainerProps = {
  container: string;
  containerRef: HTMLDivElement | null;
};
export const ReadContainer = ({
  container,
  containerRef,
}: ReadContainerProps) => {
  const saveReadProgress = useCallback(() => {
    //    内容实际滚动距离
    const realScroll =
      document.documentElement.scrollTop + document.body.clientHeight - 390;
    if (!containerRef) return;
    const progress = Math.ceil((realScroll / containerRef?.clientHeight) * 100);
    console.log('progress', progress);
  }, [containerRef?.clientHeight]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveReadProgress);
    return () => {
      saveReadProgress();
      window.removeEventListener('beforeunload', () => {});
    };
  }, [containerRef?.clientHeight]);
  return <p dangerouslySetInnerHTML={{ __html: container }}></p>;
};
