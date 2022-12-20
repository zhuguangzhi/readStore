// 新建上传章节
import React, { useCallback, useEffect, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { WorksId } from '@/constants/url';
import { useSearchParam } from '@/hook/url';
import {
  uesGetAuthorBookDetails,
  useGetChapterDetails,
} from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
import { Button } from 'antd';
import './style/addSection.less';
import { ReadModel } from '@/components/module/ReadModel';
import ReadEditor from '@/components/module/ReadEdit';
import { Editor as TinyMCEEditor } from 'tinymce/tinymce';
import router from '@/hook/url';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);
export const AddSection = () => {
  // 编辑器实例
  const [editorEl, setEditor] = useState<TinyMCEEditor | null>(null);
  const [{ [WorksId]: worksId }] = useSearchParam([WorksId]);
  const { data: worksInfo, isLoading: detailsLoading } =
    uesGetAuthorBookDetails({ id: Number(worksId) });
  const [worksModal, setWorksModal] = useState({
    open: false,
    container: '',
    textNum: 0,
  });
  const { setLoadingModel } = useAuth();
  // 获取章节详情
  const { data: chapterDetails, isLoading: chapterDetailsLoading } =
    useGetChapterDetails({ book_id: Number(worksId) });

  // 弹窗关闭
  const onModalCancel = useCallback(() => {
    setWorksModal((val) => ({
      ...val,
      open: false,
      container: editorEl?.getContent() || '',
    }));
  }, [editorEl]);

  useEffect(() => {
    if (!chapterDetails) return;
    setWorksModal((val) => ({
      ...val,
      container: chapterDetails.content,
      textNum: chapterDetails.word_count,
    }));
  }, [chapterDetails]);
  useEffect(() => {
    setLoadingModel(detailsLoading || chapterDetailsLoading);
  }, [detailsLoading, chapterDetailsLoading]);
  return (
    <div className={'addSection'}>
      <div style={{ paddingRight: '69px' }}>
        <AdminHeader subTitle={'作品内容'} subIcon={<SubIcon />} />
      </div>
      <div className={'admin_container addSection_container'}>
        <p className={'addSection_container_guid'}>
          <span
            className={'cursor'}
            onClick={() =>
              router.push('/admin/works/worksInfo', { [WorksId]: worksId })
            }
          >
            作品管理
          </span>
          <span>
            &nbsp;{'>'}&nbsp; {worksInfo?.name}
          </span>
        </p>
        <p className={'addSection_container_title'}>{worksInfo?.name}</p>
        <div className={'addSection_container_box'}>
          <p className={'addSection_container_box_title'}>作品内容</p>
          <div style={{ flex: 1 }}>
            <div
              className={'addSection_container_box_works'}
              onClick={() => setWorksModal((val) => ({ ...val, open: true }))}
            >
              <p dangerouslySetInnerHTML={{ __html: worksModal.container }}></p>
              <p className={'addSection_container_box_works_textNum'}>0</p>
            </div>
            <p style={{ padding: '0 18px' }}>内容不得少于500字</p>
            <div className={'addSection_container_box_btn'}>
              <Button type={'primary'}>存稿</Button>
              <Button type={'primary'}>提交</Button>
            </div>
          </div>
        </div>
      </div>
      <ReadModel
        open={worksModal.open}
        useTitle={false}
        closable={true}
        wrapClassName={'full-modal'}
        onCancel={onModalCancel}
      >
        <ReadEditor
          setEditorEl={setEditor}
          defaultContent={worksModal.container}
        />
      </ReadModel>
    </div>
  );
};
export default AddSection;
