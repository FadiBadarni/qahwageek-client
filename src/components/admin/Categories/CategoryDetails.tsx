import React from 'react';
import { Category } from 'models/post';
import SubCategoriesDetails from './SubCategoriesDetails';

interface CategoryDetailsProps {
  category: Category;
}
const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category }) => {
  const isSubCategory = Boolean(category.parentId);

  return (
    <div className="p-6 bg-light-layer dark:bg-dark-layer rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 text-right">
        {category.name}
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-right">
        {category.description}
      </p>
      {isSubCategory && (
        <p className="text-neutral-500 dark:text-neutral-300 italic mb-6 text-right">
          هذا تصنيف فرعي.
        </p>
      )}
      <div>
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4 text-right">
          التصنيفات الفرعية:
        </h3>
        <SubCategoriesDetails subCategories={category.subCategories} />
      </div>
    </div>
  );
};

export default CategoryDetails;
