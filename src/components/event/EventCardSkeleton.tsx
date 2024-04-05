import React from 'react';
import {
  CalendarIcon,
  GlobeAltIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const EventCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-dark-layer transition duration-300 ease-in-out relative"
        >
          <div className="bg-neutral-300 dark:bg-neutral-700 h-40 w-full"></div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="h-6 bg-neutral-300 dark:bg-neutral-700 rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-5/6 mb-4"></div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-gray-500 dark:text-gray-400 ml-2">
                  <CalendarIcon className="h-5 w-5 rounded" />
                  <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-24 mr-2"></div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <GlobeAltIcon className="h-5 w-5 rounded" />
                  <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-16 mr-2"></div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MapPinIcon className="h-5 w-5 rounded" />
                  <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-16 mr-2"></div>
                </div>
              </div>
            </div>
            <div className="bg-brand-500 h-10 rounded-md mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default EventCardSkeleton;
