import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MeetupEvent } from 'models/event';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import {
  CalendarIcon,
  GlobeAltIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

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
              <Dialog.Overlay className="fixed inset-0 bg-neutral-700 bg-opacity-75 transition-opacity dark:bg-neutral-900 dark:bg-opacity-75" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative bg-white dark:bg-dark-layer rounded-lg p-6 text-left overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-4xl">
                <div className="text-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {event.title}
                  </Dialog.Title>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={event.imageUrl || '/default-event-image.jpg'}
                      alt={event.title}
                      className="w-40 h-40 object-cover rounded-full"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {event.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <CalendarIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mr-2" />
                      {format(parseISO(event.dateTime), 'EEEE, d MMMM yyyy', {
                        locale: ar,
                      })}
                    </div>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      {event.onlineEvent ? (
                        <>
                          <GlobeAltIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mr-2" />
                          الحدث عبر الإنترنت
                        </>
                      ) : (
                        <>
                          <MapPinIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400 mr-2" />
                          {event.location}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-between items-center">
                  <a
                    href={event.eventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-500 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                  >
                    زيارة الرابط
                  </a>

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-200 dark:bg-neutral-600 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 sm:text-sm"
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
