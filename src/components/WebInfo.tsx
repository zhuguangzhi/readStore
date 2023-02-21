import React from 'react';
import { netUrl, tipLinks } from '../../public/config';
import './style/WebInfo.less';
import router from '@/hook/url';
import moment from 'moment';

//网站信息
export const WebInfo = () => {
  const onLink = (url: string) => {
    router.push(url, {}, true);
  };
  return (
    <div className={'web_info'}>
      <p className={'font_16 title'}>友情链接</p>
      <div className={'link'}>
        {tipLinks.map((link) => {
          return (
            <a
              key={link.href}
              href={link.href}
              target={'_blank'}
              rel="noreferrer"
            >
              {link.name}
            </a>
          );
        })}
      </div>
      <p style={{ color: '#797979' }}>公司：杭州瑶池文化传播有限公司</p>
      <p style={{ color: '#797979' }}>
        地址：浙江省杭州市临平区南苑街道西子国际金座2幢503室
      </p>
      <p style={{ color: '#797979' }}>联系方式：0571-88730295</p>
      <p style={{ letterSpacing: 0 }}>
        Copyright ©2022-{moment().format('YYYY')} {netUrl}
      </p>
      <p>看点小故事Allrights Reserved</p>
      {/*<p>增值电信业务经营许可证：浙B2-20190595</p>*/}
      <a
        href={require('@/assets/image/operatingLicense.pdf')}
        target={'_blank'}
        rel="noreferrer"
      >
        出版经营许可证：新出发(杭余)零字第 00369号
      </a>
      <div
        className={'flex record cursor'}
        style={{ marginTop: '6px' }}
        onClick={() => onLink('https://beian.miit.gov.cn')}
      >
        <img src={require('../assets/image/publicLogo.png')} alt="" />
        <span>网站备案号:浙ICP备19008617号-11</span>
      </div>
      {/*<div className={'flex record'}>*/}
      {/*  <img src={require('../assets/image/publicLogo.png')} alt="" />*/}
      {/*  <span>浙公网安备33011002014968号</span>*/}
      {/*</div>*/}
      {/*<div className={'flex record'} style={{ marginBottom: '6px' }}>*/}
      {/*  <img*/}
      {/*    style={{ width: '18px', height: '18px' }}*/}
      {/*    src={require('../assets/image/netTextLogo.png')}*/}
      {/*    alt=""*/}
      {/*  />*/}
      {/*  <span>浙网文[2019]3330-329号</span>*/}
      {/*</div>*/}
      <p>
        本站所收录作品、评论及本站做所之广告均属其个人行为，与本站立场无关请所有作者发布作品时务必遵守国家互联网信息管理办法规定，凡是违规，即作删除！
      </p>
    </div>
  );
};
