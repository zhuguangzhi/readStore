import React from 'react';
import { itemCheckProps } from '@/pages/personalCenter/utils';
import { topCaseProps } from '@/type/topic';
import './style/topicShelfItem.less';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import router from '@/hook/url';
import { BookId } from '@/constants/url';

interface TopicShelfItemProps extends itemCheckProps<topCaseProps['data']> {
  onChangeCheckBox: (e: CheckboxChangeEvent, id: number) => void;
  checkIds: number[];
}

export const TopicShelfItem = ({
  data: topicList,
  ...props
}: TopicShelfItemProps) => {
  return (
    <div className={'topicShelfItem'}>
      {topicList.map((topic) => {
        return (
          <div key={topic.book_id} className={'topicShelfItem_box'}>
            <p className={'topicShelfItem_box_title'}>
              来自话题：{topic.topic_title}
            </p>
            <div
              className={'topicShelfItem_box_container textOverflow_3 cursor'}
              onClick={() =>
                router.push('/read', { [BookId]: topic.book_id }, true)
              }
            >
              {topic.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className={'topicShelfItem_box_container_tag'}
                  >
                    【{tag}】
                  </span>
                );
              })}
              <span>{topic.description}</span>
            </div>
            {/*    删除/多选*/}
            {props.isEdit ? (
              <Checkbox
                className={'topicShelfItem_box_check'}
                style={{ marginRight: '8px' }}
                defaultChecked={false}
                checked={props.checkIds.includes(topic.book_id)}
                onChange={(e) => props.onChangeCheckBox(e, topic.book_id)}
              />
            ) : (
              ''
            )}
          </div>
        );
      })}
    </div>
  );
};
