import { ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-editor.scss';

interface RichTextEditorProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }], // Headers in a dropdown, Font styles
  ['bold', 'italic', 'underline', 'strike'], // Toggled buttons
  [{ color: [] }, { background: [] }], // Text colors, background colors
  ['blockquote', 'code-block'], // Blockquote, Code-block
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], // Lists, Indentations
  [{ direction: 'rtl' }], // Text direction
  [{ align: [] }], // Text alignment
  ['clean'], // Remove formatting
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  value,
  onChange,
}) => {
  const handleEditorChange = (content: string) => {
    const event = {
      target: {
        name,
        value: content,
      },
    } as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleEditorChange}
      modules={{ toolbar: toolbarOptions }}
      className="rich-text-editor"
    />
  );
};
