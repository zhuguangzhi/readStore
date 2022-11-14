//我的评论

import React, { useState } from 'react';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import { commentProps } from '@/type/book';
import { testCommentData } from '@/assets/testData';
import { CommentItem } from '@/pages/personalCenter/components/commentItem';
import ReadPopup from '@/components/module/ReadPopup';
import { DelPopup } from './utils/index';

const MyComment = () => {
  const tabBars = [
    { key: 'allComment', label: '全部评论' },
    { key: 'myComment', label: '我的评论' },
    { key: 'replay', label: '收到回复' },
  ];
  const [commentList] = useState<commentProps[]>([...testCommentData]);
  const [edit, setEdit] = useState(false);
  const [popupOption, setPopupOption] = useState({
    ids: [] as number[],
    open: false,
    title: '',
  });
  const delPopup = new DelPopup(popupOption, setPopupOption);

  return (
    <div>
      {/*头*/}
      <PersonalHeader
        useEdit={edit}
        setEdit={setEdit}
        tabs={tabBars}
        defaultSelect={'allComment'}
        useIcon={true}
        onDelete={() => delPopup.onDelChange('选中内容')}
      />
      <div>
        {commentList.map((comment) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              isEdit={edit}
              checked={popupOption.ids.includes(comment.id)}
              onCheck={(e) => delPopup.onChangeCheckBox(e, comment.id)}
              onDelete={() => delPopup.onDelChange('该内容', comment.id)}
            />
          );
        })}
      </div>
      {/*删除*/}
      <ReadPopup
        onClose={delPopup.clearPopup}
        title={`确定移除${popupOption.title}`}
        open={popupOption.open}
        showClose={true}
      >
        <p>
          只会隐藏账号数据，其他用户依然可以看到该内容哦！彻底删除请前往app操作！
        </p>
      </ReadPopup>
    </div>
  );
};
export default MyComment;
