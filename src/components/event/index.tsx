import { PaginationComponent } from 'components/shared/PaginationComponent';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getEventsByCategory } from 'store/event/eventActions';
import { RootState } from 'store/store';
import EventCard from './EventCard';
import { MeetupEvent } from 'models/event';
import EventDetailsDialog from 'components/shared/EventDetailsDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import CreateEventDialog from './CreateEventDialog';

const EventsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: events,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.events.eventsByCategory.data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<MeetupEvent | null>(null);

  useEffect(() => {
    dispatch(getEventsByCategory({ page: currentPage, size: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(getEventsByCategory({ page, size: 10 }));
  };

  const onViewDetails = (event: MeetupEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-brand-500 dark:text-accent-500">
          كل الأحداث
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          استكشف الأحداث القادمة وسجل الآن
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={() => onViewDetails(event)}
            />
          ))
        ) : (
          <div className="text-center col-span-full">
            <p className="text-xl text-gray-900 dark:text-white">
              لا يوجد أحداث لعرضها
            </p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {selectedEvent && (
        <EventDetailsDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          event={selectedEvent}
        />
      )}
      <button
        onClick={handleAddEvent}
        className="fixed bottom-6 left-6 inline-flex items-center justify-center p-4 bg-light-border dark:bg-dark-input rounded-full shadow-lg cursor-pointer text-white"
        data-tooltip-content="إضافة حدث"
        data-tooltip-id="addEventTooltip"
        aria-label="إضافة حدث"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      <Tooltip id="addEventTooltip" />
      <CreateEventDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default EventsPage;
