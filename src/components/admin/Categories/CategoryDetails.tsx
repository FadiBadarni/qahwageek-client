import React from 'react';
import { Category } from 'models/post';

interface CategoryDetailsProps {
  category: Category;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category }) => {
  const isSubCategory = Boolean(category.parentId);

  const renderSubCategories = (subCategories: Category[] | undefined) => {
    if (!subCategories || subCategories.length === 0) {
      return <p>لا توجد تصنيفات فرعية.</p>;
    }
    return (
      <ul className="list-disc pl-5 space-y-1">
        {subCategories.map((sub) => (
          <li
            key={sub.id}
            className="text-sm text-neutral-600 dark:text-neutral-400"
          >
            {sub.name} - {sub.description}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 bg-light-layer dark:bg-dark-layer rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        {category.name}
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        {category.description}
      </p>
      {isSubCategory && (
        <p className="text-neutral-500 dark:text-neutral-300 italic mb-4">
          هذا تصنيف فرعي.
        </p>
      )}
      <div>
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          التصنيفات الفرعية:
        </h3>
        {renderSubCategories(category.subCategories)}
      </div>
    </div>
  );
};

export default CategoryDetails;
