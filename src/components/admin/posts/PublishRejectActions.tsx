import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PublishRejectActionsProps {
  postId: number;
  onPublish: (postId: number) => void;
  onReject: (postId: number) => void;
  isLoading: boolean;
  isGlobalUpdating: boolean;
}

const PublishRejectActions: React.FC<PublishRejectActionsProps> = ({
  postId,
  onPublish,
  onReject,
  isLoading,
  isGlobalUpdating,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPublish(postId)}
        disabled={isGlobalUpdating || isLoading}
        className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
      >
        <CheckIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => onReject(postId)}
        disabled={isGlobalUpdating || isLoading}
        className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
      >
        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default PublishRejectActions;
