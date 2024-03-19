import React from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { MeetupEvent } from 'models/event';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface EventCardProps {
  event: MeetupEvent;
  onViewDetails: (event: MeetupEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-dark-layer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl relative group">
      {event.onlineEvent && (
        <div className="absolute right-2 top-2 z-20 flex items-center justify-center h-8 w-8 bg-brand-500 text-white rounded-full">
          <GlobeAltIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover group-hover:opacity-75 transition-opacity duration-300 ease-in-out"
          src={event.imageUrl || '/default-event-image.jpg'}
          alt={event.title}
        />
      </div>
      <div className="flex-1 p-6 space-y-3 flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-brand-400 dark:text-accent-400">
            {event.category.name}
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <p className="text-base text-gray-500 dark:text-gray-400 line-clamp-3">
            {event.description.length > 100
              ? `${event.description.substring(0, 100)}...`
              : event.description}
          </p>
        </div>
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={event.dateTime}>
              {format(parseISO(event.dateTime), 'd MMMM yyyy', {
                locale: ar,
              })}
            </time>
            {!event.onlineEvent && event.location && (
              <>
                <span aria-hidden="true"> · </span>
                <span>{event.location}</span>
              </>
            )}
          </div>
          <button
            className="mt-4 w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out"
            onClick={() => onViewDetails(event)}
          >
            المزيد من التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
