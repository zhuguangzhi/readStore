// 修改state
import { useEffect } from 'react';

// 改变state
export const useSetState = <T>(state: T, setState: (arg: T) => void) => {
  return (value: Partial<T>) => {
    setState({
      ...state,
      ...value,
    });
  };
};
export const useMounted = (call: () => void) => {
  useEffect(call, []);
};
