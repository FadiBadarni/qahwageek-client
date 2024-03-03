import React from 'react';
import { UserIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const PostItemSkeleton: React.FC = () => (
  <div className="flex items-center p-3 mb-2 border-b border-neutral-300 last:border-b-0 dark:border-dark-500 bg-light-layer dark:bg-dark-layer rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-neutral-200 dark:hover:bg-dark-600 animate-pulse">
    <div className="flex-grow flex flex-col justify-between h-full">
      <div className="flex flex-col justify-start items-start">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md w-3/4 mb-2"></div>
        <div className="flex flex-wrap gap-2 w-full">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-16"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-16"></div>
        </div>
      </div>
      <div className="flex justify-between items-center text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-4 h-12">
        <div className="flex flex-col sm:flex-row items-center">
          <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:ml-2 text-neutral-300 dark:text-neutral-600" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-24"></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:ml-2 text-neutral-300 dark:text-neutral-600" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-24"></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:ml-2 text-neutral-300 dark:text-neutral-600" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md w-16"></div>
        </div>
      </div>
    </div>
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg mr-4 sm:mr-4"></div>
  </div>
);

export default PostItemSkeleton;
