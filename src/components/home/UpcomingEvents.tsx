import { MeetupEvent } from 'models/event';
import React from 'react';

const events: MeetupEvent[] = [
  {
    eventId: '1',
    title: 'العنوان الأول',
    date: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    eventLink: 'http://example.com',
    isOnlineEvent: true,
  },
  {
    eventId: '2',
    title: 'العنوان الأول',
    date: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    eventLink: 'http://example.com',
    isOnlineEvent: true,
  },
  {
    eventId: '3',
    title: 'العنوان الأول',
    date: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    eventLink: 'http://example.com',
    isOnlineEvent: true,
  },
];

export const UpcomingEvents: React.FC = () => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <h2 className="text-center text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">
        شو في قريب ؟
      </h2>
      {events.map((event) => (
        <div
          key={event.eventId}
          className="bg-white dark:bg-dark-700 rounded-lg shadow p-4"
        >
          <div className="flex flex-col items-start">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 text-lg font-semibold dark:text-white">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {event.date}
            </p>
            <a
              href={event.eventLink}
              className="text-brand-500 hover:text-brand-400 mt-2 text-sm"
            >
              تفاصيل الحدث
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
