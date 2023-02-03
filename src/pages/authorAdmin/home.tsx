import React, { useCallback, useEffect, useState } from 'react';
import 'moment/locale/zh-cn';
import { Calendar, Popover } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import './style/home.less';
import { ContainerBox } from '@/pages/authorAdmin/components/containerBox';
import { testBookData } from '@/assets/testData';
import moment, { Moment } from 'moment';
import { IconFont } from '@/components/IconFont';
import { ChartsColum } from '@/pages/authorAdmin/components/chartsColum';
import { ChartsPie } from '@/pages/authorAdmin/components/chartsPie';
import {
  useGetCodeCalendar,
  useGetDataStatistics,
} from '@/utils/authorAdmin/home';
import { translateNumber } from '@/utils/format';
import { useAuth } from '@/hook/useAuth';

export default () => {
  // 码字日历月份
  const [codeDate, setCodeDate] = useState(moment().format('YYYY-MM'));
  // 获取更新日历
  const { data: codeCalendarList, isLoading: codeLoading } = useGetCodeCalendar(
    { date: codeDate },
  );
  // 数据统计
  const { data: dataStatistics, isLoading: statisticsLoading } =
    useGetDataStatistics();
  //设置日历颜色
  const renderTimeStyle = useCallback(
    (date: Moment) => {
      const list = codeCalendarList ? codeCalendarList.data : [];
      let color = '';
      const codeData = list.find(
        (item) => item.date === moment(date).format('YYYY-MM-DD'),
      );
      if (codeData) {
        color = codeData.word_count !== 0 ? '#C3D4FF' : '#FF9999';
      }
      return (
        <div className={'adminHome_time_autoStyle'}>
          <span style={{ backgroundColor: color }}>{date.date()}</span>
        </div>
      );
    },
    [codeCalendarList],
  );
  //年份列表
  const [yearList] = useState([2020, 2021, 2022, 2023, 2024, 2025]);
  //柱状图数据
  const [columnData] = useState([
    6870, 7654, 5982, 8979, 12213, 7950, 9740, 8950, 11209, 15980, 12745, 7543,
  ]);
  const { setLoadingModel } = useAuth();

  const YearPopoverContent = () => {
    return (
      <div className={'YearPopoverContent'}>
        {yearList.map((list) => (
          <p key={list}>{list}</p>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setLoadingModel(codeLoading || statisticsLoading);
  }, [codeLoading, statisticsLoading]);

  return (
    <div className={'adminHome'}>
      <AdminHeader className={'adminHome_header'} />
      <p className={'font_20'} style={{ padding: '38px 0 79px 0' }}>
        下午好，欢迎您！
      </p>
      {/*报表面板*/}
      <div className={'justify_between'}>
        <ContainerBox title={'全部稿费'}>
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
              value={moment(codeDate)}
              className={'time_calendar'}
              locale={locale}
              dateFullCellRender={(moment) => renderTimeStyle(moment)}
              fullscreen={false}
              onChange={(value) => setCodeDate(moment(value).format('YYYY-MM'))}
            />
            <div className={'adminHome_time_tip'}>
              <span>
                本月更新
                {translateNumber(codeCalendarList?.total.month_word_count || 0)}
              </span>
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
          <p>{dataStatistics?.reader_count || 0}</p>
        </div>
        <div className={'adminHome_data_item'}>
          <p>昨日新增阅读</p>
          <p>{dataStatistics?.yesterday_read_count || 0}</p>
        </div>
        <div className={'adminHome_data_item'}>
          <p>作品点赞</p>
          <p>{dataStatistics?.approval_count || 0}</p>
        </div>
        <div className={'adminHome_data_item'}>
          <p>加入书架</p>
          <p>{dataStatistics?.collection_count || 0}</p>
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
          <ChartsColum data={columnData} />
        </div>
        {/*    收益分成*/}
        <ContainerBox title={'本月收益分成'}>
          <div style={{ height: '238px', overflow: 'hidden' }}>
            <ChartsPie />
          </div>
        </ContainerBox>
      </div>
    </div>
  );
};
