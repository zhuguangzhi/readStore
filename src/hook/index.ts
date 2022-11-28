// 修改state
import { useEffect, useState } from 'react';

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
//节流
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
