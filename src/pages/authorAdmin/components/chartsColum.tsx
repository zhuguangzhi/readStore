import { homeZoom } from '@/pages/authorAdmin';
import React, { useRef } from 'react';
import * as echarts from 'echarts';
import { EChartsOption, EChartsType } from 'echarts';
import { useMounted } from '@/hook';

export interface columProps extends EChartsOption {
  data: number[];
}

export const ChartsColum = ({ data, ...props }: columProps) => {
  const chartsRef = useRef<EChartsType | null>(null);
  const colConfig: EChartsOption = Object.assign(
    {
      color: '#00B3F9',
      height: 260 * homeZoom,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        valueFormatter: (value) => '稿费 ' + value + ' 元',
      },
      grid: {
        left: '0',
        top: 0,
        right: '0',
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          data,
          type: 'bar',
        },
      ],
    } as EChartsOption,
    props,
  );
  useMounted(() => {
    chartsRef.current = echarts.init(
      document.getElementById('echartsColumn') as HTMLElement,
    );
    chartsRef.current.setOption(colConfig);
  });
  return (
    <div
      style={{ zoom: 1 / homeZoom, width: '100%', height: '100%' }}
      id={'echartsColumn'}
    ></div>
  );
};
