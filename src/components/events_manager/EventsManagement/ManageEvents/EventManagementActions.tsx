import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { MeetupEvent } from 'models/event';

interface EventManagementActionsProps {
  event: MeetupEvent;
  onDelete: (eventId: number) => void;
}

const EventManagementActions: React.FC<EventManagementActionsProps> = ({
  event,
  onDelete,
}) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={() => onDelete(event.id)}
        className="flex items-center justify-center text-red-600 hover:text-red-800 dark:hover:text-red-400"
        title="Delete Event"
      >
        <TrashIcon className="w-5 h-5 ml-1" aria-hidden="true" />
        ازالة
      </button>
    </div>
  );
};

export default EventManagementActions;
