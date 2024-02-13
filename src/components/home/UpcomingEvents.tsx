import { MeetupEvent } from 'models/event';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  CalendarIcon,
  GlobeAltIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

const events: MeetupEvent[] = [
  {
    eventId: '1',
    title: 'العنوان الأول',
    date: '2023-01-01T12:00:00Z',
    imageUrl: 'https://via.placeholder.com/150',
    eventLink: 'http://example.com',
    isOnlineEvent: true,
  },
  {
    eventId: '2',
    title: 'العنوان الأول',
    date: '2023-01-01T12:00:00Z',
    imageUrl: 'https://via.placeholder.com/150',
    eventLink: 'http://example.com',
    isOnlineEvent: true,
  },
  {
    eventId: '3',
    title: 'العنوان الأول',
    date: '2023-01-01T12:00:00Z',
    imageUrl: 'https://via.placeholder.com/150',
    eventLink: 'http://example.com',
    isOnlineEvent: true,
  },
];

export const UpcomingEvents: React.FC = () => {
  const formatDateWithTime = (dateTimeString: string) => {
    const date = parseISO(dateTimeString);
    return format(date, 'PPPp', { locale: ar });
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h2 className="text-center text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">
        شو في قريب ؟
      </h2>
      {events.map((event) => (
        <div
          key={event.eventId}
          className="bg-white dark:bg-dark-700 rounded-lg shadow p-4 relative group"
        >
          <div className="relative block overflow-hidden">
            <a href={event.eventLink} target="_blank" rel="noopener noreferrer">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover rounded-md mb-2 transition duration-300 ease-in-out transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out flex items-center justify-center">
                <LinkIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100" />
              </div>
            </a>
            {event.isOnlineEvent && (
              <div className="absolute top-0 left-0 bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
                أونلاين
                <GlobeAltIcon className="h-4 w-4 inline-block ml-1" />
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold dark:text-white mb-2">
            {event.title}
          </h3>
          <div className="flex items-center space-x-reverse space-x-2 mb-2">
            <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDateWithTime(event.date)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
