import { ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-editor.css';

interface RichTextEditorProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ align: [] }],
  ['clean'],
  ['image'],
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
