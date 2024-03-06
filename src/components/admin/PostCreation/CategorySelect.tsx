import React from 'react';
import { Category } from 'models/post';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { LoadingStatus } from 'store/shared/commonState';
import CategorySkeleton from './CategorySkeleton';

interface CategorySelectProps {
  categories: Category[];
  selectedCategoryIds: number[];
  onCategoryChange: (selectedCategoryIds: number[]) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategoryIds,
  onCategoryChange,
}) => {
  const loadingStatus = useSelector(
    (state: RootState) => state.categories.categories.status
  );

  const toggleCategory = (categoryId: number) => {
    const isSelected = selectedCategoryIds.includes(categoryId);
    const newSelectedCategories = isSelected
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];
    onCategoryChange(newSelectedCategories);
  };

  return (
    <div className="mx-auto my-4">
      <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2 text-right">
        اختر التصنيفات المناسبة للمقال
      </h3>
      <div className="flex flex-wrap gap-2 p-4 bg-light-layer dark:bg-dark-layer rounded-md shadow">
        {loadingStatus === LoadingStatus.Loading ? (
          <CategorySkeleton />
        ) : (
          categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              type="button"
              className={`transition duration-150 ease-in-out flex items-center justify-center px-3 py-1 rounded-md text-xs md:text-sm font-medium 
                ${
                  selectedCategoryIds.includes(category.id)
                    ? 'bg-primary text-white dark:bg-dark-primary border border-primary dark:border-dark-primary'
                    : 'bg-light-background dark:bg-dark-layer text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-600'
                } hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-text dark:hover:text-neutral-200 cursor-pointer`}
            >
              {category.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default CategorySelect;
