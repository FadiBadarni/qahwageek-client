import { PaginationComponent } from 'components/shared/PaginationComponent';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllEvents } from 'store/event/eventActions';
import { RootState } from 'store/store';

type Props = {};

const EventsTable: React.FC<Props> = () => {
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

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-8 text-center">
        إدارة الفعاليات
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden border-b border-light-border dark:border-dark-border rounded-lg">
            <table className="min-w-full divide-y divide-light-border dark:divide-dark-border">
              <thead className="bg-light-layer dark:bg-dark-layer">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider"
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
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    الموقع
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
                    <td className="px-6 py-4 whitespace-normal text-sm text-neutral-700 dark:text-neutral-200 break-words">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      <div className="flex items-center">
                        {format(new Date(event.dateTime), 'PPpp', {
                          locale: ar,
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      {event.category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border break-words">
                      {event.onlineEvent ? 'أونلاين' : event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() => console.log('Edit Event', event.id)}
                          className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => console.log('Delete Event', event.id)}
                          className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EventsTable;
