import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { fetchAllCategories } from 'store/post/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { RootState } from 'store/store';
import { CategoryItem } from './CategoryItem';

const CategoriesManagement: React.FC = () => {
  const dispatch = useAppDispatch();

  const categories = useSelector((state: RootState) => state.categories.data);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  console.log(categories);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white dark:bg-dark-background">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        إدارة التصنيفات
      </h1>
      <button
        type="button"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-light-primary dark:bg-dark-primary hover:bg-light-primary/90 dark:hover:bg-dark-primary/90"
      >
        <MdAddCircleOutline className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        إضافة تصنيف
      </button>
      <div className="mt-5 space-y-4">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesManagement;
