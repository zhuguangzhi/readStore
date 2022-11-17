import { ColumnConfig } from '@ant-design/plots/es/components/column';
import { homeZoom } from '@/pages/authorAdmin';
import { Column } from '@ant-design/charts';
import React from 'react';

export interface columProps extends ColumnConfig {
  data: { type: string; value: unknown }[];
}

export const ChartsColum = ({
  data,
  ...props
}: Omit<columProps, 'xField' | 'yField'>) => {
  const colConfig: ColumnConfig = Object.assign(
    {
      data: data,
      xField: 'type',
      yField: 'value',
      seriesField: '',
      legend: false,
      color: '#00B3F9',
      height: 280 * homeZoom,
      pixelRatio: 2,
      autoFit: false,
      yAxis: {
        grid: null,
        title: null,
        label: null,
      },
      xAxis: {
        grid: null,
        line: {
          style: {
            stroke: '#3464E0',
            lineWidth: 2,
          },
        },
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        value: {
          alias: '稿费',
        },
      },
    },
    props,
  );
  return <Column style={{ zoom: 1 / homeZoom }} {...colConfig} />;
};
