import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useCallback, useEffect, useState } from 'react';
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
import { displayToast } from 'utils/alertUtils';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useSelector(
    (state: RootState) => state.categories.categories.data
  );
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

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
    setLoading(true);
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
      const result = await saveNewPost(dispatch, newPostData);
      displayToast('يلا، نزلت المقالة بنجاح!', true, currentTheme);
      navigate(`/posts/${result.id}`);
    } catch (error: any) {
      displayToast(
        `واه، فشلنا بنشر المقالة: ${error.message}`,
        false,
        currentTheme
      );
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as any,
    onDrop,
  });

  return (
    <div className="p-4 mx-auto max-w-7xl px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Title input */}
          <div className="md:col-span-4">
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
            <CategorySelect
              categories={categories}
              selectedCategoryIds={selectedCategoryIds}
              onCategoryChange={setSelectedCategoryIds}
            />
          </div>

          {/* Dropzone for image upload */}
          <div className="md:col-span-6 lg:col-span-2 flex flex-col">
            <label className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
              صورة الغلاف
            </label>
            <div
              {...getRootProps({
                className:
                  'dropzone flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-lg text-center p-4 relative',
                style: { minHeight: '200px' },
              })}
            >
              <input {...getInputProps()} />
              <p className="text-sm font-medium text-light-text dark:text-dark-text">
                قم بالسحب والإفلات هنا، أو انقر لتحديد الملفات
              </p>
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        {/* Content editor */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
          >
            محتوى المقال
          </label>
          <TextEditor onContentChange={handleContentChange} />
        </div>

        {/* Submit button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg"
          >
            {loading ? 'جاري الإنشاء...' : 'إنشاء المقالة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
