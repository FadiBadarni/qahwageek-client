import { RichTextEditor } from 'components/textEditor/RichTextEditor';
import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract base64 images and replace them with S3 URLs
    //const updatedContent = await replaceBase64WithS3URLs(content);

    // Now, updatedContent has S3 URLs instead of base64 strings
    console.log(content);

    // Proceed to use updatedContent for the post submission
    // Update Redux state or directly submit the post data
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="عنوان المقال"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
          required
        />
        <RichTextEditor
          name="content"
          value={content}
          onChange={(e: any) => handleContentChange(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-brand-500 text-white font-medium rounded-md hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          إنشاء المقالة
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
