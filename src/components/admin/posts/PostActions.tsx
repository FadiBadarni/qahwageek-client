import React from 'react';
import {
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Post, PostStatus } from 'models/post';

interface PostActionsProps {
  post: Post;
  onPublish: (postId: number) => void;
  onReject: (postId: number) => void;
  onDelete: (postId: number) => void;
  onEdit: (postId: number) => void;
  isLoading: boolean;
  isGlobalUpdating: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  post,
  onPublish,
  onReject,
  onDelete,
  onEdit,
  isLoading,
  isGlobalUpdating,
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.009 8.009 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : post.status === PostStatus.Pending ||
        post.status === PostStatus.Rejected ? (
        <>
          {post.status === PostStatus.Pending && (
            <button
              onClick={() => onPublish(post.id)}
              disabled={isGlobalUpdating && !isLoading}
              className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
            >
              <CheckIcon className="w-5 h-5 ml-1" aria-hidden="true" />
              نشر
            </button>
          )}
          <button
            onClick={() => onReject(post.id)}
            disabled={isGlobalUpdating && !isLoading}
            className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
          >
            <XMarkIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            رفض
          </button>
          <button
            onClick={() => onDelete(post.id)}
            disabled={isGlobalUpdating && !isLoading}
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
          >
            <TrashIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            حذف
          </button>
          <button
            onClick={() => onEdit(post.id)}
            disabled={isGlobalUpdating && !isLoading}
            className="flex items-center justify-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
          >
            <PencilIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            تعديل
          </button>
        </>
      ) : (
        post.status === PostStatus.Published && (
          <>
            <button
              onClick={() => onReject(post.id)}
              disabled={isGlobalUpdating && !isLoading}
              className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
            >
              <XMarkIcon className="w-5 h-5 ml-1" aria-hidden="true" />
              رفض
            </button>
            <button
              onClick={() => onDelete(post.id)}
              disabled={isGlobalUpdating && !isLoading}
              className="flex items-center justify-center text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
            >
              <TrashIcon className="w-5 h-5 ml-1" aria-hidden="true" />
              حذف
            </button>
            <button
              onClick={() => onEdit(post.id)}
              disabled={isGlobalUpdating && !isLoading}
              className="flex items-center justify-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
            >
              <PencilIcon className="w-5 h-5 ml-1" aria-hidden="true" />
              تعديل
            </button>
          </>
        )
      )}
    </div>
  );
};

export default PostActions;
