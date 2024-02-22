interface PostsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PostsPagination: React.FC<PostsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 mx-1 text-sm text-neutral-700 bg-neutral-200 disabled:text-neutral-400 disabled:bg-neutral-300"
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          className={`px-4 py-2 mx-1 text-sm ${
            currentPage === page
              ? 'bg-brand-500 text-white'
              : 'bg-neutral-200 text-neutral-700'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="px-4 py-2 mx-1 text-sm text-neutral-700 bg-neutral-200 disabled:text-neutral-400 disabled:bg-neutral-300"
      >
        Next
      </button>
    </div>
  );
};
