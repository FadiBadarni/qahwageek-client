import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { PaginationComponent } from 'components/shared/PaginationComponent';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { MeetupEvent, translateStatus } from 'models/event';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllEvents, updateEventStatus } from 'store/event/eventActions';
import { RootState } from 'store/store';
import EventActions from './EventActions';
import { clearSelectedEvent, setSelectedEvent } from 'store/event/eventSlice';
import { displayToast } from 'utils/alertUtils';

type Props = {};

const EventsTable: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const {
    items: events,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.events.allEvents.data);

  const { data: selectedEventData } = useSelector(
    (state: RootState) => state.events.selectedEvent
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(getAllEvents({ page: currentPage, size: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(getAllEvents({ page, size: 10 }));
  };

  const handlePublish = (event: MeetupEvent) => {
    setIsUpdating(true);

    dispatch(setSelectedEvent(event));
    dispatch(updateEventStatus({ eventId: event.id, status: 'PUBLISHED' }))
      .unwrap()
      .then((updatedEvent) => {
        dispatch(setSelectedEvent(updatedEvent));
        displayToast('الحدث نُشر بنجاح', true, currentTheme);
      })
      .catch((error) => {
        displayToast('فشل في نشر الحدث', false, currentTheme);
      })
      .finally(() => {
        setIsUpdating(false);
        dispatch(clearSelectedEvent());
      });
  };

  const handleReject = (event: MeetupEvent) => {
    setIsUpdating(true);

    dispatch(setSelectedEvent(event));
    dispatch(updateEventStatus({ eventId: event.id, status: 'REJECTED' }))
      .unwrap()
      .then((updatedEvent) => {
        dispatch(setSelectedEvent(updatedEvent));
        displayToast('تم رفض الحدث بنجاح', true, currentTheme);
      })
      .catch((error) => {
        displayToast('فشل في رفض الحدث', false, currentTheme);
      })
      .finally(() => {
        dispatch(clearSelectedEvent());
        setIsUpdating(false);
      });
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-8 text-center">
        إدارة الأحداث المقترحة
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden border-b border-light-border dark:border-dark-border rounded-lg">
            <table className="min-w-full divide-y divide-light-border dark:divide-dark-border">
              <thead className="bg-light-layer dark:bg-dark-layer">
                <tr>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Expand</span>
                  </th>
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    العنوان
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    التاريخ والوقت
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    الفئة
                  </th>
                  <th
                    scope="col"
                    className="w-1/6 px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    المنشئ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    الحالة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    العمليات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-light-layer dark:bg-dark-layer divide-y divide-light-border dark:divide-dark-border">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      <div className="flex justify-center items-center gap-4">
                        <button className="text-gray-500 hover:text-gray-700">
                          <ArrowsPointingOutIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      {format(new Date(event.dateTime), 'PPpp', { locale: ar })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border text-center">
                      {event.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border text-center">
                      {event.creator}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm border-r border-light-border dark:border-dark-border text-center ${
                        event.status === 'PENDING'
                          ? 'text-orange-500'
                          : event.status === 'PUBLISHED'
                          ? 'text-green-500'
                          : event.status === 'REJECTED'
                          ? 'text-red-500'
                          : 'text-neutral-700 dark:text-neutral-200'
                      }`}
                    >
                      {translateStatus(event.status)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      <EventActions
                        event={event}
                        onPublish={() => handlePublish(event)}
                        onReject={() => handleReject(event)}
                        isLoading={
                          selectedEventData?.id === event.id && isUpdating
                        }
                        isGlobalUpdating={isUpdating}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default EventsTable;
