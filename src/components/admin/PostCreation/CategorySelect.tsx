import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from 'utils/tailwindUtil';
import { Category } from 'models/post';

interface CategorySelectProps {
  categories: Category[];
  selectedCategoryIds: number[];
  onCategoryChange: (selectedCategoryIds: number[]) => void;
}

export default function CategorySelect({
  categories,
  selectedCategoryIds,
  onCategoryChange,
}: CategorySelectProps) {
  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(selectedCategoryIds);

  const handleSelectCategory = (categoryId: number) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full ">
      <div>
        <Menu.Button className="inline-flex w-full justify-between rounded-md border border-neutral-300 bg-light-100 px-4 py-2 text-sm font-medium text-neutral-700 dark:bg-dark-700 dark:text-neutral-200 shadow-sm hover:bg-light-200 dark:hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-brand-500">
          اختر تصنيفات
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ">
            {categories.map((category) => (
              <Menu.Item key={category.id}>
                {({ active }) => (
                  <button
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'w-full text-right block px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={() => handleSelectCategory(category.id)}
                  >
                    {category.name}{' '}
                    {selectedCategories.includes(category.id) && '✓'}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
