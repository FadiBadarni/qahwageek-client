import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import CategorySelect from './CategorySelect';
import TextEditor from 'components/textEditor/TextEditor';
import {
  createNewPostData,
  replaceInlineImagesWithS3Urls,
  saveNewPost,
  uploadMainImageIfNeeded,
} from './utils';
import { fetchAllCategories } from 'store/category/categoryActions';

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.categories.data);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
        selectedCategoryIds
      );
      await saveNewPost(dispatch, newPostData);
    } catch (error) {
      console.error('Failed to process or save post:', error);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-6 lg:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
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
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 placeholder-neutral-400 focus:bg-white focus:text-neutral-900 dark:placeholder:text-neutral-500 dark:focus:bg-dark-800 dark:focus:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div className="md:col-span-6 lg:col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
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
              className="block w-full text-sm file:py-2 file:px-4 file:rounded-md file:border dark:file:border-neutral-700 file:text-sm file:font-semibold file:bg-light-input file:text-neutral-700 hover:file:bg-light-200 dark:file:bg-dark-input dark:file:text-neutral-200 dark:file:hover:bg-dark-layer focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
        <div className="md:col-span-6">
          <CategorySelect
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            onCategoryChange={setSelectedCategoryIds}
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
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
