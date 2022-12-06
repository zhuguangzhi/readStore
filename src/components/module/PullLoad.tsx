// 上拉加载

import React, { useRef } from 'react';
import './style/PullLoad.less';

type PullLoadProps = {
  width?: string; //宽度
  height?: string; //高度
  page: number; //页数
  total: number; //总数
  pageSize: number; //页数
  bottomHeight: number; //距离底部还剩多少高度时触发触底事件
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void; //滚动中
  onBottom?: Function; //触底
  children: React.ReactElement;
};
export const PullLoad = ({
  width = '100%',
  height = '100%',
  children,
  ...props
}: PullLoadProps) => {
  const pullRef = useRef<HTMLDivElement | null>(null);
  const pullScroll = (event: React.UIEvent<HTMLDivElement>) => {
    props.onScroll?.(event);
    const pullHeight = pullRef.current?.clientHeight as number;
    const scrollTop = pullRef.current?.scrollTop as number;
    const scrollHeight = pullRef.current?.scrollHeight as number;
    if (pullHeight + scrollTop + props.bottomHeight >= scrollHeight) {
      props.onBottom?.();
    }
  };

  return (
    <div
      ref={pullRef}
      onScroll={pullScroll}
      style={{ width, height }}
      className={'pullLoad'}
    >
      <div className={'pullLoad_child'}>{children}</div>
      <span className={'pullLoad_msgTip'}>
        {props.page * props.pageSize >= props.total
          ? '没有更多啦~'
          : '数据加载中...'}
      </span>
    </div>
  );
};
