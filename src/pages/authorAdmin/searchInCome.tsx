import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Select } from 'antd';
import './style/searchInCome.less';
import { ChartsArea } from '@/pages/authorAdmin/components/chartsArea';
import { EChartsRadiusPie } from '@/pages/authorAdmin/components/eChartsRaduisPie';
import { TableData } from '@/pages/authorAdmin/components/tableData';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { IconFont } from '@/components/IconFont';
import { ReadPagination } from '@/components/module/ReadPagination';
import {
  useGetIncomeDistribute,
  useGetInComeList,
  useGetInComeTrend,
} from '@/utils/authorAdmin/income';
import { useAuth } from '@/hook/useAuth';
import { DefaultNoData } from '@/components/defaultNoData';
import { useGetWorks } from '@/utils/authorAdmin/worksManager';
import { incomeListRequestProps } from '@/type/authorAdmin/income';
import { Values } from 'async-validator';
import moment, { Moment } from 'moment';
import { pieDataTranslate } from '@/utils/format';

const SearchIcon = () => <IconFont className={'inCome_icon'} icon={'search'} />;
const DeleteIcon = () => <IconFont className={'inCome_icon'} icon={'delete'} />;

export default () => {
  //面积图 --- 当前年份
  const [currentYear, setCurrentYear] = useState(moment());
  //面积图数据
  const { data: areaData, isLoading: areaLoading } = useGetInComeTrend({
    year: moment(currentYear).format('YYYY'),
  });
  // 饼图 --- 当前月
  const [pieCurrentMonth, setPieMonth] = useState<Moment | undefined>(
    undefined,
  );
  // 饼图数据
  const { data: pieData, isLoading: pieLoading } = useGetIncomeDistribute({
    month: pieCurrentMonth
      ? moment(pieCurrentMonth).format('YYYY-MM')
      : undefined,
  });
  // 表格数据 ---------------start--------------------------------------------------------------------
  // 作者书籍列表
  const [worksList, setWorkList] = useState<
    { key: string | number; label: string }[]
  >([{ key: 0, label: '所有作品' }]);
  //选中的书籍key
  const [selectBookId, setBookId] = useState(0);
  // 是否完结
  const [bookIsFinish, setIsFinish] = useState<
    incomeListRequestProps['is_finish'] | null
  >(null);
  // 日期
  const [date, setDate] = useState<string>(moment().format('YYYY-MM'));
  // 签约方式
  const [signType, setSignType] = useState<
    incomeListRequestProps['signing_type'] | null
  >(null);
  // 加载数量
  const tablePageSize = 10;
  const [tablePage, setTablePage] = useState(1);
  //表格数据 收入明细
  const { data: tableData, isLoading: tableLoading } = useGetInComeList({
    page: tablePage,
    page_size: tablePageSize,
    [selectBookId === 0 ? '' : 'book_id']: selectBookId,
    [bookIsFinish ? 'is_finish' : '']: bookIsFinish,
    [date ? 'date' : '']: date,
    [signType ? 'signing_type' : '']: signType,
  });
  // 表格数据 -------------- end-----------------------------------------------------------------------------
  // 获取作者书籍列表
  const { data: worksDataList, isLoading: worksLoading } = useGetWorks({
    page: 1,
    page_size: 9999,
  });
  const { setLoadingModel } = useAuth();

  // 按条件搜索
  const onSearch = (value: Values) => {
    setDate(moment(value.date).format('YYYY-MM'));
    setBookId(value.book_id);
    setIsFinish(value.isFinish);
    setSignType(value.contractType);
  };

  //设置有数据的饼图月份
  useEffect(() => {
    if (!pieData) return;
    console.log('pieData', pieData);
    setPieMonth(moment(pieData.month));
  }, [pieData]);
  useEffect(() => {
    setLoadingModel(areaLoading || tableLoading || worksLoading || pieLoading);
  }, [areaLoading, tableLoading, worksLoading, pieLoading]);
  useEffect(() => {
    if (!worksDataList) return;
    let arr = [{ key: 0, label: '所有作品' }];
    worksDataList.data.forEach((works) => {
      arr.push({
        key: works.id,
        label: works.name,
      });
    });
    setWorkList(arr);
  }, [worksDataList]);
  return (
    <div className={'inCome flex flex_column'}>
      {/*折线图、饼图*/}
      <div className={'inCome_charts'}>
        {/*    折线图*/}
        <div className={'inCome_charts_line'}>
          {/*    头*/}
          <div id={'charts_line'} className={'inCome_charts_header'}>
            <span>总收入趋势图</span>
            <DatePicker
              defaultValue={currentYear}
              locale={locale}
              picker="year"
              getPopupContainer={() =>
                document.getElementById('charts_line') as HTMLElement
              }
              placement={'bottomRight'}
              style={{ width: 138 }}
              disabledDate={(currentDate) => moment(currentDate) > moment()}
              onChange={(year) => setCurrentYear(moment(year))}
            />
            {/*<Select*/}
            {/*  defaultValue="2022"*/}
            {/*  style={{ width: 138 }}*/}
            {/*  getPopupContainer={() =>*/}
            {/*    document.getElementById('charts_line') as HTMLElement*/}
            {/*  }*/}
            {/*  options={[*/}
            {/*    {*/}
            {/*      value: '2022',*/}
            {/*      label: '本年',*/}
            {/*    },*/}
            {/*    {*/}
            {/*      value: '2021',*/}
            {/*      label: '2021',*/}
            {/*    },*/}
            {/*    {*/}
            {/*      value: '2020',*/}
            {/*      label: '2020',*/}
            {/*    },*/}
            {/*    {*/}
            {/*      value: '2019',*/}
            {/*      label: '2019',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*/>*/}
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
            <DatePicker
              value={pieCurrentMonth}
              locale={locale}
              picker="month"
              getPopupContainer={() =>
                document.getElementById('charts_pie') as HTMLElement
              }
              placement={'bottomRight'}
              style={{ width: 138 }}
              disabledDate={(currentDate) => moment(currentDate) > moment()}
              onChange={(month) => setPieMonth(moment(month))}
            />
          </div>
          {/*    内容*/}
          <div className={'inCome_charts_container'}>
            <EChartsRadiusPie data={pieDataTranslate(pieData)} />
          </div>
        </div>
      </div>
      {/*    数据报表*/}
      <div className={'inCome_data'} style={{ flex: 1 }}>
        <p className={'inCome_charts_header'}>收入明细</p>
        <div id={'inCome_data_box'}>
          <Form
            layout={'inline'}
            className={'inCome_data_form'}
            initialValues={{ book_id: 0 }}
            onFinish={onSearch}
          >
            <Form.Item name="book_id" label="作品名">
              <Select
                getPopupContainer={() =>
                  document.getElementById('inCome_data_box') as HTMLDivElement
                }
                style={{ width: 180 }}
              >
                {worksList?.map((item) => {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="contractType" label="签约方式">
              <Select
                placeholder={'请输入'}
                getPopupContainer={() =>
                  document.getElementById('inCome_data_box') as HTMLElement
                }
                className={'inCome_data_formItem'}
              >
                <Select.Option value={3}>保底签约</Select.Option>
                <Select.Option value={1}>买断签约</Select.Option>
                <Select.Option value={2}>分成签约</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="isFinish" label="状态">
              <Select
                placeholder={'请输入'}
                getPopupContainer={() =>
                  document.getElementById('inCome_data_box') as HTMLElement
                }
                className={'inCome_data_formItem'}
              >
                <Select.Option value={2}>连载中</Select.Option>
                <Select.Option value={1}>已完结</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={'日期'} name={'date'}>
              <DatePicker
                locale={locale}
                picker="month"
                getPopupContainer={() =>
                  document.getElementById('inCome_data_box') as HTMLElement
                }
                disabledDate={(currentDate) => moment(currentDate) > moment()}
                className={'inCome_data_formItem'}
              />
            </Form.Item>
            <div className={'inCome_data_box_btn'}>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SearchIcon />}>
                  搜索
                </Button>
                <Button htmlType="reset" icon={<DeleteIcon />}>
                  清空
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div>
          {tableData && tableData.data.length === 0 ? (
            <DefaultNoData
              className={'inCome_data_noData'}
              type={'authorNoData'}
              text={'暂无收入明细'}
            />
          ) : (
            tableData?.data.map((data) => {
              return <TableData key={data.id} {...data} searchDate={date} />;
            })
          )}
        </div>
        {/*style={{display:"flex",justifyContent:"flex-end"}}*/}
        <ReadPagination
          hideOnSinglePage={true}
          current={tablePage}
          total={tableData?.page_info.total || 0}
          pageSize={tablePageSize}
          onChange={(page) => setTablePage(page)}
        />
      </div>
    </div>
  );
};
