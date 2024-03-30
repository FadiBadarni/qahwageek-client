import React, { useState } from 'react';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { MeetupEvent, translateStatus } from 'models/event';
import EventDetailsDialog from './EventDetailsDialog';

type EventTableProps = {
  events: MeetupEvent[];
  renderActions: (event: MeetupEvent) => JSX.Element;
};

const EventsTable: React.FC<EventTableProps> = ({ events, renderActions }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<MeetupEvent | null>(null);

  const handleIconClick = (event: MeetupEvent) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
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
              className="w-1/6 px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              المنشئ
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              تاريخ انشاء الطلب
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
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleIconClick(event)}
                  >
                    <ArrowsPointingOutIcon
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border"
                title={event.title}
              >
                {event.title.length > 35
                  ? `${event.title.substring(0, 35)}...`
                  : event.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                {format(new Date(event.startDateTime), 'PP، HH:mm', {
                  locale: ar,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border text-center">
                {event.creator}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                {format(new Date(event.createdAt), 'PP، HH:mm', {
                  locale: ar,
                })}
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
                {renderActions(event)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEvent && (
        <EventDetailsDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          event={selectedEvent}
        />
      )}
    </>
  );
};

export default EventsTable;
