import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import 'moment/locale/zh-cn';
import { Carousel, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';

import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import './style/home.less';
import { ContainerBox } from '@/pages/authorAdmin/components/containerBox';
// import { testBookData } from '@/assets/testData';
import moment from 'moment';
import { ChartsColum } from '@/pages/authorAdmin/components/chartsColum';
import { ChartsPie } from '@/pages/authorAdmin/components/chartsPie';
import {
  useGetAllFee,
  // useGetCodeCalendar,
  useGetDataStatistics,
  useGetWorksClass,
} from '@/utils/authorAdmin/home';
// import { translateNumber } from '@/utils/format';
import { useAuth } from '@/hook/useAuth';
import {
  useGetIncomeDistribute,
  useGetInComeTrend,
} from '@/utils/authorAdmin/income';
import { incomeDistributeProps } from '@/type/authorAdmin/income';
import { bookInfoProps } from '@/type/book';
import { DefaultNoData } from '@/components/defaultNoData';
import { useGetWorks } from '@/utils/authorAdmin/worksManager';
import { auditDesc } from '@/pages/authorAdmin/worksManager';
import router, { useSearchParam } from '@/hook/url';
import { AuthorToken, NewsId, WorksChapterId, WorksId } from '@/constants/url';
import { incomeTotalProps } from '@/type/authorAdmin/home';
import { targetColumnArray } from '@/common/publicFn';
import { allFeeTranslate } from '@/utils/format';
import { UseNode } from '@/components/UseNode';
import { CarouselRef } from 'antd/es/carousel';
import { IconFont } from '@/components/IconFont';
import { TOKEN } from '@/constants';

const colorList = {
  base_royalties: '#FF0028',
  vip: '#ACA2FC',
  gift: '#86DFEF',
  channel: '#9E9E9E',
  welfare: '#EFE486',
  advert: '#FF612A',
};
export default () => {
  const [{ [AuthorToken]: authorToken }] = useSearchParam([AuthorToken]);
  // 地址栏有token进行更新
  if (authorToken) {
    window.localStorage.setItem(TOKEN, JSON.stringify(authorToken));
  }
  // 码字日历月份
  // const [codeDate, setCodeDate] = useState(moment().format('YYYY-MM'));
  // 获取更新日历
  // const { data: codeCalendarList, isLoading: codeLoading } = useGetCodeCalendar(
  //   { date: codeDate },
  // );
  // 全部稿费
  const { data: allFeeData, isLoading: feeLoading } = useGetAllFee();
  // 全部稿费格式化数据
  const [formatFee, setFormatFee] = useState({
    total: 0,
    list: [[]] as { label: string; value: number; color: string }[][],
  });
  const feeRef = useRef<CarouselRef>(null);
  // 稿费展示的页数
  const [currentFeePage, setFeePage] = useState(1);
  //写作课堂
  const { data: writeData, isLoading: writeLoading } = useGetWorksClass();
  // 数据统计
  const { data: dataStatistics, isLoading: statisticsLoading } =
    useGetDataStatistics();
  //设置日历颜色
  // const renderTimeStyle = useCallback(
  //   (date: Moment) => {
  //     const list = codeCalendarList ? codeCalendarList.data : [];
  //     let color = '';
  //     const codeData = list.find(
  //       (item) => item.date === moment(date).format('YYYY-MM-DD'),
  //     );
  //     if (codeData) {
  //       color = codeData.word_count !== 0 ? '#C3D4FF' : '#FF9999';
  //     }
  //     return (
  //       <div className={'adminHome_time_autoStyle'}>
  //         <span style={{ backgroundColor: color }}>{date.date()}</span>
  //       </div>
  //     );
  //   },
  //   [codeCalendarList],
  // );
  //年份列表
  const [currentYear, setCurrentYear] = useState(moment());
  //柱状图数据
  const { data: columnData, isLoading: columnLoading } = useGetInComeTrend({
    year: moment(currentYear).format('YYYY'),
  });
  // 获取本月收益分成数据
  const { data: pieData, isLoading: pieLoading } = useGetIncomeDistribute({
    month: '',
  });
  // 获取作品列表
  const { data: worksList, isLoading: worksLoading } = useGetWorks({
    page: 1,
    page_size: 99999,
  });
  const [workData, setWorkData] = useState<bookInfoProps | null>(null);
  // 作品列表当前查看的书
  const [currentShowBook, setCurrentShowBook] = useState(0);
  const { setLoadingModel, authorInfo } = useAuth();

  // 收益分成格式化
  const formatPieData = useMemo(() => {
    if (!pieData) return null;
    let data: Partial<incomeDistributeProps> = { ...pieData };
    delete data['month'];
    const total = Object.values(data).reduce((pre: number, value) => {
      pre = pre + Number(value);
      return pre;
    }, 0);
    return [
      {
        name: '渠道收益',
        value:
          total === 0
            ? 0
            : Number(((pieData.channel / total) * 100).toFixed(2)),
      },
      {
        name: 'VIP分成',
        value:
          total === 0 ? 0 : Number(((pieData.vip / total) * 100).toFixed(2)),
      },
      {
        name: '其他收益',
        value:
          total === 0
            ? 0
            : Number(
                (
                  ((Number(pieData.welfare) +
                    Number(pieData.gift) +
                    Number(pieData.base_royalties)) /
                    total) *
                  100
                ).toFixed(2),
              ),
      },
    ];
  }, [pieData]);
  // 全部稿费跳转到指定页数
  const feeToPage = useCallback(
    (type: 'left' | 'right') => {
      if (!feeRef.current) return;
      if (type === 'left' && currentFeePage === 1) return;
      if (type === 'right' && currentFeePage === formatFee.list.length) return;
      const page = type === 'left' ? currentFeePage - 1 : currentFeePage + 1;
      feeRef.current.goTo(page - 1);
      setFeePage(page);
    },
    [feeRef.current, formatFee.list, currentFeePage],
  );

  useEffect(() => {
    setLoadingModel(
      statisticsLoading ||
        columnLoading ||
        pieLoading ||
        worksLoading ||
        writeLoading ||
        feeLoading,
    );
  }, [
    statisticsLoading,
    columnLoading,
    pieLoading,
    worksLoading,
    writeLoading,
    feeLoading,
  ]);
  useEffect(() => {
    if (!worksList) return;
    let index = currentShowBook;
    if (currentShowBook > worksList.data.length - 1) {
      index = 0;
      setCurrentShowBook(0);
    }
    setWorkData(worksList.data[index]);
  }, [worksList, currentShowBook]);
  useEffect(() => {
    if (!allFeeData) return;
    const feeArray: Partial<incomeTotalProps> = { ...allFeeData };
    delete feeArray.summary_total;
    const formatArray = [] as { label: string; value: number; color: string }[];
    (
      Object.keys(feeArray) as (keyof Omit<incomeTotalProps, 'summary_total'>)[]
    ).forEach((key) => {
      if (Number(feeArray[key]) !== 0) {
        formatArray.push({
          label: allFeeTranslate(key),
          value: feeArray[key] as number,
          color: colorList[key],
        });
      }
    });
    setFormatFee({
      total: formatArray.length,
      list: targetColumnArray(formatArray, 4),
    });
  }, [allFeeData]);
  return (
    <div className={'adminHome'}>
      <AdminHeader className={'adminHome_header'} />
      <p className={'font_20'} style={{ padding: '38px 0 79px 0' }}>
        下午好，欢迎您！
      </p>
      {/*报表面板*/}
      <div className={'justify_between adminHome_feePlate'}>
        <ContainerBox
          title={'全部稿费'}
          topRightChild={
            <UseNode rIf={formatFee.total > 4}>
              <div className={'adminHome_feePlate'}>
                <IconFont
                  className={'adminHome_feePlate_icon'}
                  icon={'left'}
                  onClick={() => {
                    feeToPage('left');
                  }}
                  color={currentFeePage === 1 ? '#A0A0A0' : ''}
                />
                &nbsp;
                <span>{currentFeePage}</span>&nbsp;/&nbsp;
                <span>{formatFee.list.length}</span>&nbsp;
                <IconFont
                  className={'adminHome_feePlate_icon'}
                  icon={'right'}
                  onClick={() => {
                    feeToPage('right');
                  }}
                  color={
                    currentFeePage === formatFee.list.length ? '#A0A0A0' : ''
                  }
                />
              </div>
            </UseNode>
          }
        >
          <>
            {!feeLoading && formatFee.total === 0 ? (
              <DefaultNoData
                type={'authorNoData'}
                className={'adminHome_noData'}
                text={'暂无收益'}
              />
            ) : (
              <div className={'adminHome_manuscript'}>
                <p
                  className={
                    formatFee.total < 3 ? 'flex flex_align flex_column' : ''
                  }
                >
                  全部稿费为 &nbsp;
                  <span>
                    <span className={'adminHome_manuscript_title'}>
                      {allFeeData?.summary_total || 0}{' '}
                    </span>
                    元
                  </span>
                </p>
                <Carousel afterChange={() => {}} dots={false} ref={feeRef}>
                  {formatFee.list.map((list, index) => {
                    return (
                      <div key={index}>
                        {list.map((fee, feeIndex) => {
                          return (
                            <p
                              className={'adminHome_manuscript_item'}
                              key={feeIndex}
                            >
                              <i style={{ backgroundColor: fee.color }}></i>
                              {fee.label}：{fee.value}元
                            </p>
                          );
                        })}
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            )}
          </>
        </ContainerBox>
        <ContainerBox title={'作品管理'}>
          <>
            {worksList?.page_info.total === 0 ? (
              <DefaultNoData
                type={'authorNoData'}
                className={'adminHome_noData'}
              />
            ) : (
              <div className={'adminHome_works'}>
                <div className={'flex adminHome_works_container'}>
                  <img
                    className={'adminHome_works_container_img'}
                    src={workData?.cover_url}
                    alt=""
                  />
                  <div className={'adminHome_works_container_info'}>
                    <div>
                      <p className={'font_18'} style={{ color: '#000000' }}>
                        {workData?.name}
                      </p>
                      <p>{auditDesc[workData?.chapter_status || '0']}</p>
                    </div>
                    <div>
                      <p>本月更新：{workData?.month_word || 0}字</p>
                      <p>作品字数：{workData?.word_count || 0}字</p>
                    </div>
                  </div>
                </div>
                <div className={'adminHome_works_operate'}>
                  <span
                    onClick={() => {
                      if (workData)
                        router.push('/admin/works/bookContainer', {
                          [WorksId]: workData.id,
                          [WorksChapterId]: workData.chapter_id,
                        });
                    }}
                  >
                    {workData?.is_finish === 1
                      ? '查看内容'
                      : workData?.chapter_id !== 0
                      ? '内容修改'
                      : '上传内容'}
                  </span>
                  <span
                    onClick={() =>
                      workData &&
                      router.push(`/admin/works/worksInfo`, {
                        [WorksId]: workData?.id,
                      })
                    }
                  >
                    作品管理
                  </span>
                  <span onClick={() => setCurrentShowBook((val) => val + 1)}>
                    下一本
                  </span>
                </div>
              </div>
            )}
          </>
        </ContainerBox>
        <ContainerBox title={'写作小课堂'}>
          <div className={'adminHome_classRoom'}>
            <Carousel
              dots={{ className: 'adminHome_classRoom_carousel' }}
              autoplay
            >
              {writeData?.map((write) => {
                return (
                  <div
                    className={'adminHome_classRoom_item'}
                    key={write.id}
                    onClick={() => {
                      router.push('/home/news', { [NewsId]: write.id }, true);
                    }}
                  >
                    <div className={'adminHome_classRoom_item_left'}>
                      <p className={'textOverflow font_14 font_bold'}>
                        {write.title}
                      </p>
                      <p
                        className={'adminHome_classRoom_item_container'}
                        dangerouslySetInnerHTML={{ __html: write.content }}
                      ></p>
                    </div>
                    <img
                      className={'adminHome_classRoom_item_img'}
                      src={write.picture}
                      alt={''}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
          {/*<div className={'adminHome_time'}>*/}
          {/*  <Calendar*/}
          {/*    value={moment(codeDate)}*/}
          {/*    className={'time_calendar'}*/}
          {/*    locale={locale}*/}
          {/*    dateFullCellRender={(moment) => renderTimeStyle(moment)}*/}
          {/*    fullscreen={false}*/}
          {/*    onChange={(value) => setCodeDate(moment(value).format('YYYY-MM'))}*/}
          {/*  />*/}
          {/*  <div className={'adminHome_time_tip'}>*/}
          {/*    <span>*/}
          {/*      本月更新*/}
          {/*      {translateNumber(codeCalendarList?.total.month_word_count || 0)}*/}
          {/*    </span>*/}
          {/*    <div className={'adminHome_time_tip_status'}>*/}
          {/*      <i style={{ backgroundColor: '#FF9999' }}></i>*/}
          {/*      <span>断更</span>*/}
          {/*      <i style={{ backgroundColor: '#C3D4FF' }}></i>*/}
          {/*      <span>正常</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
          <div className={'adminHome_charts_fee_header'} id={'charts_fee'}>
            <p>当年收益分成</p>
            <DatePicker
              defaultValue={currentYear}
              locale={locale}
              picker="year"
              inputReadOnly={true}
              // getPopupContainer={() =>
              //   document.getElementById('charts_fee') as HTMLElement
              // }
              placement={'bottomRight'}
              style={{ width: 138 }}
              disabledDate={(currentDate) => moment(currentDate) > moment()}
              onChange={(year) => setCurrentYear(moment(year))}
            />
          </div>
          {/*    柱状图*/}
          <ChartsColum data={columnData || []} />
        </div>
        {/*    收益分成*/}
        <ContainerBox title={'本月收益分成'}>
          <div style={{ height: '238px', overflow: 'hidden' }}>
            <ChartsPie
              data={formatPieData}
              bookNum={
                authorInfo
                  ? authorInfo.book_count + authorInfo.continue_count
                  : 0
              }
            />
          </div>
        </ContainerBox>
      </div>
    </div>
  );
};
