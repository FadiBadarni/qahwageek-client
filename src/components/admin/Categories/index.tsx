import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { RootState } from 'store/store';
import { CategoryItem } from './CategoryItem';
import { Category } from 'models/post';
import CategoryDetails from './CategoryDetails';
import { fetchAllCategories } from 'store/category/categoryActions';
import AddCategoryDialog from './AddCategoryDialog';

const CategoriesManagement: React.FC = () => {
  const dispatch = useAppDispatch();

  const categories = useSelector((state: RootState) => state.categories.data);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white dark:bg-dark-background">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 text-center mb-6">
        إدارة التصنيفات
      </h1>
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 space-y-4 pl-4 text-right">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-neutral-600 dark:text-neutral-200 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-border dark:focus:ring-dark-border bg-light-layer dark:bg-dark-layer hover:bg-light-input dark:hover:bg-dark-input"
            aria-label="إضافة تصنيف جديد"
            onClick={openAddModal}
          >
            <MdAddCircleOutline className="ml-2 h-5 w-5" aria-hidden="true" />
            إضافة تصنيف
          </button>

          <div className="mt-5 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {categories.map((category) => (
              <div
                onClick={() => handleCategorySelect(category)}
                key={category.id}
                className="cursor-pointer"
                role="button"
                aria-pressed={
                  selectedCategory?.id === category.id ? 'true' : 'false'
                }
              >
                <CategoryItem
                  category={category}
                  selectedCategory={selectedCategory}
                />
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
      <AddCategoryDialog isOpen={isAddModalOpen} onClose={closeAddModal} />
    </div>
  );
};

export default CategoriesManagement;
