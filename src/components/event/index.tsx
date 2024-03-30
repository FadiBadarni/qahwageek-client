import { PaginationComponent } from 'components/shared/PaginationComponent';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getAllEventCategories,
  getEventsByCategory,
} from 'store/event/eventActions';
import { RootState } from 'store/store';
import EventCard from './EventCard';
import { MeetupEvent } from 'models/event';
import EventDetailsDialog from 'components/shared/EventDetailsDialog';
import { CalendarIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import CreateEventDialog from './CreateEventDialog';
import FilterSortOptions from './FilterSortOptions';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EventsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    items: events,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.events.eventsByCategory.data);
  const categories = useSelector(
    (state: RootState) => state.events.eventsCategories.data
  );
  const ITEMS_PER_PAGE = 6;

  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<MeetupEvent | null>(null);
  const [sort, setSort] = useState<string>('startDateTime,asc');
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    dispatch(getAllEventCategories());
    dispatch(
      getEventsByCategory({
        categoryId: selectedCategoryId,
        page: currentPage,
        size: ITEMS_PER_PAGE,
        sort,
      })
    );
  }, [dispatch, currentPage, sort, selectedCategoryId]);

  const handlePageChange = (page: number) => {
    dispatch(
      getEventsByCategory({
        categoryId: selectedCategoryId,
        page,
        size: ITEMS_PER_PAGE,
        sort,
      })
    );
  };

  const onViewDetails = (event: MeetupEvent) => {
    setSelectedEvent(event);
    setIsDetailsDialogOpen(true);
  };

  const closeDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    setIsCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const handleCategoryChange = (newCategoryId: number | undefined) => {
    setSelectedCategoryId(newCategoryId);
  };

  const whatsappGroupLink = 'https://chat.whatsapp.com/E7wujZs2I682pxFx8Wuixm';

  const handleWhatsAppClick = () => {
    window.open(whatsappGroupLink, '_blank');
  };

  const toggleCalendar = () => {
    navigate('/events/calendar');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-extrabold text-brand-500 dark:text-accent-500">
          كل الاحداث - بالتعاون مع The Meetup Stars
        </h2>
      </div>

      <FilterSortOptions
        sort={sort}
        selectedCategoryId={selectedCategoryId}
        categories={categories}
        onSortChange={handleSortChange}
        onCategoryChange={handleCategoryChange}
      />

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
        {totalPages > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </div>

      {selectedEvent && (
        <EventDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={closeDetailsDialog}
          event={selectedEvent}
        />
      )}

      <button
        onClick={toggleCalendar}
        className="fixed bottom-20 left-6 inline-flex items-center justify-center p-4 bg-light-input dark:bg-dark-input border border-light-border dark:border-dark-border rounded-full shadow-2xl cursor-pointer text-black dark:text-white animate-[float_3s_ease-in-out_infinite] hover:bg-light-200 dark:hover:bg-dark-700"
        data-tooltip-content="فتح التقويم"
        data-tooltip-id="openCalendarTooltip"
        aria-label="فتح التقويم"
        data-tooltip-place="right"
      >
        <CalendarIcon className="h-6 w-6" />
      </button>
      <Tooltip id="openCalendarTooltip" />

      <button
        onClick={handleAddEvent}
        className="fixed bottom-4 left-6 inline-flex items-center justify-center p-4 bg-light-input dark:bg-dark-input border border-light-border dark:border-dark-border rounded-full shadow-2xl cursor-pointer text-black dark:text-white animate-[float_3s_ease-in-out_infinite] hover:bg-light-200 dark:hover:bg-dark-700"
        data-tooltip-content="إضافة حدث"
        data-tooltip-id="addEventTooltip"
        aria-label="إضافة حدث"
        data-tooltip-place="right"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      <Tooltip id="addEventTooltip" />

      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-36 left-6 inline-flex items-center justify-center p-4 bg-light-input dark:bg-dark-input border border-light-border dark:border-dark-border rounded-full shadow-2xl cursor-pointer text-black dark:text-white animate-[float_3s_ease-in-out_infinite] hover:bg-light-200 dark:hover:bg-dark-700"
        data-tooltip-content="انضم إلى مجموعة الواتساب"
        data-tooltip-id="whatsAppGroupTooltip"
        aria-label="انضم إلى مجموعة الواتساب"
      >
        <FaWhatsapp className="h-6 w-6" />
      </button>
      <Tooltip id="whatsAppGroupTooltip" />

      <CreateEventDialog
        isOpen={isCreateDialogOpen}
        onClose={closeCreateDialog}
      />
    </div>
  );
};

export default EventsPage;
