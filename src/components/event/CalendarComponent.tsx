import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { DayHeaderContentArg, EventInput } from '@fullcalendar/common';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, Transition } from '@headlessui/react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getCalendarEvents } from 'store/event/eventActions';

interface CalendarComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const events = useSelector(
    (state: RootState) => state.events.calendarEvents.data
  );

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
    if (isOpen) {
      dispatch(getCalendarEvents());
    }
  }, [dispatch, isOpen]);

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="calendar-dialog relative transform overflow-hidden rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text shadow-xl transition-all my-8 w-full max-w-6xl sm:w-11/12 md:w-full p-2 sm:p-6">
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
                  dayHeaderContent={(headerInfo: DayHeaderContentArg | any) => {
                    const screenWidth = window.innerWidth;
                    if (screenWidth <= 640) {
                      const dayOfMonth = headerInfo.date.getUTCDate();
                      const month = headerInfo.date.getUTCMonth() + 1;
                      return { html: `<div>${dayOfMonth}/${month}</div>` };
                    } else {
                      const options = {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'numeric',
                      };
                      const formattedDate = headerInfo.date.toLocaleDateString(
                        'ar',
                        options
                      );
                      return { html: `<div>${formattedDate}</div>` };
                    }
                  }}
                />
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    أغلق
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CalendarComponent;
