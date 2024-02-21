import { useAppDispatch } from 'hooks/useAppDispatch';
import { NewPost } from 'models/post';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchAllCategories,
  savePost,
  uploadImageToS3,
  uploadMainImage,
} from 'store/post/postActions';
import { RootState } from 'store/store';
import CategorySelect from './CategorySelect';
import TextEditor from 'components/home/TextEditor';

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.categories.data);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleReadingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReadingTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedContent = content;
    let mainImagePresignedUrl = '';

    if (selectedImage) {
      const filename = `main-image-${Date.now()}.${
        selectedImage.type.split('/')[1]
      }`;
      try {
        mainImagePresignedUrl = await dispatch(
          uploadMainImage({ file: selectedImage, filename })
        ).unwrap();
      } catch (error) {
        console.error('Failed to upload main image:', error);
        return; // Stop the submission if the main image upload fails
      }
    }

    const imgTagRegex =
      /<img ([^>]*src="data:image\/[^;]+;base64,[^"]+"[^>]*)>/g;
    let matches = [...content.matchAll(imgTagRegex)];

    // Map matches to promises that resolve to replacement strings
    const replacementsPromise = matches.map(async (match) => {
      const [fullMatch, attributesPart] = match; // fullMatch is the entire img tag, attributesPart includes all attributes
      const dataURIMatch = attributesPart.match(
        /src="(data:image\/[^;]+;base64,[^"]+)"/
      );
      if (!dataURIMatch) return null; // Skip if no data URI found
      const dataURI = dataURIMatch[1];
      const contentType = dataURI.split(';')[0].split(':')[1];
      const fileExtension = contentType.split('/')[1] || 'jpg';
      const filename = `image-${Date.now()}.${fileExtension}`;
      try {
        const imageUrl = await dispatch(
          uploadImageToS3({ base64Image: dataURI, filename })
        ).unwrap();
        // Replace only the src part of the attributesPart
        const newAttributesPart = attributesPart.replace(
          dataURIMatch[0],
          `src="${imageUrl}"`
        );
        return {
          old: fullMatch,
          new: `<img ${newAttributesPart} />`,
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
          replacement.new
        );
      }
    });

    const newPostData: NewPost = {
      title,
      content: updatedContent,
      mainImageUrl: mainImagePresignedUrl,
      readingTime: readingTime ? parseInt(readingTime, 10) : undefined,
      categoryIds: selectedCategoryIds,
    };

    // Dispatch the action to save the post with updated content
    try {
      await dispatch(savePost(newPostData)).unwrap();
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-3">
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
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-100 py-2 px-4 placeholder-neutral-400 text-neutral-700 focus:bg-white focus:text-neutral-900 dark:bg-dark-700 dark:placeholder:text-neutral-500 dark:focus:bg-dark-800 dark:focus:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div className="md:col-span-1">
            <label
              htmlFor="readingTime"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              مدة القراءة
            </label>
            <input
              id="readingTime"
              type="number"
              name="readingTime"
              value={readingTime}
              onChange={handleReadingTimeChange}
              placeholder="مثال: 5"
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-100 py-2 px-4 placeholder-neutral-400 text-neutral-700 focus:bg-white focus:text-neutral-900 dark:bg-dark-700 dark:placeholder:text-neutral-500 dark:focus:bg-dark-800 dark:focus:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              min="1"
            />
          </div>
          <div className="md:col-span-1">
            <CategorySelect
              categories={categories}
              selectedCategoryIds={selectedCategoryIds}
              onCategoryChange={setSelectedCategoryIds}
            />
          </div>
          <div className="md:col-span-1">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              اختر صورة
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedImage(e.target.files ? e.target.files[0] : null)
              }
              className="mt-1 block w-full text-sm text-neutral-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
          >
            محتوى المقال
          </label>
          <TextEditor onContentChange={handleContentChange} />
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
