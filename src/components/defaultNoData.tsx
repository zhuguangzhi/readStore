import React from 'react';
import './style/defaultNoData.less';

type DefaultNoDataProps = {
  className?: string;
  style?: React.CSSProperties;
  type: 'noData' | 'authorNoData' | '404' | 'noNet' | 'check';
  text?: string;
};
export const DefaultNoData = ({
  type,
  text = '暂无数据',
  className,
  style,
}: DefaultNoDataProps) => {
  const imgList = {
    noData: require('../assets/image/noDtata.png'),
    '404': require('../assets/image/404.png'),
    noNet: require('../assets/image/noNet.png'),
    check: require('../assets/image/check.png'),
    authorNoData: require('../assets/image/authorNoData.png'),
  };
  return (
    <div className={'defaultData ' + className} style={style}>
      <img
        style={{ width: '100%', height: '100%' }}
        src={imgList[type]}
        alt=""
      />
      <p className={'text'} style={{ marginTop: '12px' }}>
        {text}
      </p>
    </div>
  );
};
