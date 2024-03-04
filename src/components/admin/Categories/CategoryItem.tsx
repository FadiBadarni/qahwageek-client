import { Category } from 'models/post';
import React from 'react';
import { MdDelete, MdSubdirectoryArrowRight } from 'react-icons/md';

interface CategoryItemProps {
  category: Category;
  selectedCategory: Category | null;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selectedCategory,
}) => {
  const isSubCategory = Boolean(category.parentId);
  const isSelected = selectedCategory?.id === category.id;
  return (
    <div>
      <div
        className={`flex justify-between items-center p-4 rounded-lg shadow bg-light-layer dark:bg-dark-layer ${
          isSubCategory ? 'mr-8' : ''
        } ${
          isSelected ? 'bg-light-primary dark:bg-dark-primary text-white' : ''
        } transition-colors duration-300 ease-in-out`}
      >
        {isSubCategory && (
          <MdSubdirectoryArrowRight className="text-neutral-600 dark:text-neutral-100 ml-2" />
        )}
        <span className="flex-grow">{category.name}</span>
        <div>
          <MdDelete className="inline h-6 w-6 mr-4 text-light-text dark:text-dark-text hover:text-red-800 dark:hover:text-red-600 cursor-pointer" />
        </div>
      </div>
      {category.subCategories && category.subCategories.length > 0 && (
        <div className="mt-4">
          {category.subCategories.map((subCategory) => (
            <CategoryItem
              key={subCategory.id}
              category={subCategory}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};
