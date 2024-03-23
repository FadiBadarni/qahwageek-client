import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { Post, PostStatus } from 'models/post';
import LoadingSpinner from 'utils/LoadingSpinner';

interface PublishRejectActionsProps {
  post: Post;
  isLoading: boolean;
  isGlobalUpdating: boolean;
  onPublish: (postId: number) => void;
  onReject: (postId: number) => void;
}

const PublishRejectActions: React.FC<PublishRejectActionsProps> = ({
  post,
  isLoading,
  isGlobalUpdating,
  onPublish,
  onReject,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : post.status === PostStatus.Pending ? (
        <>
          <button
            onClick={() => onPublish(post.id)}
            disabled={isGlobalUpdating || isLoading}
            className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
            data-tooltip-content="نشر"
            data-tooltip-id={`publish-tooltip-${post.id}`}
          >
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <Tooltip id={`publish-tooltip-${post.id}`} />
          <button
            onClick={() => onReject(post.id)}
            disabled={isGlobalUpdating || isLoading}
            className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
            data-tooltip-content="رفض"
            data-tooltip-id={`reject-tooltip-${post.id}`}
          >
            <XMarkIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <Tooltip id={`reject-tooltip-${post.id}`} />
        </>
      ) : post.status === PostStatus.Published ? (
        <>
          <button
            onClick={() => onReject(post.id)}
            disabled={isGlobalUpdating || isLoading}
            className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
            data-tooltip-content="رفض"
            data-tooltip-id={`reject-tooltip-${post.id}`}
          >
            <XMarkIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <Tooltip id={`reject-tooltip-${post.id}`} />
        </>
      ) : post.status === PostStatus.Rejected ? (
        <>
          <button
            onClick={() => onPublish(post.id)}
            disabled={isGlobalUpdating || isLoading}
            className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
            data-tooltip-content="نشر"
            data-tooltip-id={`publish-tooltip-${post.id}`}
          >
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <Tooltip id={`publish-tooltip-${post.id}`} />
        </>
      ) : null}
    </div>
  );
};

export default PublishRejectActions;
