import EventsTable from 'components/shared/EventsTable';
import { PaginationComponent } from 'components/shared/PaginationComponent';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { MeetupEvent } from 'models/event';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllEvents } from 'store/event/eventActions';
import { RootState } from 'store/store';
import EventManagementActions from './EventManagementActions';

interface EventsManagementProps {}

const EventsManagement: React.FC<EventsManagementProps> = () => {
  const dispatch = useAppDispatch();
  const {
    items: events,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.events.allEvents.data);

  useEffect(() => {
    dispatch(getAllEvents({ page: currentPage, size: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(getAllEvents({ page, size: 10 }));
  };

  const handleDelete = (event: MeetupEvent) => {};

  const renderActions = (event: MeetupEvent) => (
    <EventManagementActions
      event={event}
      onDelete={() => handleDelete(event)}
    />
  );

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-8 text-center">
        إدارة كل الأحداث
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden border-b border-light-border dark:border-dark-border rounded-lg">
            <EventsTable events={events} renderActions={renderActions} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EventsManagement;
