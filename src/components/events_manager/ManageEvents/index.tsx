import EventsTable from 'components/shared/EventsTable';
import { PaginationComponent } from 'components/shared/PaginationComponent';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { MeetupEvent } from 'models/event';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteEvent, getAllEvents } from 'store/event/eventActions';
import { RootState } from 'store/store';
import EventManagementActions from './EventManagementActions';
import { clearSelectedEvent, setSelectedEvent } from 'store/event/eventSlice';
import { displayConfirmation, displayToast } from 'utils/alertUtils';
import EventEditDialog from './EventEditDialog';

interface EventsManagementProps {}

const EventsManagement: React.FC<EventsManagementProps> = () => {
  const dispatch = useAppDispatch();
  const {
    items: events,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.events.allEvents.data);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const selectedEvent = useSelector(
    (state: RootState) => state.events.selectedEvent.data
  );

  const [sort, setSort] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>(undefined);

  const { data: selectedEventData } = useSelector(
    (state: RootState) => state.events.selectedEvent
  );

  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(getAllEvents({ page: currentPage, size: 6, sort, status }));
  }, [dispatch, currentPage, sort, status]);

  const handlePageChange = (page: number) => {
    dispatch(getAllEvents({ page, size: 6, sort, status }));
  };

  const handleEdit = (event: MeetupEvent) => {
    dispatch(setSelectedEvent(event));
    setIsEditDialogOpen(true);
  };

  const handleDelete = (event: MeetupEvent) => {
    displayConfirmation({
      title: 'هل أنت متأكد؟',
      text: 'هذا الإجراء لا يمكن التراجع عنه وسيؤدي إلى حذف الحدث نهائيًا.',
      icon: 'warning',
      confirmButtonText: 'نعم، احذفه',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsUpdating(true);
        dispatch(setSelectedEvent(event));

        dispatch(deleteEvent(event.id))
          .unwrap()
          .then(() => {
            displayToast('تم حذف الحدث بنجاح', true, currentTheme);
          })
          .catch((error) => {
            console.error('Failed to delete the event:', error);
            displayToast('فشل في حذف الحدث', false, currentTheme);
          })
          .finally(() => {
            dispatch(clearSelectedEvent());
            setIsUpdating(false);
          });
      }
    });
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    dispatch(clearSelectedEvent());
  };

  const renderActions = (event: MeetupEvent) => (
    <EventManagementActions
      event={event}
      onDelete={() => handleDelete(event)}
      onEdit={() => handleEdit(event)}
      isLoading={selectedEventData?.id === event.id && isUpdating}
      isGlobalUpdating={isUpdating}
    />
  );

  return (
    <div className="bg-light-background dark:bg-dark-background p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-8 text-center">
        إدارة كل الأحداث
      </h1>

      <div className="text-right mb-4 flex justify-start space-x-4 space-x-reverse">
        <select
          id="sortingCriteria"
          className="pr-8 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">اختر معيار الترتيب</option>
          <option value="startDateTime,asc">التاريخ (تصاعدي)</option>
          <option value="startDateTime,desc">التاريخ (تنازلي)</option>
          <option value="createdAt,asc">تاريخ الإنشاء (تصاعدي)</option>
          <option value="createdAt,desc">تاريخ الإنشاء (تنازلي)</option>
        </select>
        <select
          id="statusFilter"
          className="pr-8 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value || undefined)}
        >
          <option value="">فلتر حسب الحالة</option>
          <option value="PENDING">قيد الانتظار</option>
          <option value="REJECTED">مرفوض</option>
          <option value="PUBLISHED">منشور</option>
        </select>
      </div>

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
      {isEditDialogOpen && selectedEvent && (
        <EventEditDialog isOpen={isEditDialogOpen} onClose={closeEditDialog} />
      )}
    </div>
  );
};

export default EventsManagement;
