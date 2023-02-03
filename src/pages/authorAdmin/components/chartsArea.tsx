import { homeZoom } from '@/pages/authorAdmin';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { EChartsOption, EChartsType } from 'echarts';
import { useMounted } from '@/hook';

export interface areaProps extends EChartsOption {
  data: number[] | undefined;
}

export const ChartsArea = ({ data, ...props }: areaProps) => {
  const chartsRef = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (!data || !chartsRef.current) return;
    const colConfig: EChartsOption = Object.assign(
      {
        tooltip: {
          trigger: 'axis',
          valueFormatter: (value) => '收入 ' + value + ' 元',
        },
        grid: {
          left: '50',
          top: 20,
          bottom: 0,
          right: 20,
          containLabel: false,
        },
        height: '85%',
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
        },
        series: [
          {
            data: data,
            type: 'line',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#C6E3FF',
                },
                {
                  offset: 0.6,
                  color: '#E2F1FC',
                },
                {
                  offset: 1,
                  color: '#ffffff',
                },
              ]),
            },
            smooth: 0.4,
            symbol: 'none',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#EF8AA8', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#5F7FE0', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      } as EChartsOption,
      props,
    );
    chartsRef.current.setOption(colConfig);
  }, [data, chartsRef.current]);
  useMounted(() => {
    chartsRef.current = echarts.init(
      document.getElementById('echartsArea') as HTMLElement,
    );
  });
  return (
    <div
      style={{ zoom: 1 / homeZoom, width: '100%', height: '100%' }}
      id={'echartsArea'}
    ></div>
  );
};
