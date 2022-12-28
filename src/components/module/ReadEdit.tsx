import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor, RawEditorOptions } from 'tinymce/tinymce';
import { useEffect, useRef, useState } from 'react';
import './style/ReadEdit.less';
import { TinyKeyApi } from '../../../public/config';
import React from 'react';
import { useMounted } from '@/hook';
import { useAuth } from '@/hook/useAuth';
import { fnGetCpmisWords } from '@/common/publicFn';
import { translateNumber } from '@/utils/format';
import { UseNode } from '@/components/UseNode';

type ReadEditorProps = {
  setEditorEl: (el: TinyMCEEditor) => void;
  defaultContent: string;
  wordCount: number;
  isEdit?: boolean; //是否编辑模式
  setWordCount?: (count: number) => void;
};
export const ReadEditor = ({
  setEditorEl,
  wordCount,
  defaultContent,
  setWordCount,
  isEdit = true,
}: ReadEditorProps) => {
  const { setLoadingModel } = useAuth();
  const [wordNum, setWordNum] = useState(wordCount);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [editorOption] = useState<
    RawEditorOptions & { selector?: undefined; target?: undefined }
  >({
    language: 'zh_CN',
    // selector: "#textEditor",
    // height: "100%",
    menubar: false, //隐藏菜单栏
    plugins: ['image'],
    toolbar: `undo redo image`,
    toolbar_mode: 'wrap',
    images_upload_url: '/demo/upimg.php',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  });

  const onInit = (editor: TinyMCEEditor) => {
    setLoadingModel(false);
    editorRef.current = editor;
    setEditorEl(editor);
  };
  useEffect(() => {
    if (!editorRef.current) return;
    setLoadingModel(false);
    editorRef.current.setContent(defaultContent);
    editorRef.current.getBody().setAttribute('contenteditable', String(isEdit));
    editorRef.current.on('keyup', () => {
      const num = fnGetCpmisWords(
        editorRef.current?.getContent({ format: 'text' }) || '',
      );
      setWordNum(num);
      setWordCount?.(num);
    });
  }, [editorRef.current]);
  useMounted(() => {
    setLoadingModel(true);
  });

  return (
    <div className="readEditor">
      <Editor
        id={'textEditor'}
        apiKey={TinyKeyApi}
        onInit={(evt, editor) => onInit(editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={editorOption}
      />
      <UseNode rIf={editorRef.current}>
        <span className={'readEditor_wordNum'}>
          {' '}
          总字数：{translateNumber(Number(wordNum))}
        </span>
      </UseNode>
    </div>
  );
};
export default ReadEditor;
