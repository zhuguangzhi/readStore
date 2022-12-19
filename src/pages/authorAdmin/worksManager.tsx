import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import './style/worksManager.less';
import router from '@/hook/url';
import { useGetWorks } from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
import { ReadPagination } from '@/components/module/ReadPagination';
import { DefaultNoData } from '@/components/defaultNoData';
import { WorksId } from '@/constants/url';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);
export default () => {
  const [page, setPage] = useState(1);
  //  获取作品列表
  const { data: worksList, isLoading: worksLoading } = useGetWorks({
    page,
    page_size: 10,
  });
  const { setLoadingModel } = useAuth();
  useEffect(() => {
    setLoadingModel(worksLoading);
  }, [worksLoading]);
  return (
    <div className={'worksManager'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'作品管理'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container'}>
        {/*    头*/}
        <div className={'worksManager_header'}>
          <p>作品列表（共{worksList?.page_info.total || 0}本）</p>
          <div
            className={'worksManager_header_add'}
            onClick={() => router.push(`/admin/works/worksInfo`)}
          >
            <IconFont icon={'jia'} />
            <span>创建新书</span>
          </div>
        </div>
        {/*作品列表*/}
        {!worksLoading && worksList && worksList.data.length === 0 ? (
          <DefaultNoData
            type={'noData'}
            text={'您暂时还没有创建作品哦~'}
            className={'authorNoData'}
          />
        ) : (
          <div className={'worksManager_list'}>
            {worksList?.data.map((item) => {
              return (
                <div key={item.id} className={'worksManager_list_item'}>
                  <img
                    className={'worksManager_list_item_img'}
                    src={item.cover_url}
                    alt=""
                  />
                  <div className={'worksManager_list_item_container'}>
                    {/*标题*/}
                    <div className={'worksManager_list_item_container_title'}>
                      <span>{item.name}</span>
                      <span className={'tags_finish'}>
                        {item.is_finish ? '完结' : '连载中'}
                      </span>
                      {/*  TODO:签约字段*/}
                      <span
                        style={{
                          // backgroundColor: !item.is_contract ? '#767676' : '',
                          backgroundColor: '#767676',
                        }}
                        className={'tags_contract'}
                      >
                        {/*{item.is_contract ? '已签约' : '未签约'}*/}
                        {'已签约'}
                      </span>
                    </div>
                    {/*    审核*/}
                    <p className={'worksManager_list_item_container_audit'}>
                      {item.book_status_text}
                      {/*{item.audit_num > 0*/}
                      {/*  ? `共 ${item.audit_num} 章节正在审核`*/}
                      {/*  : '暂无审核内容'}*/}
                    </p>
                    {/*    底部*/}
                    <div className={'worksManager_list_item_container_footer'}>
                      <div>
                        <p>
                          <span className={'color_99'}>本月更新：</span>
                          <span>{item.month_word}字</span>
                        </p>
                        <p className={'flex flex_align'}>
                          <span className={'color_99'}>作品字数：</span>
                          <span>{item.word_count}字</span>
                          <IconFont
                            className={'color_99 cursor'}
                            marginLeft={'8px'}
                            width={'20px'}
                            height={'20px'}
                            icon={'tishi'}
                          />
                        </p>
                      </div>
                      <div
                        className={'worksManager_list_item_container_operate'}
                      >
                        <div>
                          <IconFont
                            width={'26px'}
                            height={'26px'}
                            icon={'upload'}
                          />
                          <span>上传章节</span>
                        </div>
                        <div>
                          <IconFont
                            width={'20px'}
                            height={'22px'}
                            icon={'qianyue'}
                          />
                          <span>申请签约</span>
                        </div>
                        <div
                          onClick={() =>
                            router.push(`/admin/works/worksInfo`, {
                              [WorksId]: item.id,
                            })
                          }
                        >
                          <IconFont
                            width={'22px'}
                            height={'22px'}
                            icon={'set'}
                          />
                          <span>管理</span>
                        </div>
                        <div>
                          <IconFont
                            width={'18px'}
                            height={'18px'}
                            icon={'cha'}
                          />
                          <span>删除</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <ReadPagination
              current={page}
              pageSize={10}
              hideOnSinglePage={true}
              total={worksList?.page_info.total || 0}
              onChange={(val) => setPage(val)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
