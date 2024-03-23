import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import EditorSkeleton from './EditorSkeleton';

interface TextEditorProps {
  initialContent?: string;
  onContentChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialContent,
  onContentChange,
}) => {
  const [content, setContent] = useState(
    initialContent || 'عن شو بدنا نكتب اليوم ؟'
  );
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_TINYMCE_API_KEY || '';

  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    setContent(initialContent || 'عن شو بدنا نكتب اليوم ؟');
  }, [initialContent]);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    onContentChange(newContent); // Propagate changes up
  };

  return (
    <div>
      {isLoading && <EditorSkeleton />}
      <Editor
        apiKey={apiKey}
        initialValue={content}
        value={content}
        onInit={(evt, editor) => {
          setIsLoading(false);
        }}
        init={{
          height: 400,
          menubar: false,
          language: 'ar',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'codesample',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
            'directionality',
          ],
          toolbar:
            'redo undo | styles  | bold italic forecolor backcolor | ' +
            'alignleft aligncenter alignright | ' +
            'blockquote codesample | bullist numlist | ' +
            'link image media  | help |' +
            'ltr rtl | table removeformat outdent indent | preview fullscreen',
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap');",
          skin: currentTheme === 'dark' ? 'oxide-dark' : 'oxide',
          content_css: currentTheme === 'dark' ? 'dark' : 'default',
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
