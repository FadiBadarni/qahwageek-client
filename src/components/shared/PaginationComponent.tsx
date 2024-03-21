import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 5,
}) => {
  const getPaginationRange = (): (number | string)[] => {
    let range: (number | string)[] = [];
    const startPage = Math.max(0, currentPage - Math.floor(itemsPerPage / 2));
    let endPage = Math.min(totalPages - 1, startPage + itemsPerPage - 1);

    if (startPage > 0) range.push('...');
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    if (endPage < totalPages - 1) range.push('...');

    return range;
  };

  const paginationRange = getPaginationRange();

  const buttonStyle = (isActive: boolean, isDisabled: boolean) =>
    isDisabled
      ? 'bg-neutral-400 text-neutral-500 border-neutral-400 cursor-not-allowed'
      : isActive
      ? 'bg-brand-500 text-white border-brand-500 hover:bg-brand-400'
      : 'bg-neutral-200 text-neutral-700 border-neutral-300 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-600';

  return (
    <nav className="border-t border-neutral-200 dark:border-neutral-700 px-4 py-3 flex items-center justify-between sm:justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`ml-2 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${buttonStyle(
          false,
          currentPage === 0
        )} rounded-md`}
      >
        <ArrowLongRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
        السابق
      </button>
      <div className="flex">
        {paginationRange.map((page, index) =>
          typeof page === 'string' ? (
            <span key={index} className="px-4 py-2 text-sm text-neutral-700">
              {page}
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`mx-1 px-4 py-2 text-sm font-medium ${buttonStyle(
                currentPage === page,
                false
              )} rounded-md`}
            >
              {page + 1}
            </button>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className={`mr-2 inline-flex items-center px-4 py-2 border text-sm font-medium ${buttonStyle(
          false,
          currentPage >= totalPages - 1
        )} rounded-md`}
      >
        التالي
        <ArrowLongLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
};
