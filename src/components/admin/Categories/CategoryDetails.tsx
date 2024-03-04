import React, { useState } from 'react';
import { Category } from 'models/post';
import SubCategoriesDetails from './SubCategoriesDetails';

interface CategoryDetailsProps {
  category: Category;
}
const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category }) => {
  const isSubCategory = Boolean(category.parentId);

  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || '');

  return (
    <div className="p-6 bg-light-layer dark:bg-dark-layer rounded-xl shadow-xl">
      <div className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 text-center w-full rounded-md shadow-sm bg-light-input dark:bg-dark-input"
          placeholder="اسم التصنيف"
        />
      </div>
      <div className="mb-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-neutral-600 dark:text-neutral-400 text-right w-full rounded-md shadow-sm bg-light-input dark:bg-dark-input"
          placeholder="وصف التصنيف"
        />
      </div>
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
