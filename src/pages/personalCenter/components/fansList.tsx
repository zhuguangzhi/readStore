import { PullLoad } from '@/components/module/PullLoad';
import { DefaultNoData } from '@/components/defaultNoData';
import { fansListProp } from '@/type/user';
import React from 'react';
import { useAttentionUser } from '@/utils/read';

type FansListProps = {
  fansList: fansListProp[];
  total: number;
  page: number;
  noData: boolean;
  onBottom: Function;
  currentTab: 'fans' | 'approval' | 'attention';
  type: 'getAttention' | 'getFans';
  setList?: (val: fansListProp[]) => void;
};
export const FansList = ({
  fansList,
  page,
  total,
  noData,
  onBottom,
  currentTab,
  type,
  setList,
}: FansListProps) => {
  const { mutate: setAttention } = useAttentionUser('getFans');
  const onAttention = (id: number, isAttention: 1 | 2) => {
    if (type === 'getAttention') {
      setList?.(fansList?.filter((item) => item.user_id !== id));
    }
    setAttention({
      attention_user_id: id,
      is_attention: isAttention,
    });
  };
  return (
    <PullLoad
      page={page}
      total={total}
      pageSize={20}
      bottomHeight={50}
      onBottom={onBottom}
    >
      <>
        {noData ? (
          <DefaultNoData
            className={'fans_noData'}
            type={'noData'}
            text={currentTab === 'fans' ? '暂无粉丝' : '暂无关注'}
          />
        ) : (
          <div className={'fans_box'}>
            {(fansList as fansListProp[] | null)?.map((item) => {
              return (
                <div key={item.id} className={'fans_box_item'}>
                  <img
                    className={'fans_box_item_photo'}
                    src={item.user_image_url}
                    alt=""
                  />
                  <div className={'fans_box_item_info'}>
                    <p className={'SYBold'}>{item.nickname}</p>
                    <p className={'color_99 font_12'}>ID：{item.user_id}</p>
                  </div>
                  <div
                    className={`fans_box_item_btn ${
                      item.is_attention === 2 ? '' : 'fans_box_attention'
                    }`}
                    onClick={() =>
                      onAttention(item.user_id, item.is_attention === 2 ? 1 : 2)
                    }
                  >
                    {item.is_attention === 2 ? '关注' : '取消关注'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    </PullLoad>
  );
};
