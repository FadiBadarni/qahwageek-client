import React from 'react';

const CategorySkeleton: React.FC = () => (
  <div className="animate-pulse flex flex-wrap gap-2 p-4">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="h-8 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-md"
      ></div>
    ))}
  </div>
);

export default CategorySkeleton;
