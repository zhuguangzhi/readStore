// 会员
import React, { useEffect, useRef, useState } from 'react';
import './style/membership.less';
import { useAuth } from '@/hook/useAuth';
import { Carousel } from 'antd';
import { UseNode } from '@/components/UseNode';
import { IconFont } from '@/components/IconFont';
import { CarouselRef } from 'antd/es/carousel';
import { vipRechargeProps } from '@/type/user';
import { useGetVipMoneyList } from '@/utils/personalCenter';
import { targetColumnArray } from '@/common/publicFn';

const interestList = [
  { url: 'iconVip', label: '尊贵标识' },
  { url: 'iconAd', label: '免广告阅读' },
  { url: 'iconContainer', label: '海量内容' },
  { url: 'iconNewBook', label: '独家新书' },
];
export const Membership = () => {
  const { userInfo } = useAuth();
  const carouselRef = useRef<CarouselRef>(null);
  // 充值选项
  const [moneyList, setMoneyList] = useState<vipRechargeProps[][] | null>(null);
  //  当前轮播的页数
  const [carouselPage, setCarouselPage] = useState(1);
  //  当前选中的选项
  const [currentOption, setCurrentOption] = useState<vipRechargeProps | null>();
  // 选择的支付方式
  const [payWay, setPayWay] = useState<'zfb' | 'wx'>('zfb');
  //  获取充值选项
  const { data: vipMoneyList, isLoading: vipLoading } =
    useGetVipMoneyList(userInfo);
  const { setLoadingModel } = useAuth();

  // 切换
  const slickCarousel = () => {
    const page = carouselPage === 1 ? 2 : 1;
    setCarouselPage(page);
    carouselRef.current?.goTo(page - 1);
  };

  useEffect(() => {
    if (!vipMoneyList) return;
    const arr = targetColumnArray(vipMoneyList, 3);
    setCurrentOption(vipMoneyList[0]);
    setMoneyList(arr);
  }, [vipMoneyList]);
  useEffect(() => {
    setLoadingModel(vipLoading);
  }, [vipLoading]);

  return (
    <div className={'membership'}>
      <img
        className={'membership_banner'}
        src={require('@/assets/image/vipBanner.png')}
        alt=""
      />
      {/*    信息*/}
      <div className={'membership_userInfo'}>
        <img
          className={'membership_userInfo_photo'}
          src={userInfo?.user_image_url}
          alt=""
        />
        <div className={'membership_userInfo_box'}>
          <p>{userInfo?.nickname}</p>
          {/*TODO 会员到期时间*/}
          <p className={'font_12'}>你还不是会员，开通会员可享更多特权</p>
        </div>
      </div>
      {/*    充值选项*/}
      <div className={'membership_money'}>
        <Carousel dots={false} ref={carouselRef}>
          {moneyList?.map((list, index) => {
            return (
              <div key={index} className={'membership_money_list'}>
                {list.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`membership_money_list_item ${
                        currentOption?.id === item.id
                          ? 'membership_itemSelect'
                          : ''
                      }`}
                      onClick={() => setCurrentOption(item)}
                    >
                      <p className={'membership_money_list_item_label'}>
                        {item.title}
                      </p>
                      <p style={{ color: '#764E19' }}>
                        <span className={'SYBold font_26'}>{item.money}</span>
                        <span className={'font_14'}>元</span>
                      </p>
                      <UseNode
                        rIf={
                          item.is_continuous === 2 &&
                          userInfo?.is_new_user === 1
                        }
                      >
                        <span className={'membership_money_list_item_tip'}>
                          新用户首月优惠
                        </span>
                      </UseNode>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Carousel>
        <div className={'membership_money_control'} onClick={slickCarousel}>
          <IconFont
            icon={carouselPage === 1 ? 'right' : 'left'}
            width={'21px'}
            height={'21px'}
          />
        </div>
        {/* 充值提示*/}
        <div className={'membership_money_tip'}>
          <span>{currentOption?.description}</span>
        </div>
      </div>
      {/*    充值权益*/}
      <div className={'membership_interest'}>
        <p className={'SYBold font_12'}>【看点小故事VIP专属权益】</p>
        <div className={'membership_interest_box'}>
          {interestList.map((list, index) => {
            return (
              <div key={index} className={'membership_interest_box_item'}>
                <img src={require(`@/assets/image/${list.url}.png`)} alt="" />
                <span>{list.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/*    支付方式*/}
      <div className={'membership_pay'}>
        <span style={{ marginRight: '11px' }}>选择支付方式：</span>
        <div
          className={`membership_pay_btn ${
            payWay === 'zfb' ? 'membership_itemSelect' : ''
          }`}
          onClick={() => setPayWay('zfb')}
        >
          <IconFont icon={'zfb'} width={'16px'} height={'16px'} />
          <span>支付宝支付</span>
        </div>
        <div
          className={`membership_pay_btn ${
            payWay === 'wx' ? 'membership_itemSelect' : ''
          }`}
          onClick={() => setPayWay('wx')}
        >
          <IconFont icon={'wx'} width={'17px'} height={'17px'} />
          <span>微信支付</span>
        </div>
      </div>
      {/*     支付金额*/}
      <div className={'font_14'}>
        <span>应付金额：</span>
        <span className={'font_28 SYBold'} style={{ color: '#D24025' }}>
          {currentOption?.money || 0}
        </span>
        <span style={{ color: '#D24025' }}>元</span>
      </div>
      {/*    提交*/}
      <div className={'membership_submit'}>
        <button className={'membership_submit_btn'}>确认支付</button>
        <div>
          <span>已阅读并同意</span>&nbsp;&nbsp;
          <span className={'cursor'} style={{ color: 'var(--themeColor)' }}>
            《会员协议》
          </span>
          &nbsp;|&nbsp;
          <span className={'cursor'} style={{ color: 'var(--themeColor)' }}>
            《隐私协议》
          </span>
        </div>
      </div>
    </div>
  );
};
