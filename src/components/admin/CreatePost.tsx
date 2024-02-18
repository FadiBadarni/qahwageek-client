import { RichTextEditor } from 'components/textEditor/RichTextEditor';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useState } from 'react';
import { uploadImageToS3 } from 'store/post/postActions';

const CreatePost = () => {
  const dispatch = useAppDispatch();
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
    let updatedContent = content;

    const base64ImageRegex = /<img src="(data:image\/[^;]+;base64,[^"]+)"/g;
    let matches = [...content.matchAll(base64ImageRegex)];

    // Map matches to promises that resolve to replacement strings
    const replacementsPromise = matches.map(async (match) => {
      const [fullMatch, dataURI] = match; // fullMatch is the entire img src value, dataURI includes the MIME type and base64 data
      const contentType = dataURI.split(';')[0].split(':')[1]; // Extract MIME type from dataURI
      const fileExtension = contentType.split('/')[1] || 'jpg';
      const filename = `image-${Date.now()}.${fileExtension}`;
      try {
        const imageUrl = await dispatch(
          uploadImageToS3({ base64Image: dataURI, filename }) // Pass the entire data URI
        ).unwrap();
        return {
          old: fullMatch,
          new: imageUrl,
        };
      } catch (error) {
        console.error('Failed to upload image to S3:', error);
        return null;
      }
    });

    // Resolve all promises and apply the replacements
    const replacements = await Promise.all(replacementsPromise);
    replacements.forEach((replacement) => {
      if (replacement) {
        updatedContent = updatedContent.replace(
          replacement.old,
          `<img src="${replacement.new}" />`
        );
      }
    });

    console.log({ title, content: updatedContent });
    // Dispatch the action to save the post with updated content
    // dispatch(savePost({ title, content: updatedContent }));
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
