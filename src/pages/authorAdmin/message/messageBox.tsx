import React from 'react';

const MessageBoxStyle: React.CSSProperties = {
  width: '100%',
  height: '112px',
  background: '#FFFFFF',
  boxShadow: '0px 2px 32px 0px rgba(4,0,0,0.1)',
  borderRadius: '20px',
  marginTop: '18px',
  padding: '27px 40px',
  boxSizing: 'border-box',
};
export const MessageBox = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => {
        return (
          <div
            key={item}
            className={'justify_between flex_column'}
            style={MessageBoxStyle}
          >
            <p className={'font_20 font_bold'}>审核通知：</p>
            <div className={'font_18 justify_between'}>
              <span>你提交的作者信息审核已通过。</span>
              <span>2022-10-20 13:55:36</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
