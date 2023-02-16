import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import './style/worksManager.less';
import router from '@/hook/url';
import { useDeleteWorks, useGetWorks } from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
import { ReadPagination } from '@/components/module/ReadPagination';
import { DefaultNoData } from '@/components/defaultNoData';
import { WorksChapterId, WorksId } from '@/constants/url';
import { Popover } from 'antd';
import { bookInfoProps } from '@/type/book';
import ReadPopup from '@/components/module/ReadPopup';
import { UseNode } from '@/components/UseNode';
import { ReadModel } from '@/components/module/ReadModel';
import { ContractManager } from '@/pages/authorAdmin/components/contractManager';
import { contractLeastNumber } from '../../../public/config';

// 审核描述
export const auditDesc = {
  '1': '已发布',
  '0': '待审',
  '-1': '驳回',
  '-2': '存稿',
  '-3': '定时发布',
  '-4': '删除',
  '-5': '复审',
  '-6': '隐藏',
  '-7': '草稿',
};
const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);
export default () => {
  const [page, setPage] = useState(1);
  const [popupOption, setPopupOption] = useState({
    title: '',
    id: 0,
    open: false,
  });
  const [contractModel, setContractModel] = useState({
    open: false,
    bookIndex: 0 as number,
  });
  //  获取作品列表
  const { data: worksList, isLoading: worksLoading } = useGetWorks({
    page,
    page_size: 10,
  });
  const { setLoadingModel } = useAuth();
  //删除作品
  const { mutate: delWorks, isLoading: delLoading } = useDeleteWorks(() => {
    setPopupOption((val) => ({ ...val, open: false }));
  });
  useEffect(() => {
    setLoadingModel(worksLoading);
  }, [worksLoading]);

  // 确认删除作品
  const confirmDelete = async () => {
    delWorks({ id: popupOption.id });
  };

  const WorksChannel = ({ works }: { works: bookInfoProps }) => {
    return (
      <div className={'worksManager_channelList'}>
        {works.empowers.length > 0
          ? works.empowers.map((empower, index) => {
              return <img key={index} src={empower.cover_url} alt="" />;
            })
          : '暂无上架渠道'}
      </div>
    );
  };

  return (
    <div className={'worksManager'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'作品管理'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container worksManager_container'}>
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
            type={'authorNoData'}
            text={'您暂时还没有创建作品哦~'}
            className={'authorNoData'}
          />
        ) : (
          <div className={'worksManager_list'}>
            {worksList?.data.map((item, index) => {
              return (
                <div key={item.id} className={'worksManager_list_item'}>
                  <UseNode rIf={item.cover_url}>
                    <img
                      className={'worksManager_list_item_img'}
                      src={item.cover_url}
                      alt=""
                    />
                  </UseNode>
                  <div
                    className={'worksManager_list_item_container'}
                    id={'worksManager_list'}
                  >
                    {/*标题*/}
                    <div className={'justify_between'}>
                      <div className={'worksManager_list_item_container_title'}>
                        <span>{item.name}</span>
                        <span className={'tags_finish'}>
                          {item.is_finish_text}
                        </span>
                        <span
                          style={{
                            backgroundColor:
                              item.is_signing === 1 ? '' : '#767676',
                          }}
                          className={'tags_contract'}
                        >
                          {item.is_signing_text}
                        </span>
                      </div>

                      <UseNode rIf={item.is_signing === 1}>
                        <div
                          className={'worksManager_list_item_container_channel'}
                        >
                          <IconFont
                            width={'17px'}
                            height={'17px'}
                            icon={'shangjia'}
                          />
                          <span>上架渠道</span>
                          <Popover
                            placement="bottomRight"
                            content={<WorksChannel works={item} />}
                            trigger="click"
                            getPopupContainer={() =>
                              document.getElementById(
                                'worksManager_list',
                              ) as HTMLDivElement
                            }
                          >
                            <i className={'flex flex_align'}>
                              <IconFont
                                className={'cursor'}
                                width={'17px'}
                                height={'17px'}
                                icon={'arrow'}
                              />
                            </i>
                          </Popover>
                        </div>
                      </UseNode>
                    </div>
                    {/*    审核*/}
                    <p
                      className={`worksManager_list_item_container_audit worksManager_chapterStatus${item.chapter_status}`}
                    >
                      {auditDesc[item.chapter_status]}
                      {/*{item.audit_num > 0*/}
                      {/*  ? `共 ${item.audit_num} 章节正在审核`*/}
                      {/*  : '暂无审核内容'}*/}
                    </p>
                    {/*    底部*/}
                    <div className={'worksManager_list_item_container_footer'}>
                      <div>
                        {/*<p>*/}
                        {/*  <span className={'color_99'}>本月更新：</span>*/}
                        {/*  <span>{item.month_word}字</span>*/}
                        {/*</p>*/}
                        <p className={'flex flex_align'} id={'worksNum'}>
                          <span className={'color_99'}>作品字数：</span>
                          <span>{item.chapter_word_count}字</span>
                          {/*<Popover*/}
                          {/*  placement="bottom"*/}
                          {/*  content={'已通过审核的章节的总字数'}*/}
                          {/*  getPopupContainer={() =>*/}
                          {/*    document.getElementById(*/}
                          {/*      'worksNum',*/}
                          {/*    ) as HTMLDivElement*/}
                          {/*  }*/}
                          {/*>*/}
                          {/*  <i className={'flex flex_align'}>*/}
                          {/*    <IconFont*/}
                          {/*      className={'color_99 cursor'}*/}
                          {/*      marginLeft={'8px'}*/}
                          {/*      width={'20px'}*/}
                          {/*      height={'20px'}*/}
                          {/*      icon={'tishi'}*/}
                          {/*    />*/}
                          {/*  </i>*/}
                          {/*</Popover>*/}
                        </p>
                      </div>
                      <div
                        className={'worksManager_list_item_container_operate'}
                      >
                        <div
                          onClick={() => {
                            router.push('/admin/works/bookContainer', {
                              [WorksId]: item.id,
                              [WorksChapterId]: item.chapter_id,
                            });
                          }}
                        >
                          <IconFont
                            width={'26px'}
                            height={'26px'}
                            icon={'upload'}
                          />
                          <span>
                            {item.is_finish === 1
                              ? '查看内容'
                              : item.chapter_id !== 0
                              ? '内容修改'
                              : '上传内容'}
                          </span>
                        </div>
                        <UseNode
                          rIf={
                            item.is_signing === 2 &&
                            item.word_count >= contractLeastNumber &&
                            item.book_status === 1
                          }
                        >
                          <div
                            onClick={() => {
                              setContractModel({
                                open: true,
                                bookIndex: index,
                              });
                            }}
                          >
                            <IconFont
                              width={'20px'}
                              height={'22px'}
                              icon={'qianyue'}
                            />
                            <span>签约管理</span>
                          </div>
                        </UseNode>
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
                        <UseNode rIf={item.is_signing === 2}>
                          <div
                            onClick={() =>
                              setPopupOption({
                                title: item.name,
                                id: item.id,
                                open: true,
                              })
                            }
                          >
                            <IconFont
                              width={'18px'}
                              height={'18px'}
                              icon={'cha'}
                            />
                            <span>删除</span>
                          </div>
                        </UseNode>
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

      {/*删除*/}
      <ReadPopup
        onClose={() => setPopupOption((val) => ({ ...val, open: false }))}
        title={`确定删除 ”${popupOption.title}“`}
        open={popupOption.open}
        showClose={true}
        onOk={confirmDelete}
        loading={delLoading}
      >
        <p>删除后该作品无法恢复，谨慎操作！</p>
      </ReadPopup>
      {/*  签约*/}
      <ReadModel
        useTitle={false}
        width={'639px'}
        open={contractModel.open}
        onCancel={() =>
          setContractModel({
            open: false,
            bookIndex: 0,
          })
        }
      >
        <ContractManager
          bookInfo={worksList?.data[contractModel.bookIndex]}
          closeModel={() => setContractModel({ open: false, bookIndex: 0 })}
        />
      </ReadModel>
    </div>
  );
};
