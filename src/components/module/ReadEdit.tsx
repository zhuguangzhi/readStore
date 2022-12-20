import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor, RawEditorOptions } from 'tinymce/tinymce';
import { useEffect, useRef, useState } from 'react';
import './style/ReadEdit.less';
import { TinyKeyApi } from '../../../public/config';
import React from 'react';

type ReadEditorProps = {
  setEditorEl: (el: TinyMCEEditor) => void;
  defaultContent: string;
};
export const ReadEditor = ({
  setEditorEl,
  defaultContent,
}: ReadEditorProps) => {
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
    editorRef.current = editor;
    setEditorEl(editor);
  };
  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.setContent(defaultContent);
  }, [editorRef.current]);

  return (
    <div className="readEditor">
      <Editor
        id={'textEditor'}
        apiKey={TinyKeyApi}
        onInit={(evt, editor) => onInit(editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={editorOption}
      />
    </div>
  );
};
export default ReadEditor;
