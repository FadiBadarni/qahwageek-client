import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updatePostStatus } from 'store/post/postActions';
import { PostStatus } from 'models/post';

interface PublishRejectActionsProps {
  postId: number;
  isLoading: boolean;
  isGlobalUpdating: boolean;
}

const PublishRejectActions: React.FC<PublishRejectActionsProps> = ({
  postId,
  isLoading,
  isGlobalUpdating,
}) => {
  const dispatch = useAppDispatch();

  const handlePublish = () => {
    dispatch(updatePostStatus({ postId, status: PostStatus.Published }));
  };

  const handleReject = () => {
    dispatch(updatePostStatus({ postId, status: PostStatus.Rejected }));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={handleReject}
        disabled={isGlobalUpdating || isLoading}
        className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
        data-tooltip-content="رفض"
        data-tooltip-id={`reject-tooltip-${postId}`}
      >
        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      <Tooltip id={`reject-tooltip-${postId}`} />

      <button
        onClick={handlePublish}
        disabled={isGlobalUpdating || isLoading}
        className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
        data-tooltip-content="نشر"
        data-tooltip-id={`publish-tooltip-${postId}`}
      >
        <CheckIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      <Tooltip id={`publish-tooltip-${postId}`} />
    </div>
  );
};

export default PublishRejectActions;
