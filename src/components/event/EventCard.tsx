import React from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { MeetupEvent } from 'models/event';
import {
  CalendarIcon,
  GlobeAltIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface EventCardProps {
  event: MeetupEvent;
  onViewDetails: (event: MeetupEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-dark-layer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl relative">
      <div className="flex-shrink-0">
        <img
          className="h-40 w-full object-cover"
          src={event.imageUrl || '/default-event-image.jpg'}
          alt={event.title}
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-2">
            {event.description}
          </p>
        </div>
        <div className="mt-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
            <CalendarIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400  ml-2" />
            <time dateTime={event.dateTime}>
              {format(parseISO(event.dateTime), 'd MMMM yyyy', { locale: ar })}
            </time>
            {event.onlineEvent ? (
              <>
                <GlobeAltIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                <span>عبر الإنترنت</span>
              </>
            ) : (
              event.location && (
                <>
                  <MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                  <span>{event.location}</span>
                </>
              )
            )}
          </div>
        </div>
      </div>
      <button
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out"
        onClick={() => onViewDetails(event)}
      >
        المزيد من التفاصيل
      </button>
    </div>
  );
};

export default EventCard;
