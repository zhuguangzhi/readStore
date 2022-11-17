import React from 'react';
import { G2, Pie, PieConfig } from '@ant-design/plots';
import { homeZoom } from '@/pages/authorAdmin';

export interface chartsPie extends PieConfig {
  data: { type: string; value: unknown }[];
}
export const ChartsPie = () => {
  const G = G2.getEngine('canvas');
  const data = [
    {
      type: '渠道收益',
      value: 23,
    },
    {
      type: 'VIP分成',
      value: 37,
    },
    {
      type: '其他收益',
      value: 40,
    },
  ];
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['#00B3F9', '#CE95F1', '#E0E0EC'],
    radius: 1,
    innerRadius: 0.6,
    height: 238 * homeZoom,
    legend: false,
    padding: 'auto',
    meta: {
      value: {
        formatter: (value) => value + '%',
      },
    },
    pieStyle: {
      shadowColor: '#daf1fa',
      shadowBlur: 8,
    },
    label: {
      type: 'spider',
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 15,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 0,
            text: `${data.percent * 100}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
          },
        });
        return group;
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          fontSize: '18px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '2000篇',
      },
    },

    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie style={{ zoom: 1 / homeZoom }} {...config} />;
};
