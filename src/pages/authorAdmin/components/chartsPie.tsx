// 该组件使用的是echart组件库
import * as echarts from 'echarts';
import { homeZoom } from '@/pages/authorAdmin';
import React, { useRef } from 'react';
import { useMounted } from '@/hook';
import { EChartsOption, EChartsType } from 'echarts';
export const ChartsPie = () => {
  const chartsRef = useRef<EChartsType | null>(null);
  const data = [
    {
      name: '渠道收益',
      value: 23,
    },
    {
      name: 'VIP分成',
      value: 37,
    },
    {
      name: '其他收益',
      value: 40,
    },
  ];
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value) => value + '%',
    },
    color: ['#00B3F9', '#CE95F1', '#E0E0EC'],
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          formatter: ['{d}%', '{b}'].join('\n'),
          rich: {
            d: {
              align: 'left',
            },
          },
          fontSize: 14 * homeZoom,
        },
        labelLine: {
          length: 12 * homeZoom,
          length2: 12 * homeZoom,
        },
      },
    ],
    title: {
      text: '2000篇',
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 20 * homeZoom,
      },
    },
  };

  useMounted(() => {
    chartsRef.current = echarts.init(
      document.getElementById('echartsPie') as HTMLElement,
    );
    chartsRef.current.setOption(option);
  });
  return (
    <div
      style={{ zoom: 1 / homeZoom, width: '100%', height: '100%' }}
      id={'echartsPie'}
    ></div>
  );
};
