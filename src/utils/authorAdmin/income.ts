import { useQuery } from 'react-query';
import { AuthorInCome, ErrorCheck } from '@/common/api';
import {
  incomeListProps,
  incomeListRequestProps,
} from '@/type/authorAdmin/income';

// 获取总收入图
export const useGetInComeTrend = (p: { year: string }) => {
  return useQuery<number[], Error>(['getInCome', p], () =>
    AuthorInCome.incomeTrend(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取收入明细
export const useGetInComeList = (p: incomeListRequestProps) => {
  return useQuery<incomeListProps, Error>(['getInComeList', p], () =>
    AuthorInCome.incomeList(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取收入分布图
export const useGetIncomeDistribute = (p: { month: string | undefined }) => {
  return useQuery(['getIncomeDistribute', p], () =>
    AuthorInCome.incomeDistribute(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
