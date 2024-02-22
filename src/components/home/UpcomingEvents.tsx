import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  CalendarIcon,
  GlobeAltIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getUpcomingEvents } from 'store/event/eventActions';
import { LoadingStatus } from 'store/shared/commonState';
import { useNavigate } from 'react-router-dom';

export const UpcomingEvents: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: events, status } = useSelector(
    (state: RootState) => state.events.upcomingEvents
  );

  useEffect(() => {
    dispatch(getUpcomingEvents());
  }, [dispatch]);

  const formatDateWithTime = (dateTimeString: string) => {
    const date = parseISO(dateTimeString);
    return format(date, 'PPPp', { locale: ar });
  };

  const handleButtonClick = () => {
    navigate('/events');
  };

  return (
    <div className="flex flex-col p-4 space-y-4 pl-0">
      <h2 className="text-center text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">
        شو في قريب ؟
      </h2>
      {status === LoadingStatus.Loading && <p>Loading events...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {events.map((event) => (
          <div
            key={event.eventId}
            className="bg-light-layer dark:bg-dark-layer rounded-lg shadow p-4 relative group transition duration-300 ease-in-out"
          >
            <div className="relative block overflow-hidden">
              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
              >
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
                <div className="absolute top-0 left-0 bg-brand-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
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
      <div className="flex justify-center">
        <button
          onClick={handleButtonClick}
          className="w-full py-2 px-4 bg-brand-500 text-white font-semibold rounded-md hover:bg-brand-400 transition duration-300 ease-in-out text-center"
        >
          رؤية المزيد
        </button>
      </div>
    </div>
  );
};
