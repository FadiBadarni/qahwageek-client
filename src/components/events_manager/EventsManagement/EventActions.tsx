import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EventActionsProps {
  eventId: number;
  onPublish: (eventId: number) => void;
  onReject: (eventId: number) => void;
}

const EventActions: React.FC<EventActionsProps> = ({
  eventId,
  onPublish,
  onReject,
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={() => onPublish(eventId)}
        className="flex items-center justify-center text-green-600 hover:text-green-800 dark:hover:text-green-400"
      >
        <CheckIcon className="w-5 h-5 ml-1" aria-hidden="true" />
        نشر
      </button>
      <button
        onClick={() => onReject(eventId)}
        className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
      >
        <XMarkIcon className="w-5 h-5 ml-1" aria-hidden="true" />
        رفض
      </button>
    </div>
  );
};

export default EventActions;
