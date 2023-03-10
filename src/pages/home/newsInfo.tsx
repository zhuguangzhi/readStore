import React, { useEffect } from 'react';
import { useGetNewsInfo } from '@/utils/home';
import { NewsId } from '@/constants/url';
import router, { useSearchParam } from '@/hook/url';
import { useAuth } from '@/hook/useAuth';
import { netName } from '../../../public/config';
import './style/newInfo.less';
import { UseNode } from '@/components/UseNode';

export default () => {
  const [{ [NewsId]: newsId }] = useSearchParam([NewsId]);
  const { data: newsInfo, isLoading } = useGetNewsInfo(Number(newsId)); //category_id 4:写作小课堂 不展示时间
  const { setLoadingModel } = useAuth();

  useEffect(() => {
    setLoadingModel(isLoading);
  }, [isLoading]);
  return (
    <div className={'newInfo'}>
      <div className={'newInfo_container'}>
        {/*    面包屑*/}
        <UseNode rIf={newsInfo?.category_id !== 4}>
          <div className={'newInfo_breadcrumb'}>
            <span>当前位置：</span>
            <span className={'cursor'} onClick={() => router.back()}>
              {netName}
              {'>'}
            </span>
            <span className={'cursor'}>{newsInfo?.title || '公告'}</span>
          </div>
        </UseNode>
        <div className={'newInfo_title'}>
          <p className={'font_24 font_bold'}>{newsInfo?.title}</p>
          <UseNode rIf={newsInfo?.category_id !== 4}>
            <p className={'color_99'} style={{ marginTop: '12px' }}>
              时间：{newsInfo?.create_time}
            </p>
          </UseNode>
        </div>
        <p dangerouslySetInnerHTML={{ __html: newsInfo?.content || '' }}></p>
      </div>
    </div>
  );
};
