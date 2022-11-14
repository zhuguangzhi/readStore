//我的评论

import React, { useState } from 'react';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import { commentProps } from '@/type/book';
import { testCommentData } from '@/assets/testData';
import { CommentItem } from '@/pages/personalCenter/components/commentItem';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import ReadPopup from '@/components/module/ReadPopup';

const MyComment = () => {
  const tabBars = [
    { key: 'allComment', label: '全部评论' },
    { key: 'myComment', label: '我的评论' },
    { key: 'replay', label: '收到回复' },
  ];
  const [commentList] = useState<commentProps[]>([...testCommentData]);
  const [edit, setEdit] = useState(false);
  // 删除 确认弹窗
  const [delPopup, setDelPopup] = useState({
    open: false, //打开？
    title: '', //标题
    id: [] as number[], //删除的id数组
  });
  //改变多选框
  const onChangeCheckBox = (value: CheckboxChangeEvent, bookId: number) => {
    let arr = [...delPopup.id];
    if (value.target.checked) arr.push(bookId);
    else arr.splice(arr.indexOf(bookId), 1);
    setDelPopup({ ...delPopup, id: [...arr] });
  };
  //删除按钮点击
  const onDelChange = (comment?: commentProps) => {
    setDelPopup({
      title: comment ? '该内容' : '选中内容',
      id: comment ? [comment.id] : delPopup.id,
      open: true,
    });
  };
  return (
    <div>
      {/*头*/}
      <PersonalHeader
        useEdit={edit}
        setEdit={setEdit}
        tabs={tabBars}
        defaultSelect={'allComment'}
        useIcon={true}
        onDelete={onDelChange}
      />
      <div>
        {commentList.map((comment) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              isEdit={edit}
              checked={delPopup.id.includes(comment.id)}
              onCheck={(e) => onChangeCheckBox(e, comment.id)}
              onDelete={() => onDelChange(comment)}
            />
          );
        })}
      </div>
      {/*删除*/}
      <ReadPopup
        onClose={() => setDelPopup({ ...delPopup, open: false, id: [] })}
        title={`确定移除${delPopup.title}`}
        open={delPopup.open}
        showClose={true}
      >
        <p>
          只会删除账号数据，其他用户依然可以看到该数据哦！彻底删除请前往app操作！
        </p>
      </ReadPopup>
    </div>
  );
};
export default MyComment;
