const CategoryPageSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-center items-start flex-wrap">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="overflow-hidden shadow-lg bg-light-layer dark:bg-dark-layer rounded-lg">
              <div className="h-48 bg-neutral-200 dark:bg-neutral-700 rounded-t-lg"></div>

              <div className="p-4">
                <div className="h-6 bg-neutral-200 dark:bg-neutral-600 rounded"></div>

                <div className="mt-2 flex space-x-2 overflow-hidden">
                  <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-600 rounded-full ml-2"></div>
                  <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-600 rounded-full ml-2"></div>
                  <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-600 rounded-full ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPageSkeleton;
