import React, { ReactNode } from 'react';

export class ErrorBoundaries extends React.Component<{ children: ReactNode }> {
  //    当组件抛出异常时强制刷新浏览器
  static componentDidCatch(error: Error) {
    if (String(error).includes('Loading chunk')) {
      // console.log('error',error)
      window.location.reload();
    }
  }
  render() {
    const { children } = this.props;
    return children;
  }
}
