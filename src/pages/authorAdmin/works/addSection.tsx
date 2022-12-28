// 新建上传章节
import React, { useCallback, useEffect, useState } from 'react';
import { AdminHeader } from '@/pages/authorAdmin/components/adminHeader';
import { IconFont } from '@/components/IconFont';
import { WorksChapterId, WorksId } from '@/constants/url';
import { useSearchParam } from '@/hook/url';
import {
  uesGetAuthorBookDetails,
  useEditChapter,
  useGetChapterDetails,
} from '@/utils/authorAdmin/worksManager';
import { useAuth } from '@/hook/useAuth';
import { Button, message } from 'antd';
import './style/addSection.less';
import { ReadModel } from '@/components/module/ReadModel';
import ReadEditor from '@/components/module/ReadEdit';
import { Editor as TinyMCEEditor } from 'tinymce/tinymce';
import router from '@/hook/url';
import { translateNumber } from '@/utils/format';
import { useAsync } from '@/hook/useAsync';
import { AuthorBook, ErrorCheck } from '@/common/api';
import { ResponseData } from '@/common/http';

const SubIcon = () => (
  <IconFont width={'37px'} height={'44px'} icon={'bookShelf'} />
);
export const AddSection = () => {
  // 编辑器实例
  const [editorEl, setEditor] = useState<TinyMCEEditor | null>(null);
  const [{ [WorksId]: worksId, [WorksChapterId]: chapterId }] = useSearchParam([
    WorksId,
    WorksChapterId,
  ]);
  const { run, isLoading: createLoading } =
    useAsync<ResponseData<{ chapter_id: number }>>();
  // 作品详情
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
    useGetChapterDetails({
      book_id: Number(worksId),
      chapter_id: Number(chapterId),
    });
  // 编辑章节
  const { mutate: editChapter, isLoading: editLoading } = useEditChapter();

  // 弹窗关闭
  const onModalCancel = useCallback(() => {
    setWorksModal((val) => ({
      ...val,
      open: false,
      container: editorEl?.getContent() || '',
    }));
  }, [editorEl]);

  // 存稿
  const saveWorks = async (draft: 1 | 2) => {
    if (worksInfo?.is_finish === 1) {
      message.error('完结作品仅支持查看');
      return;
    }
    const regExp = /<p[^>]*[^>]*>(.*?)<\/p>/g;
    let lineNum: number = 0;
    while (regExp.exec(worksModal.container) !== null) {
      lineNum++;
    }
    if (!Number(chapterId) || draft === 1) {
      const res = await run(
        AuthorBook.createWorksChapter({
          book_id: Number(worksId),
          content: worksModal.container,
          word_count: worksModal.textNum,
          is_draft: draft,
          line_count: lineNum,
        }),
      );
      if (!ErrorCheck(res)) return;
      message.success('提交成功');
      // setUrlParams({[WorksChapterId]:30})
      router.push('/admin/works');
    } else {
      //  编辑章节
      editChapter({
        chapter_id: Number(chapterId),
        book_id: Number(worksId),
        content: worksModal.container,
        word_count: worksModal.textNum,
        is_draft: 2,
        line_count: lineNum,
      });
    }
  };

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
            作品信息
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
              {/*<p className={'addSection_container_box_works_textNum'}>0</p>*/}
            </div>
            <div className={'justify_between'} style={{ padding: '0 18px' }}>
              <p>内容不得少于500字</p>
              <p>总字数：{translateNumber(Number(worksModal.textNum))}</p>
            </div>
            <div className={'addSection_container_box_btn'}>
              {/*<Button type={'primary'} onClick={()=>saveWorks(1)}>存稿</Button>*/}
              <Button
                type={'primary'}
                onClick={() => saveWorks(2)}
                loading={editLoading || createLoading}
              >
                提交
              </Button>
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
          wordCount={worksModal.textNum}
          setWordCount={(count) =>
            setWorksModal((val) => ({ ...val, textNum: count }))
          }
          isEdit={worksInfo?.is_finish === 2}
        />
      </ReadModel>
    </div>
  );
};
export default AddSection;
