import React from 'react';

const FeaturedPostSkeleton: React.FC = () => (
  <div className="p-4 bg-light-layer dark:bg-dark-layer transition duration-300 ease-in-out rounded-lg overflow-hidden shadow-lg animate-pulse">
    <div className="relative">
      <div className="bg-neutral-300 h-48 w-full rounded-lg"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
        <div className="h-6 bg-neutral-400 rounded-md w-3/4"></div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-neutral-400 rounded-full ml-2"></div>
            <div className="h-4 bg-neutral-400 rounded w-24"></div>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 bg-neutral-400 rounded-full ml-2"></div>
            <div className="h-4 bg-neutral-400 rounded w-20"></div>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 bg-neutral-400 rounded-full ml-2"></div>
            <div className="h-4 bg-neutral-400 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default FeaturedPostSkeleton;
