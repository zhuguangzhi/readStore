// 该组件使用的是echart组件库
import * as echarts from 'echarts';
import { homeZoom } from '@/pages/authorAdmin';
import React, { useEffect, useRef } from 'react';
import { useMounted } from '@/hook';
import { EChartsOption, EChartsType } from 'echarts';
export const EChartsRadiusPie = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  const chartsRef = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (!chartsRef.current || data.length === 0) return;
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontSize: 14 * homeZoom,
        },
      },
      legend: {
        bottom: '0',
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
          radius: ['45%', '75%'],
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
            formatter: [
              '{a|总收入}',
              `{b|${data.reduce((pre, value) => {
                return (pre += value.value);
              }, 0)}}{x|税前}`,
            ].join('\n'),
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
          data: data,
        },
      ],
    };
    chartsRef.current.setOption(option);
  }, [data, chartsRef.current]);
  useMounted(() => {
    chartsRef.current = echarts.init(
      document.getElementById('echartsPie') as HTMLElement,
    );
  });
  return (
    <div
      style={{ zoom: 1 / homeZoom, width: '100%', height: '100%' }}
      id={'echartsPie'}
    ></div>
  );
};
