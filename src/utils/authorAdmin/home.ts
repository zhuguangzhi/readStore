import { useQuery } from 'react-query';
import { AuthorHome, ErrorCheck } from '@/common/api';
import {
  codewordCalendarProps,
  dataStatisticsProps,
  incomeTotalProps,
  writeClassProps,
} from '@/type/authorAdmin/home';

// 获取码字日历
export const useGetCodeCalendar = (p: { date: string }) => {
  return useQuery<codewordCalendarProps, Error>(['getCodeCalendar'], () =>
    AuthorHome.codewordCalendar(p).then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 获取数据统计
export const useGetDataStatistics = () => {
  return useQuery<dataStatisticsProps, Error>(['getDataStatistics'], () =>
    AuthorHome.dataStatistics().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 写作课堂
export const useGetWorksClass = () => {
  return useQuery<writeClassProps[], Error>(['writeClass'], () =>
    AuthorHome.writeClass().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
// 全部稿费
export const useGetAllFee = () => {
  return useQuery<incomeTotalProps, Error>(['gelAllFee'], () =>
    AuthorHome.getAllFee().then((value) => {
      ErrorCheck(value);
      return value.data;
    }),
  );
};
