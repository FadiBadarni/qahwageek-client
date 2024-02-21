import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TextEditorProps {
  onContentChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onContentChange }) => {
  const apiKey = process.env.REACT_APP_TINYMCE_API_KEY || '';

  const handleEditorChange = (content: string, editor: any) => {
    console.log('Content was updated:', content);
    onContentChange(content);
  };

  return (
    <Editor
      apiKey={apiKey}
      init={{
        height: 500,
        menubar: false,
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
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
          'directionality',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help | ltr rtl | preview',
        content_style:
          "@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap');",
      }}
      initialValue="Welcome to TinyMCE!"
      onEditorChange={handleEditorChange}
    />
  );
};

export default TextEditor;
