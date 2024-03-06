import React, { useEffect, useState } from 'react';
import { Category } from 'models/post';

interface SubCategoriesProps {
  subCategories: Category[] | undefined;
  onUpdate: (updatedSubCategories: Category[]) => void;
}

const SubCategoriesDetails: React.FC<SubCategoriesProps> = ({
  subCategories,
  onUpdate,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [editableSubCategories, setEditableSubCategories] = useState<
    Category[]
  >([]);

  useEffect(() => {
    setEditableSubCategories([...(subCategories || [])]);
  }, [subCategories]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleNameChange = (id: number, newName: string) => {
    const updatedSubCategories = editableSubCategories.map((subCategory) =>
      subCategory.id === id ? { ...subCategory, name: newName } : subCategory
    );
    setEditableSubCategories(updatedSubCategories);
    onUpdate(updatedSubCategories);
  };

  const handleDescriptionChange = (id: number, newDescription: string) => {
    const updatedSubCategories = editableSubCategories.map((subCategory) =>
      subCategory.id === id
        ? { ...subCategory, description: newDescription }
        : subCategory
    );
    setEditableSubCategories(updatedSubCategories);
    onUpdate(updatedSubCategories);
  };

  const handleSlugChange = (id: number, newSlug: string) => {
    const updatedSubCategories = editableSubCategories.map((subCategory) =>
      subCategory.id === id ? { ...subCategory, slug: newSlug } : subCategory
    );
    setEditableSubCategories(updatedSubCategories);
    onUpdate(updatedSubCategories);
  };

  const currentSubCategory = editableSubCategories[currentPage];

  if (!editableSubCategories.length) {
    return <p className="text-right">لا توجد تصنيفات فرعية.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
          <label className="block text-neutral-600 dark:text-neutral-400 text-sm font-medium mb-1">
            اسم التصنيف الفرعي
          </label>
          <input
            type="text"
            value={currentSubCategory.name}
            onChange={(e) =>
              handleNameChange(currentSubCategory.id, e.target.value)
            }
            className="form-input mt-1 block w-full rounded-md shadow-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block text-neutral-600 dark:text-neutral-400 text-sm font-medium mb-1">
            المعرف
          </label>
          <input
            type="text"
            value={currentSubCategory.slug}
            onChange={(e) =>
              handleSlugChange(currentSubCategory.id, e.target.value)
            }
            className="form-input mt-1 block w-full rounded-md shadow-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
            dir="ltr"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
        <label className="block text-neutral-600 dark:text-neutral-400 text-sm font-medium mb-1">
          وصف التصنيف الفرعي
        </label>
        <textarea
          value={currentSubCategory.description}
          onChange={(e) =>
            handleDescriptionChange(currentSubCategory.id, e.target.value)
          }
          className="form-textarea mt-1 block w-full rounded-md shadow-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
          rows={3}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
          className="disabled:opacity-50"
        >
          السابق
        </button>
        <span>
          {editableSubCategories.length} / {currentPage + 1}
        </span>
        <button
          disabled={currentPage >= editableSubCategories.length - 1}
          onClick={() => handlePageChange(currentPage + 1)}
          className="disabled:opacity-50"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default SubCategoriesDetails;
