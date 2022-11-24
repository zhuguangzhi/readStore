import { homeZoom } from '@/pages/authorAdmin';
import { Area, AreaConfig, Datum } from '@ant-design/charts';
import React from 'react';

export interface areaProps extends AreaConfig {
  data: { type: string; value: unknown }[];
}

export const ChartsArea = ({
  data,
  ...props
}: Omit<areaProps, 'xField' | 'yField'>) => {
  const areaConfig: AreaConfig = Object.assign(
    {
      data: data,
      xField: 'type',
      yField: 'value',
      height: 360 * homeZoom,
      smooth: true,
      xAxis: {
        range: [0, 1],
      },
      areaStyle: () => {
        return {
          fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        };
      },
      line: {
        color: 'l(0) 0:#EF8AA8 1:#5F7FE0',
      },
      tooltip: {
        formatter: (datum: Datum) => {
          return { name: '收入', value: datum.value + '元' };
        },
      },
    },
    props,
  );
  return <Area style={{ zoom: 1 / homeZoom }} {...areaConfig} />;
};
