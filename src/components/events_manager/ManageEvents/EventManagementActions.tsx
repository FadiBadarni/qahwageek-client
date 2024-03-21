import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { MeetupEvent } from 'models/event';

interface EventManagementActionsProps {
  event: MeetupEvent;
  onDelete: (eventId: number) => void;
  onEdit: (eventId: number) => void;
  isLoading: boolean;
  isGlobalUpdating: boolean;
}

const EventManagementActions: React.FC<EventManagementActionsProps> = ({
  event,
  onDelete,
  onEdit,
  isLoading,
  isGlobalUpdating,
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500"
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
      ) : (
        <>
          <button
            onClick={() => onEdit(event.id)}
            disabled={isGlobalUpdating}
            className="flex items-center justify-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
            title="تعديل الحدث"
          >
            <PencilIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            تعديل
          </button>
          <button
            onClick={() => onDelete(event.id)}
            disabled={isGlobalUpdating}
            className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
            title="ازالة الحدث"
          >
            <TrashIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            ازالة
          </button>
        </>
      )}
    </div>
  );
};

export default EventManagementActions;
