import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MeetupEvent } from 'models/event';
import LoadingSpinner from 'utils/LoadingSpinner';

interface EventStatusActionsProps {
  event: MeetupEvent;
  onPublish: (eventId: number) => void;
  onReject: (eventId: number) => void;
  isLoading: boolean;
  isGlobalUpdating: boolean;
}

const EventStatusActions: React.FC<EventStatusActionsProps> = ({
  event,
  onPublish,
  onReject,
  isLoading,
  isGlobalUpdating,
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : event.status === 'PENDING' ? (
        <>
          <button
            onClick={() => onPublish(event.id)}
            disabled={isGlobalUpdating && !isLoading}
            className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
          >
            <CheckIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            نشر
          </button>
          <button
            onClick={() => onReject(event.id)}
            disabled={isGlobalUpdating && !isLoading}
            className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
          >
            <XMarkIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            رفض
          </button>
        </>
      ) : event.status === 'PUBLISHED' ? (
        <>
          <button
            onClick={() => onReject(event.id)}
            disabled={isGlobalUpdating && !isLoading}
            className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
          >
            <XMarkIcon className="w-5 h-5 ml-1" aria-hidden="true" />
            رفض
          </button>
        </>
      ) : event.status === 'REJECTED' ? (
        <button
          onClick={() => onPublish(event.id)}
          disabled={isGlobalUpdating && !isLoading}
          className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
        >
          <CheckIcon className="w-5 h-5 ml-1" aria-hidden="true" />
          نشر
        </button>
      ) : null}
    </div>
  );
};

export default EventStatusActions;
