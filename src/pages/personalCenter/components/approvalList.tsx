import { approvalListProps } from '@/type/user';
import { PullLoad } from '@/components/module/PullLoad';
import { DefaultNoData } from '@/components/defaultNoData';
import React from 'react';
import './style/fansModal.less';

type ApprovalListProps = {
  approvalList: approvalListProps[];
  total: number;
  page: number;
  noData: boolean;
  onBottom: Function;
};
export const ApprovalList = ({
  approvalList,
  page,
  total,
  onBottom,
  noData,
}: ApprovalListProps) => {
  return (
    <div style={{ height: '100%' }}>
      <PullLoad
        page={page}
        total={total}
        pageSize={20}
        bottomHeight={200}
        onBottom={onBottom}
      >
        <>
          {noData ? (
            <DefaultNoData className={'fans_noData'} type={'noData'} />
          ) : (
            <div className={'fans_box'}>
              {(approvalList as approvalListProps[] | null)?.map((item) => {
                return (
                  <div key={item.id} className={'fans_box_item'}>
                    <img
                      className={'fans_box_item_photo'}
                      src={item.approval_user_image_url}
                      alt=""
                    />
                    <div className={'fans_box_item_info textOverflow'}>
                      <p className={'font_14'}>
                        @{item.approval_user_nickname} &nbsp;&nbsp;
                        对你的评论进行了点赞
                      </p>
                      <p
                        className={'color_99 font_12 '}
                      >{`"${item.content}"`}</p>
                    </div>
                    <div className={'fans_box_item_time'}>
                      <span>{item.create_time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      </PullLoad>
    </div>
  );
};
