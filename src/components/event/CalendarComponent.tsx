import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { DayHeaderContentArg, EventInput } from '@fullcalendar/common';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getCalendarEvents, getEventById } from 'store/event/eventActions';
import EventDetailsDialog from 'components/shared/EventDetailsDialog';

interface CalendarComponentProps {}

const CalendarComponent: React.FC<CalendarComponentProps> = () => {
  const dispatch = useAppDispatch();
  const events = useSelector(
    (state: RootState) => state.events.calendarEvents.data
  );
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const formattedEvents: EventInput[] = events.map((event) => ({
    id: event.id.toString(),
    title: event.title,
    start: event.startDateTime,
    end: event.endDateTime,
  }));

  useEffect(() => {
    const nextButton = document.querySelector('.fc-next-button');
    const prevButton = document.querySelector('.fc-prev-button');

    if (nextButton) nextButton.setAttribute('title', 'الأسبوع التالي');
    if (prevButton) prevButton.setAttribute('title', 'الأسبوع السابق');
  }, []);

  useEffect(() => {
    dispatch(getCalendarEvents());
  }, [dispatch]);

  const handleEventClick = (clickInfo: any) => {
    const eventId = parseInt(clickInfo.event.id, 10);
    if (!isNaN(eventId)) {
      dispatch(getEventById(eventId)).then((action) => {
        if (getEventById.fulfilled.match(action)) {
          const meetupEvent = action.payload;
          if (meetupEvent) {
            setSelectedEvent(meetupEvent);
            setIsDetailsDialogOpen(true);
          }
        } else if (getEventById.rejected.match(action)) {
          console.error('Failed to fetch event details:', action.error);
        }
      });
    } else {
      console.error('Event ID is not a valid number:', clickInfo.event.id);
    }
  };

  const dayHeaderContent = (
    headerInfo: DayHeaderContentArg
  ): { html: string } => {
    const screenWidth = window.innerWidth;
    const options =
      screenWidth <= 640
        ? { day: 'numeric', month: 'numeric' }
        : { weekday: 'long', day: 'numeric', month: 'numeric' };
    const formattedDate = headerInfo.date.toLocaleDateString(
      'ar',
      options as any
    );

    return { html: `<div>${formattedDate}</div>` };
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        slotDuration="00:30:00"
        slotLabelInterval="01:00:00"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridDay,timeGridWeek',
        }}
        buttonText={{
          today: 'اليوم',
          month: 'شهر',
          week: 'أسبوع',
          day: 'يوم',
          list: 'قائمة',
          prev: 'السابق',
          next: 'التالي',
          prevYear: 'السنة السابقة',
          nextYear: 'السنة التالية',
          prevWeek: 'الأسبوع السابق',
          nextWeek: 'الأسبوع التالي',
          dayGridMonth: 'الشهر',
          timeGridWeek: 'الأسبوع',
          timeGridDay: 'اليوم',
        }}
        nowIndicator={true}
        allDaySlot={false}
        events={formattedEvents as any}
        locale="ar"
        direction="rtl"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        slotMinTime="08:00:00"
        slotMaxTime="23:00:00"
        dayHeaderContent={dayHeaderContent}
        eventClick={handleEventClick}
        contentHeight="auto"
      />
      {isDetailsDialogOpen && selectedEvent && (
        <EventDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => {
            setIsDetailsDialogOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
