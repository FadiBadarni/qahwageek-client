import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as FilledStarIcon } from '@heroicons/react/24/solid';
import { Tooltip } from 'react-tooltip';
import LoadingSpinner from 'utils/LoadingSpinner';
import { Post } from 'models/post';

interface EditDeleteActionsProps {
  post: Post;
  onDelete: (postId: number) => void;
  onEdit: (postId: number) => void;
  onFeature: (postId: number) => void;
  isLoading: boolean;
  isGlobalUpdating: boolean;
}

const EditDeleteActions: React.FC<EditDeleteActionsProps> = ({
  post,
  onDelete,
  onEdit,
  onFeature,
  isLoading,
  isGlobalUpdating,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <button
            onClick={() => onEdit(post.id)}
            disabled={isGlobalUpdating || isLoading}
            className="flex items-center justify-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
            data-tooltip-content="تعديل"
            data-tooltip-id={`edit-tooltip-${post.id}`}
          >
            <PencilIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <Tooltip id={`edit-tooltip-${post.id}`} />

          <button
            onClick={() => onDelete(post.id)}
            disabled={isGlobalUpdating || isLoading}
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
            data-tooltip-content="حذف"
            data-tooltip-id={`delete-tooltip-${post.id}`}
          >
            <TrashIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <Tooltip id={`delete-tooltip-${post.id}`} />

          <button
            onClick={() => onFeature(post.id)}
            disabled={isGlobalUpdating || isLoading}
            className={`flex items-center justify-center ${
              post.featured
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-gray-500'
            } dark:hover:text-yellow-400`}
            data-tooltip-content={post.featured ? 'إلغاء التمييز' : 'تمييز'}
            data-tooltip-id={`feature-tooltip-${post.id}`}
          >
            {post.featured ? (
              <FilledStarIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <FilledStarIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
          <Tooltip id={`feature-tooltip-${post.id}`} />
        </>
      )}
    </div>
  );
};

export default EditDeleteActions;
