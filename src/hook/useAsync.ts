import { useCallback, useReducer, useState } from 'react';

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle',
};
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  return useCallback((...args: T[]) => dispatch(...args), [dispatch]);
};
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initialState,
    },
  );
  const safeDispatch = useSafeDispatch(dispatch);
  // const [state, setState] = useState<State<D>>({
  //     ...defaultInitialState,
  //     ...initialState
  // })
  const [reTry, setReTry] = useState<() => () => void>();
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      }),
    [safeDispatch],
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null,
      }),
    [],
  );
  //出发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: () => Promise<D>) => {
      if (!promise) throw new Error('请传入异步回调');
      setReTry(() => () => {
        if (runConfig) run(runConfig(), runConfig);
      });
      safeDispatch({
        ...state,
        stat: 'loading',
      });
      return promise
        .then((response) => {
          setData(response);
          return response;
        })
        .catch((error) => {
          setError(error);
          return null;
        });
    },
    [],
  );
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    responseData: state.data,
    run,
    reTry,
    safeDispatch,
    setError,
    setData,
    ...state,
  };
};
