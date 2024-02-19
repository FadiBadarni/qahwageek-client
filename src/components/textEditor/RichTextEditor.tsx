import { ChangeEvent, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-editor.css';
import ResizeModule from '@ssumo/quill-resize-module';

Quill.register('modules/resize', ResizeModule);

interface RichTextEditorProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'], // Inline styles
  [{ color: [] }, { background: [] }], // Text color and background
  ['blockquote', 'code-block'], // Blockquotes and code blocks for formatting
  [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and unordered lists
  [{ indent: '-1' }, { indent: '+1' }], // Indentation
  [{ direction: 'rtl' }], // Text direction for RTL languages
  [{ align: [] }], // Text alignment
  ['link', 'image'], // Adding links and images
  ['clean'], // Removing formatting
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  value,
  onChange,
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const handleEditorChange = (content: string) => {
    // Example function to check if the content is primarily LTR (e.g., English)
    const isLTRContent = (text: string) => /[A-Za-z]/.test(text);

    const quillEditor = quillRef.current?.getEditor();
    if (quillEditor) {
      const text = quillEditor.getText();
      if (isLTRContent(text)) {
        quillEditor.root.setAttribute('dir', 'ltr');
      } else {
        quillEditor.root.setAttribute('dir', 'rtl');
      }
    }

    // Your existing change handling logic
    onChange({
      target: { name, value: content },
    } as ChangeEvent<HTMLInputElement>);
  };

  const modules = {
    toolbar: toolbarOptions,
    resize: {
      locale: {
        altTip: 'اضغط على Alt لتغيير الحجم بنسبة مئوية',
        inputTip: 'اضغط Enter للتأكيد',
        floatLeft: ' لليسار',
        floatRight: ' لليمين',
        center: 'توسيط',
        restore: 'استعادة',
      },
    },
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={handleEditorChange}
      modules={modules}
      className="rich-text-editor"
    />
  );
};
