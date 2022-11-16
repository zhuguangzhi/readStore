import React, { useState } from 'react';
import 'moment/locale/zh-cn';
import { Calendar, Popover } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { AdminHeader } from '@/pages/authorAdmin/coomponents/adminHeader';
import './style/home.less';
import { ContainerBox } from '@/pages/authorAdmin/coomponents/containerBox';
import { testBookData } from '@/assets/testData';
import { Moment } from 'moment';
import { IconFont } from '@/components/IconFont';
import { Column } from '@ant-design/charts';
import { ColumnConfig } from '@ant-design/plots/es/components/column';
import { homeZoom } from '@/pages/authorAdmin/index';

export default () => {
  //设置日历颜色
  const renderTimeStyle = (moment: Moment) => {
    return (
      <div className={'adminHome_time_autoStyle'}>
        <span style={{ backgroundColor: '#FF9999' }}>{moment.date()}</span>
      </div>
    );
  };
  //年份列表
  const [yearList] = useState([2020, 2021, 2022, 2023, 2024, 2025]);
  //柱状图数据
  const [columnData] = useState([
    6870, 7654, 5982, 8979, 12213, 7950, 9740, 8950, 11209, 15980, 12745, 7543,
  ]);

  const colConfig: ColumnConfig = {
    data: columnData.map((item, index) => ({
      type: `${index + 1}月`,
      value: item,
    })),
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
  };

  const YearPopoverContent = () => {
    return (
      <div className={'YearPopoverContent'}>
        {yearList.map((list) => (
          <p key={list}>{list}</p>
        ))}
      </div>
    );
  };

  return (
    <div className={'adminHome'}>
      <AdminHeader className={'adminHome_header'} />
      <p className={'font_20'} style={{ padding: '38px 0 79px 0' }}>
        下午好，欢迎您！
      </p>
      {/*报表面板*/}
      <div className={'justify_between'}>
        <ContainerBox title={'上月稿费'}>
          <div className={'adminHome_manuscript'}>
            <p>
              全部稿费为 &nbsp;
              <span className={'adminHome_manuscript_title'}>24342.99</span>元
            </p>
            <p className={'adminHome_manuscript_item'}>
              <i style={{ backgroundColor: 'red' }}></i>
              保底签约稿费：12134元
            </p>
            <p className={'adminHome_manuscript_item'}>
              <i style={{ backgroundColor: '#FF6600' }}></i>
              广告投放收益：12134元
            </p>
            <p className={'adminHome_manuscript_item'}>
              <i style={{ backgroundColor: '#AF9FFF' }}></i>
              VIP会员成分收益：12134元
            </p>
            <p className={'adminHome_manuscript_item'}>
              <i style={{ backgroundColor: '#9E9E9E' }}></i>
              其他渠道收益：12134元
            </p>
          </div>
        </ContainerBox>
        <ContainerBox title={'作品管理'}>
          <div className={'adminHome_works'}>
            <div className={'flex adminHome_works_container'}>
              <img
                className={'adminHome_works_container_img'}
                src={testBookData[2].face}
                alt=""
              />
              <div className={'adminHome_works_container_info'}>
                <div>
                  <p className={'font_18'} style={{ color: '#000000' }}>
                    末日大反派系统
                  </p>
                  <p>正在审核章节数：8</p>
                </div>
                <div>
                  <p>本月更新：0字</p>
                  <p>作品字数：39872字</p>
                </div>
              </div>
            </div>
            <div className={'adminHome_works_operate'}>
              <span>新建章节</span>
              <span>章节管理</span>
              <span>下一本</span>
            </div>
          </div>
        </ContainerBox>
        <ContainerBox title={'码字日历'}>
          <div className={'adminHome_time'}>
            <Calendar
              className={'time_calendar'}
              locale={locale}
              dateFullCellRender={(moment) => renderTimeStyle(moment)}
              fullscreen={false}
            />
            <div className={'adminHome_time_tip'}>
              <span>本月更新12123字</span>
              <div className={'adminHome_time_tip_status'}>
                <i style={{ backgroundColor: '#FF9999' }}></i>
                <span>断更</span>
                <i style={{ backgroundColor: '#C3D4FF' }}></i>
                <span>正常</span>
              </div>
            </div>
          </div>
        </ContainerBox>
      </div>
      {/*    数据面板*/}
      <div className={'adminHome_data'}>
        <div className={'adminHome_data_item'}>
          <p>阅读人数</p>
          <p>2300</p>
        </div>
        <div className={'adminHome_data_item'}>
          <p>昨日新增阅读</p>
          <p>2300</p>
        </div>
        <div className={'adminHome_data_item'}>
          <p>作品点赞</p>
          <p>2300</p>
        </div>
        <div className={'adminHome_data_item'}>
          <p>加入书架</p>
          <p>2300</p>
        </div>
      </div>
      {/*    图表面板*/}
      <div className={'adminHome_charts'}>
        {/*年度稿费*/}
        <div className={'adminHome_charts_fee'}>
          {/*  年  */}
          <Popover
            placement="rightTop"
            autoAdjustOverflow={false}
            content={YearPopoverContent}
            trigger="click"
            getPopupContainer={() =>
              document.getElementById(
                'adminHome_charts_fee_title',
              ) as HTMLElement
            }
          >
            <div
              className={'adminHome_charts_fee_title'}
              id={'adminHome_charts_fee_title'}
            >
              <span>2021年稿费</span>
              <IconFont
                width={'18px'}
                height={'14px'}
                color={'#C2D4FF'}
                icon={'sanjiao'}
              />
            </div>
          </Popover>
          {/*    柱状图*/}
          <Column style={{ zoom: 1 / homeZoom }} {...colConfig} />
        </div>
        {/*    收益分成*/}
        <ContainerBox title={'本月收益分成'}>
          <div></div>
        </ContainerBox>
      </div>
    </div>
  );
};
