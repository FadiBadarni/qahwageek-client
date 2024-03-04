import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdAddCircleOutline, MdEdit, MdDelete } from 'react-icons/md';
import { fetchAllCategories } from 'store/post/postActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { RootState } from 'store/store';

const CategoriesManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.categories.data);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white dark:bg-dark-background">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
        إدارة التصنيفات
      </h1>
      <button
        type="button"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-light-primary dark:bg-dark-primary hover:bg-light-primary/90 dark:hover:bg-dark-primary/90"
        onClick={() => {}}
      >
        <MdAddCircleOutline className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        إضافة تصنيف
      </button>
      <div className="mt-5 space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center p-4 rounded-lg shadow bg-light-layer dark:bg-dark-layer"
          >
            <span className="text-neutral-800 dark:text-neutral-200">
              {category.name}
            </span>
            <div>
              <MdEdit
                className="inline h-6 w-6 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
                onClick={() => {}}
              />
              <MdDelete className="inline h-6 w-6 ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesManagement;
