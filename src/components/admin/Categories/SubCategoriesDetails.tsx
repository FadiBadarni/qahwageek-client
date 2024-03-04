import React from 'react';
import { Category } from 'models/post';

interface SubCategoriesProps {
  subCategories: Category[] | undefined;
}

const SubCategoriesDetails: React.FC<SubCategoriesProps> = ({
  subCategories,
}) => {
  if (!subCategories || subCategories.length === 0) {
    return <p className="text-right">لا توجد تصنيفات فرعية.</p>;
  }

  return (
    <div className="space-y-4">
      {subCategories.map((sub, index) => (
        <div
          key={sub.id}
          className="flex flex-col space-y-2 text-sm text-neutral-600 dark:text-neutral-400"
        >
          <div>
            <label
              htmlFor={`subCategoryName-${sub.id}`}
              className="block text-right mb-2"
            >
              اسم التصنيف الفرعي:
            </label>
            <input
              type="text"
              id={`subCategoryName-${sub.id}`}
              defaultValue={sub.name}
              className="form-input block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor={`subCategoryDescription-${sub.id}`}
              className="block text-right mb-2"
            >
              الوصف:
            </label>
            <textarea
              id={`subCategoryDescription-${sub.id}`}
              defaultValue={sub.description}
              className="form-textarea block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
              rows={3}
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubCategoriesDetails;
