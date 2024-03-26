import { Category } from 'models/post';
import React from 'react';

interface PostFilterSortOptionsProps {
  sort: string;
  selectedCategoryId: number | undefined;
  categories: Category[];
  onSortChange: (newSort: string) => void;
  onCategoryChange: (newCategoryId: number | undefined) => void;
}

const PostFilterSortOptions: React.FC<PostFilterSortOptionsProps> = ({
  sort,
  selectedCategoryId,
  categories,
  onSortChange,
  onCategoryChange,
}) => {
  return (
    <div className="mb-4 flex flex-row gap-4 items-start">
      <div className="flex-1 max-w-44">
        <label
          htmlFor="postSortSelect"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          ترتيب حسب
        </label>
        <div className="relative">
          <select
            id="postSortSelect"
            className="appearance-none pr-8 pl-4 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2 w-full"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="createdAt,desc">الأحدث أولاً</option>
            <option value="createdAt,asc">الأقدم أولاً</option>
          </select>
        </div>
      </div>

      <div className="flex-1 max-w-44">
        <label
          htmlFor="postCategorySelect"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          فلترة حسب الفئة
        </label>
        <div className="relative">
          <select
            id="postCategorySelect"
            className="appearance-none pr-8 pl-4 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2 w-full"
            value={selectedCategoryId}
            onChange={(e) =>
              onCategoryChange(Number(e.target.value) || undefined)
            }
          >
            <option value="">جميع الفئات</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostFilterSortOptions;
