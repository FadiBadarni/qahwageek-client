import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { fetchAllCategories } from 'store/post/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { RootState } from 'store/store';
import { CategoryItem } from './CategoryItem';
import { Category } from 'models/post';
import CategoryDetails from './CategoryDetails';

const CategoriesManagement: React.FC = () => {
  const dispatch = useAppDispatch();

  const categories = useSelector((state: RootState) => state.categories.data);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white dark:bg-dark-background flex flex-wrap md:flex-nowrap">
      <div className="w-full md:w-1/2 space-y-4 pl-4 text-right">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
          إدارة التصنيفات
        </h1>
        <button
          type="button"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-light-primary dark:bg-dark-primary hover:bg-light-primary/90 dark:hover:bg-dark-primary/90"
          aria-label="إضافة تصنيف جديد"
        >
          <MdAddCircleOutline
            className="ml-2 mr-1 h-5 w-5"
            aria-hidden="true"
          />
          إضافة تصنيف
        </button>
        <div className="mt-5 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          {categories.map((category) => (
            <div
              onClick={() => handleCategorySelect(category)}
              key={category.id}
              className="cursor-pointer"
              role="button"
              aria-pressed="false"
            >
              <CategoryItem category={category} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 md:pl-4 pt-4 md:pt-0">
        {selectedCategory ? (
          <CategoryDetails category={selectedCategory} />
        ) : (
          <div className="text-neutral-600 dark:text-neutral-400 italic">
            الرجاء اختيار تصنيف لعرض التفاصيل.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesManagement;
