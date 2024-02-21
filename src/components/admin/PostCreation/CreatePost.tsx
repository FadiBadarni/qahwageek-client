import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllCategories } from 'store/post/postActions';
import { RootState } from 'store/store';
import CategorySelect from './CategorySelect';
import TextEditor from 'components/textEditor/TextEditor';
import {
  createNewPostData,
  replaceInlineImagesWithS3Urls,
  saveNewPost,
  uploadMainImageIfNeeded,
} from './utils';

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
    try {
      const mainImagePresignedUrl = await uploadMainImageIfNeeded(
        dispatch,
        selectedImage
      );
      const updatedContent = await replaceInlineImagesWithS3Urls(
        dispatch,
        content
      );
      const newPostData = createNewPostData(
        title,
        updatedContent,
        mainImagePresignedUrl,
        readingTime,
        selectedCategoryIds
      );
      await saveNewPost(dispatch, newPostData);
    } catch (error) {
      console.error('Failed to process or save post:', error);
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
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-100 py-2 px-4 placeholder-neutral-400 focus:bg-white focus:text-neutral-900 dark:bg-dark-700 dark:placeholder:text-neutral-500 dark:focus:bg-dark-800 dark:focus:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
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
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-100 py-2 px-4 placeholder-neutral-400  focus:bg-white focus:text-neutral-900 dark:bg-dark-700 dark:placeholder:text-neutral-500 dark:focus:bg-dark-800 dark:focus:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              min="1"
            />
          </div>
          <div className="md:col-span-1 flex items-end">
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
              اختر صورة الغلاف
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedImage(e.target.files ? e.target.files[0] : null)
              }
              className="mt-1 block w-full text-sm  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-neutral-300 file:text-sm file:font-semibold file:bg-light-100 file:placeholder-neutral-400 file:text-neutral-700 hover:file:bg-light-200 dark:file:bg-dark-700 dark:file:text-neutral-200 dark:file:placeholder:text-neutral-500 dark:file:hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
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

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg"
          >
            إنشاء المقالة
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
