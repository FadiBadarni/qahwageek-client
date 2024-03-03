import React from 'react';
import { CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const UpcomingEventSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4 p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="bg-light-layer dark:bg-dark-layer rounded-lg shadow p-4 relative transition duration-300 ease-in-out"
        >
          <div className="relative block overflow-hidden">
            <div className="bg-neutral-300 dark:bg-neutral-700 w-full h-48 object-cover rounded-md mb-2"></div>
            <div className="absolute top-0 left-0 bg-brand-500 text-white text-sm font-semibold px-2 py-1 rounded-md opacity-0">
              أونلاين
              <GlobeAltIcon className="h-4 w-4 inline-block ml-1" />
            </div>
          </div>
          <div className="h-6 bg-neutral-300 dark:bg-neutral-700 rounded-md w-3/4 mb-2"></div>
          <div className="flex items-center space-x-reverse space-x-2 mb-2">
            <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 opacity-0" />
            <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingEventSkeleton;
