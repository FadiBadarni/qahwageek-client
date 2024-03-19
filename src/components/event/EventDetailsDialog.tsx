import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MeetupEvent } from 'models/event';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

interface EventDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: MeetupEvent;
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 transition-opacity dark:bg-neutral-900 dark:bg-opacity-75"></div>
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-light-layer dark:bg-dark-layer p-6 text-light-text dark:text-dark-text shadow-xl transition-all sm:my-8 sm:max-w-4xl sm:w-full">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  {event.title}
                </Dialog.Title>
                <div className="mt-4">
                  <img
                    src={event.imageUrl || '/default-event-image.jpg'}
                    alt={event.title}
                    className="h-48 w-full object-cover rounded-md mb-4"
                  />
                  <p className="text-sm">{event.description}</p>
                  <p className="mt-2 text-sm">
                    <strong>تاريخ:</strong>{' '}
                    {format(parseISO(event.dateTime), 'EEEE, d MMMM yyyy', {
                      locale: ar,
                    })}
                  </p>
                  {event.onlineEvent ? (
                    <p className="mt-2 text-sm">
                      <strong>الحدث عبر الإنترنت</strong>
                    </p>
                  ) : (
                    <p className="mt-2 text-sm">
                      <strong>الموقع:</strong> {event.location}
                    </p>
                  )}
                  <div className="mt-4 flex justify-end">
                    <a
                      href={event.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-500 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    >
                      زيارة الرابط
                    </a>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-200 dark:bg-neutral-600 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 sm:text-sm"
                    onClick={onClose}
                  >
                    إغلاق
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

export default EventDetailsDialog;
