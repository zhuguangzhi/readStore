import React, { useState } from 'react';
import { PersonalHeader } from '@/pages/personalCenter/components/personalHeader';
import { DelPopup } from '@/pages/personalCenter/utils';

export default () => {
  const tabBars = [
    { key: 'topicShelf', label: '话题书架' },
    { key: 'topicHistory', label: '话题历史' },
  ];
  const [edit, setEdit] = useState(false);
  // 删除 确认弹窗
  const [popupOption, setPopupOption] = useState({
    ids: [] as number[],
    open: false,
    title: '',
  });
  // 操作实例
  const delPopup = new DelPopup(popupOption, setPopupOption);

  return (
    <div className={'topicShelf'}>
      {/*头*/}
      <PersonalHeader
        useEdit={edit}
        setEdit={setEdit}
        tabs={tabBars}
        defaultSelect={'myBookShelf'}
        useIcon={true}
        onDelete={() => delPopup.onDelChange('所选书籍')}
      />
    </div>
  );
};
