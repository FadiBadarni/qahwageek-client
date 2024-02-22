import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchInput: React.FC = () => {
  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        البحث
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pr-10 pl-3 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 dark:bg-gray-700 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus:text-gray-100 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="البحث"
          type="search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
