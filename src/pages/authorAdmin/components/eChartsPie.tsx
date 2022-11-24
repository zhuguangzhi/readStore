// 该组件使用的是echart组件库
import * as echarts from 'echarts';
import { homeZoom } from '@/pages/authorAdmin';
import React, { useRef } from 'react';
import { useMounted } from '@/hook';
import { EChartsOption, EChartsType } from 'echarts';
export const EChartsPie = () => {
  const chartsRef = useRef<EChartsType | null>(null);
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      textStyle: {
        fontSize: 14 * homeZoom,
      },
    },
    legend: {
      bottom: '0',
      width: 440 * homeZoom,
      left: 'center',
      itemWidth: 25 * homeZoom,
      itemHeight: 14 * homeZoom,
      textStyle: {
        fontSize: 14 * homeZoom,
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        top: -60 * homeZoom,
        left: 'center',
        width: 380 * homeZoom,
        itemStyle: {
          borderRadius: 10 * homeZoom,
          borderColor: '#fff',
          borderWidth: 2 * homeZoom,
        },
        label: {
          show: true,
          position: 'center',
          formatter: ['{a|总收入}', '{b|4000}{x|税前}'].join('\n'),
          rich: {
            a: {
              color: '#383874',
              fontSize: 20 * homeZoom,
              padding: [0, 0, 16 * homeZoom, 0],
            },
            b: {
              color: '#383874',
              fontSize: 26 * homeZoom,
              fontWeight: 'bold',
            },
            x: {
              fontSize: 14 * homeZoom,
              color: '#6BFFF6',
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '基础稿费' },
          { value: 735, name: 'VIP分成' },
          { value: 580, name: '渠道分成' },
          { value: 484, name: '网站福利' },
          { value: 300, name: '礼物收益' },
        ],
      },
    ],
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
