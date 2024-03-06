import React, { useEffect, useState } from 'react';
import { Category } from 'models/post';
import SubCategoriesDetails from './SubCategoriesDetails';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateCategory } from 'store/category/categoryActions';

interface CategoryDetailsProps {
  category: Category;
}
const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category }) => {
  const dispatch = useAppDispatch();
  const isSubCategory = Boolean(category.parentId);

  const [categoryDetails, setCategoryDetails] = useState({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    subCategories: category.subCategories || [],
  });

  useEffect(() => {
    setCategoryDetails({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      subCategories: category.subCategories || [],
    });
  }, [category]);

  const handleUpdateCategoryDetails = (key: string, value: any) => {
    setCategoryDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleUpdateSubCategories = (updatedSubCategories: Category[]) => {
    handleUpdateCategoryDetails('subCategories', updatedSubCategories);
  };

  const handleSaveChanges = async () => {
    dispatch(updateCategory(categoryDetails));
  };

  return (
    <div className="p-6 bg-light-layer dark:bg-dark-layer rounded-xl shadow-xl">
      <div className="mb-4">
        <input
          type="text"
          value={categoryDetails.name}
          onChange={(e) => handleUpdateCategoryDetails('name', e.target.value)}
          className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 text-center w-full rounded-md shadow-sm bg-light-input dark:bg-dark-input"
          placeholder="اسم التصنيف"
        />
      </div>
      <div className="mb-2">
        <textarea
          value={categoryDetails.description}
          onChange={(e) =>
            handleUpdateCategoryDetails('description', e.target.value)
          }
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
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2 text-center">
          التصنيفات الفرعية
        </h3>
        <SubCategoriesDetails
          subCategories={categoryDetails.subCategories}
          onUpdate={handleUpdateSubCategories}
        />
      </div>
      <div className="flex flex-col items-center mt-6">
        <button
          onClick={handleSaveChanges}
          className="inline-flex justify-center rounded-md border border-transparent bg-brand-500 dark:bg-brand-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-brand-600 dark:hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-brand-400 transition-colors duration-150 ease-in-out w-full text-center"
        >
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
};

export default CategoryDetails;
