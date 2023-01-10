import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import './style/searchInCome.less';
import { ChartsArea } from '@/pages/authorAdmin/components/chartsArea';
import { EChartsRadiusPie } from '@/pages/authorAdmin/components/eChartsRaduisPie';
import {
  TableData,
  TableDataType,
} from '@/pages/authorAdmin/components/tableData';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { IconFont } from '@/components/IconFont';
import { ReadPagination } from '@/components/module/ReadPagination';

const SearchIcon = () => <IconFont className={'inCome_icon'} icon={'search'} />;
const DeleteIcon = () => <IconFont className={'inCome_icon'} icon={'delete'} />;

export default () => {
  //面积图数据
  const [areaData] = useState<number[]>([
    7654, 5982, 8979, 12213, 7950, 9740, 8950, 11209, 15980, 6870, 12745, 7543,
  ]);
  //表格数据
  const [tableData] = useState<TableDataType[]>([
    {
      id: 1,
      type: 'minimum',
      bookName: '傅少的小算盘',
      income: {
        base: '3000',
        vip: '3000',
        channel: '3000',
        gift: '2000',
        welfare: '2000',
        advertising: '2000',
        count: '12000',
        time: '2022年11月',
        actualAmount: '10219',
      },
    },
    {
      id: 2,
      type: 'buyout',
      bookName: '傅少的小算盘',
      income: {
        base: '3000',
        channel: '————',
        gift: '————',
        welfare: '2000',
        advertising: '2000',
        count: '12000',
        time: '2022年11月',
        actualAmount: '10219',
      },
    },
    {
      id: 3,
      type: 'hierarchy',
      bookName: '傅少的小算盘',
      income: {
        vip: '3000',
        channel: '3000',
        gift: '2000',
        welfare: '2000',
        advertising: '2000',
        count: '12000',
        time: '2022年11月',
        actualAmount: '10219',
      },
    },
    {
      id: 4,
      type: 'minimum',
      bookName: '傅少的小算盘',
      income: {
        base: '3000',
        vip: '3000',
        channel: '3000',
        gift: '2000',
        welfare: '2000',
        advertising: '2000',
        count: '12000',
        time: '2022年11月',
        actualAmount: '10219',
      },
    },
    {
      id: 5,
      type: 'minimum',
      bookName: '傅少的小算盘',
      income: {
        base: '3000',
        vip: '3000',
        channel: '3000',
        gift: '2000',
        welfare: '2000',
        advertising: '2000',
        count: '12000',
        time: '2022年11月',
        actualAmount: '10219',
      },
    },
    {
      id: 6,
      type: 'minimum',
      bookName: '傅少的小算盘',
      income: {
        base: '3000',
        vip: '3000',
        channel: '3000',
        gift: '2000',
        welfare: '2000',
        advertising: '2000',
        count: '12000',
        time: '2022年11月',
        actualAmount: '10219',
      },
    },
  ]);

  return (
    <div className={'inCome'}>
      {/*折线图、饼图*/}
      <div className={'inCome_charts'}>
        {/*    折线图*/}
        <div className={'inCome_charts_line'}>
          {/*    头*/}
          <div id={'charts_line'} className={'inCome_charts_header'}>
            <span>总收入趋势图</span>
            <Select
              defaultValue="2022"
              style={{ width: 138 }}
              getPopupContainer={() =>
                document.getElementById('charts_line') as HTMLElement
              }
              options={[
                {
                  value: '2022',
                  label: '本年',
                },
                {
                  value: '2021',
                  label: '2021',
                },
                {
                  value: '2020',
                  label: '2020',
                },
                {
                  value: '2019',
                  label: '2019',
                },
              ]}
            />
          </div>
          {/*    内容*/}
          <div className={'inCome_charts_container'}>
            <ChartsArea data={areaData} />
          </div>
        </div>
        {/*    饼图*/}
        <div className={'inCome_charts_pie'}>
          {/*    头*/}
          <div id={'charts_pie'} className={'inCome_charts_header'}>
            <span>收入分布图</span>
            <Select
              defaultValue="day"
              style={{ width: 138 }}
              getPopupContainer={() =>
                document.getElementById('charts_pie') as HTMLElement
              }
              options={[
                {
                  value: 'day',
                  label: '今日',
                },
                {
                  value: 'week',
                  label: '本周',
                },
                {
                  value: 'month',
                  label: '本月',
                },
                {
                  value: 'year',
                  label: '本年',
                },
              ]}
            />
          </div>
          {/*    内容*/}
          <div className={'inCome_charts_container'}>
            <EChartsRadiusPie />
          </div>
        </div>
      </div>
      {/*    数据报表*/}
      <div className={'inCome_data'}>
        <p className={'inCome_charts_header'}>收入明细</p>
        <div id={'inCome_data_box'}>
          <Form layout={'inline'} className={'inCome_data_form'}>
            <Form.Item name="book_name" label="书籍标题">
              <Input
                placeholder={'请输入书名'}
                className={'inCome_data_formItem'}
              />
            </Form.Item>
            <Form.Item name="contractType" label="签约方式">
              <Select
                placeholder={'请输入'}
                getPopupContainer={() =>
                  document.getElementById('inCome_data_box') as HTMLElement
                }
                className={'inCome_data_formItem'}
              >
                <Select.Option value="minimum">保底签约</Select.Option>
                <Select.Option value="buyout">买断签约</Select.Option>
                <Select.Option value="hierarchy">分成签约</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="状态">
              <Select
                placeholder={'请输入'}
                getPopupContainer={() =>
                  document.getElementById('inCome_data_box') as HTMLElement
                }
                className={'inCome_data_formItem'}
              >
                <Select.Option value="N">连载中</Select.Option>
                <Select.Option value="Y">已完结</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={'日期'} name={'time'}>
              <DatePicker
                locale={locale}
                getPopupContainer={() =>
                  document.getElementById('inCome_data_box') as HTMLElement
                }
                className={'inCome_data_formItem'}
              />
            </Form.Item>
            <div className={'inCome_data_box_btn'}>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SearchIcon />}>
                  搜索
                </Button>
                <Button htmlType="button" icon={<DeleteIcon />}>
                  清空
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div>
          {tableData.map((data) => {
            return <TableData key={data.id} {...data} />;
          })}
        </div>
        {/*style={{display:"flex",justifyContent:"flex-end"}}*/}
        <ReadPagination
          hideOnSinglePage={true}
          current={1}
          total={500}
          pageSize={10}
        />
      </div>
    </div>
  );
};
