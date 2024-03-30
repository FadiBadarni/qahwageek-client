import React from 'react';
import { EventCategory } from 'models/event';

interface FilterSortOptionsProps {
  sort: string;
  selectedCategoryId: number | undefined;
  categories: EventCategory[];
  onSortChange: (newSort: string) => void;
  onCategoryChange: (newCategoryId: number | undefined) => void;
}

const FilterSortOptions: React.FC<FilterSortOptionsProps> = ({
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
          htmlFor="sortSelect"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 "
        >
          ترتيب حسب
        </label>
        <div className="relative">
          <select
            id="sortSelect"
            className="appearance-none pr-8 pl-4 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2 w-full"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="startDateTime,asc">التاريخ (تصاعدي)</option>
            <option value="startDateTime,desc">التاريخ (تنازلي)</option>
            <option value="filter:today">اليوم</option>
            <option value="filter:tomorrow">غدًا</option>
            <option value="filter:thisWeek">هذا الأسبوع</option>
          </select>
        </div>
      </div>

      <div className="flex-1 max-w-44">
        <label
          htmlFor="categorySelect"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          فلترة حسب الفئة
        </label>
        <div className="relative">
          <select
            id="categorySelect"
            className="appearance-none pr-8 pl-4 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2 w-full"
            value={selectedCategoryId}
            onChange={(e) =>
              onCategoryChange(Number(e.target.value) || undefined)
            }
          >
            <option value="">كل الفئات</option>
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

export default FilterSortOptions;
