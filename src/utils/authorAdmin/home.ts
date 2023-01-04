import { useQuery } from 'react-query';
import { AuthorHome, ErrorCheck } from '@/common/api';
import {
  codewordCalendarProps,
  dataStatisticsProps,
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
