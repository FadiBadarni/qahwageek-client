import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  CalendarIcon,
  GlobeAltIcon,
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getAllEvents } from 'store/event/eventActions';
import { LoadingStatus } from 'store/shared/commonState';

export const UpcomingEvents: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: events, status } = useSelector(
    (state: RootState) => state.events.upcomingEvents
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(getEventsPerPage());

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    function handleResize() {
      setEventsPerPage(getEventsPerPage());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatDateWithTime = (dateTimeString: string) => {
    const date = parseISO(dateTimeString);
    return format(date, 'PPPp', { locale: ar });
  };

  function getEventsPerPage() {
    const width = window.innerWidth;
    if (width < 640) {
      // sm breakpoint and below
      return 1;
    } else if (width >= 640 && width < 768) {
      // sm to md
      return 2;
    } else {
      return 3; // md and above
    }
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h2 className="text-center text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">
        شو في قريب ؟
      </h2>
      {status === LoadingStatus.Loading && <p>Loading events...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {currentEvents.map((event) => (
          <div
            key={event.eventId}
            className="bg-white dark:bg-dark-700 rounded-lg shadow p-4 relative group"
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
      <div className="flex justify-center items-center space-x-reverse space-x-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <span>{currentPage}</span>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
