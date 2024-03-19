import React from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { MeetupEvent } from 'models/event';

interface EventCardProps {
  event: MeetupEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-dark-layer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={event.imageUrl || '/default-event-image.jpg'}
          alt={event.title}
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-brand-400 dark:text-accent-400">
            {event.category.name}
          </p>
          <a href={event.eventLink} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {event.title}
            </p>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              {event.description.length > 100
                ? `${event.description.substring(0, 100)}...`
                : event.description}
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={event.dateTime}>
              {format(parseISO(event.dateTime), 'd MMMM yyyy', {
                locale: ar,
              })}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>
              {event.isOnlineEvent
                ? 'عبر الإنترنت'
                : event.location || 'موقع غير محدد'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
