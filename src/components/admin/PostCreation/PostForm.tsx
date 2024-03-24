import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import CategorySelect from './CategorySelect';
import TextEditor from 'components/textEditor/TextEditor';
import {
  replaceInlineImagesWithS3Urls,
  saveNewPost,
  updatePost,
  uploadMainImageIfNeeded,
} from './utils';
import { fetchAllCategories } from 'store/category/categoryActions';
import { displayToast } from 'utils/alertUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useDropzoneHandler } from 'utils/dropzoneUtils';
import { getPostById } from 'store/post/postActions';
import LoadingSpinner from 'utils/LoadingSpinner';
import { useFormik } from 'formik';
import { postCreationFormValidationSchema } from 'utils/validationSchemas';

interface PostFormProps {
  mode: 'create' | 'edit';
}

export interface PostFormValues {
  title: string;
  selectedImage?: File;
  selectedCategoryIds: number[];
}

const PostForm: React.FC<PostFormProps> = ({ mode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const user = useSelector((state: RootState) => state.user.data);

  const categories = useSelector(
    (state: RootState) => state.categories.categories.data
  );
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(false);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const formik = useFormik<PostFormValues>({
    initialValues: {
      title: '',
      selectedImage: undefined,
      selectedCategoryIds: [],
    },
    validationSchema: postCreationFormValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      let mainImagePresignedUrl = imagePreviewUrl || undefined;

      if (values.selectedImage) {
        mainImagePresignedUrl = await uploadMainImageIfNeeded(
          dispatch,
          values.selectedImage
        );
      }

      const updatedContent = await replaceInlineImagesWithS3Urls(
        dispatch,
        content
      );

      const postData = {
        title: values.title,
        content: updatedContent,
        mainImageUrl: mainImagePresignedUrl,
        categoryIds: values.selectedCategoryIds,
      };

      try {
        let result;
        if (mode === 'create') {
          result = await saveNewPost(dispatch, postData);
          displayToast('تم إنشاء المنشور بنجاح!', true, currentTheme);
        } else if (mode === 'edit' && postId) {
          const updatePostData = { ...postData, id: Number(postId) };
          result = await updatePost(dispatch, updatePostData);
          displayToast('تم تحديث المنشور بنجاح!', true, currentTheme);
        }

        // Determine the navigation path based on user role
        const isAdmin = user?.roles.includes('ROLE_ADMIN');
        const navigationPath = isAdmin ? `/posts/${result.id}` : '/';
        navigate(navigationPath);
      } catch (error: any) {
        displayToast(`حدث خطأ: ${error.message}`, false, currentTheme);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (mode === 'edit' && postId) {
      const numericPostId = Number(postId);
      dispatch(getPostById(numericPostId))
        .unwrap()
        .then((post) => {
          formik.setFieldValue('title', post.title);
          setContent(post.content);
          formik.setFieldValue(
            'selectedCategoryIds',
            post.categoryDetails.map(
              (categoryDetail: { id: number }) => categoryDetail.id
            )
          );
          setImagePreviewUrl(post.mainImageUrl);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, mode, postId]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const onDrop = useDropzoneHandler({
    setFieldValue: formik.setFieldValue,
    setImagePreviewUrl,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    onDrop,
  });

  return (
    <div className="p-4 mx-auto max-w-7xl px-6 lg:px-8">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              placeholder="أدخل عنوان المقال هنا"
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 placeholder-neutral-400 focus:bg-white focus:text-neutral-900 dark:placeholder:text-neutral-500 dark:focus:bg-dark-800 dark:focus:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            ) : null}
            <CategorySelect
              categories={categories}
              selectedCategoryIds={formik.values.selectedCategoryIds}
              onCategoryChange={(ids: number[]) =>
                formik.setFieldValue('selectedCategoryIds', ids)
              }
              errorMessage={
                formik.touched.selectedCategoryIds &&
                typeof formik.errors.selectedCategoryIds === 'string'
                  ? formik.errors.selectedCategoryIds
                  : undefined
              }
            />
          </div>

          <div className="md:col-span-6 lg:col-span-2 flex flex-col">
            <label
              htmlFor="selectedImage"
              className="text-sm font-medium text-light-text dark:text-dark-text mb-2"
            >
              صورة الغلاف
            </label>
            <div
              {...getRootProps({
                className:
                  'dropzone flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-lg text-center p-4 relative',
                style: { minHeight: '200px' },
              })}
            >
              <input id="selectedImage" {...getInputProps()} />
              {formik.touched.selectedImage && formik.errors.selectedImage ? (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.selectedImage}
                </div>
              ) : null}

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

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
          >
            محتوى المقال
          </label>
          <TextEditor
            onContentChange={handleContentChange}
            initialContent={content}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center px-6 py-3 bg-brand-500 text-white font-semibold rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-lg"
          >
            {loading ? (
              <>
                <LoadingSpinner />
              </>
            ) : mode === 'edit' ? (
              'تحديث المقالة'
            ) : (
              'إنشاء المقالة'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
