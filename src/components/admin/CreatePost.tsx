import { RichTextEditor } from 'components/textEditor/RichTextEditor';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useState } from 'react';
import { savePost, uploadImageToS3 } from 'store/post/postActions';

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

    // Dispatch the action to save the post with updated content
    dispatch(savePost({ title, content: updatedContent }));
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
          >
            عنوان المقال
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="أدخل عنوان المقال هنا"
            className="mt-1 block w-full rounded-md border-0 bg-light-100 py-2 px-4 placeholder-neutral-400 text-neutral-700 focus:bg-white focus:text-neutral-900 dark:bg-dark-700 dark:placeholder:text-neutral-500 dark:focus:bg-dark-800 dark:focus:text-neutral-100 focus:ring-0 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
          >
            محتوى المقال
          </label>
          <RichTextEditor
            name="content"
            value={content}
            onChange={(e: any) => handleContentChange(e.target.value)}
          />
        </div>

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
