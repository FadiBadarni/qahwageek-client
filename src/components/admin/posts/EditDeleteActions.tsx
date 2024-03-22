import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EditDeleteActionsProps {
  postId: number;
  onDelete: (postId: number) => void;
  onEdit: (postId: number) => void;
  isLoading: boolean;
  isGlobalUpdating: boolean;
}

const EditDeleteActions: React.FC<EditDeleteActionsProps> = ({
  postId,
  onDelete,
  onEdit,
  isLoading,
  isGlobalUpdating,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onDelete(postId)}
        disabled={isGlobalUpdating || isLoading}
        className="flex items-center justify-center text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
      >
        <TrashIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        onClick={() => onEdit(postId)}
        disabled={isGlobalUpdating || isLoading}
        className="flex items-center justify-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
      >
        <PencilIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default EditDeleteActions;
