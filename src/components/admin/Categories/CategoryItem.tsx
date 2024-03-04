import { Category } from 'models/post';
import React from 'react';
import { MdEdit, MdDelete, MdSubdirectoryArrowRight } from 'react-icons/md';

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const isSubCategory = Boolean(category.parentId);

  return (
    <div>
      <div
        className={`flex justify-between items-center p-4 rounded-lg shadow ${
          isSubCategory
            ? 'bg-light-border dark:bg-dark-border mr-4'
            : 'bg-light-layer dark:bg-dark-layer'
        } transition-colors duration-300 ease-in-out`}
      >
        {isSubCategory && (
          <MdSubdirectoryArrowRight className="text-neutral-400 dark:text-neutral-400 ml-2" />
        )}
        <span className="text-neutral-800 dark:text-neutral-200 flex-grow">
          {category.name}
        </span>
        <div>
          <MdEdit
            className="inline h-6 w-6 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
            onClick={() => {}}
          />
          <MdDelete className="inline h-6 w-6 mr-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 cursor-pointer" />
        </div>
      </div>
      {category.subCategories && category.subCategories.length > 0 && (
        <div className="mt-4">
          {category.subCategories.map((subCategory) => (
            <CategoryItem key={subCategory.id} category={subCategory} />
          ))}
        </div>
      )}
    </div>
  );
};
