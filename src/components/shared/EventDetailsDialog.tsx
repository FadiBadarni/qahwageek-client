import React, { useState } from 'react';
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
import { determineTextDirection } from 'utils/textDirection';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

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
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const [imageUrl, setImageUrl] = useState(
    event.imageUrl || '/missing-image-dark.png'
  );

  const handleImageError = () => {
    const fallbackImage =
      currentTheme === 'light'
        ? '/missing-image-light.png'
        : '/missing-image-dark.png';
    setImageUrl(fallbackImage);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
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
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-dark-layer p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className={`text-xl font-bold leading-6 text-gray-900 dark:text-white mb-4 ${
                    determineTextDirection(event.title) === 'rtl'
                      ? 'text-center'
                      : 'text-center'
                  }`}
                  dir={determineTextDirection(event.title)}
                >
                  {event.title}
                </Dialog.Title>

                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:flex-1 md:mr-4 flex justify-center">
                    <img
                      src={imageUrl}
                      alt="Event"
                      onError={handleImageError}
                      className="h-60 w-auto object-cover rounded-lg shadow-md border border-gray-200 dark:border-neutral-700"
                    />
                  </div>

                  <div className="md:flex-1 flex flex-col items-center justify-center">
                    <div className="text-center text-xs md:text-sm text-gray-500 dark:text-gray-400 space-y-2 md:space-y-4 mt-4 md:mt-0">
                      <div className="flex sm:flex-col flex-row items-center justify-center space-x-2 md:space-x-0">
                        <CalendarIcon className="h-8 sm:h-10 w-8 sm:w-10 text-brand-500 dark:text-accent-500 mb-2 ml-4 sm:ml-0" />
                        <p className="text-xs md:text-sm">
                          {format(parseISO(event.dateTime), 'PPpp', {
                            locale: ar,
                          })}
                        </p>
                      </div>

                      <div className="flex sm:flex-col flex-row items-center justify-center space-x-2 md:space-x-0">
                        {event.onlineEvent ? (
                          <>
                            <GlobeAltIcon className="h-8 sm:h-10 w-8 sm:w-10 text-brand-500 dark:text-accent-500 mb-2 ml-4 sm:ml-0" />
                            <p className="text-xs md:text-sm">
                              الحدث عبر الإنترنت
                            </p>
                          </>
                        ) : (
                          <>
                            <MapPinIcon className="h-8 sm:h-10 w-8 sm:w-10 text-brand-500 dark:text-accent-500 mb-2 ml-4 sm:ml-0" />
                            <p
                              className={`text-xs md:text-sm ${
                                determineTextDirection(event.location) === 'rtl'
                                  ? 'text-right'
                                  : 'text-left'
                              }`}
                              dir={determineTextDirection(event.location)}
                            >
                              {event.location}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-2 text-right">
                    وصف الحدث
                  </h4>
                  <p
                    className={`text-sm text-gray-500 dark:text-gray-400 mb-4 ${
                      determineTextDirection(event.description) === 'rtl'
                        ? 'text-right'
                        : 'text-left'
                    }`}
                    dir={determineTextDirection(event.description)}
                  >
                    {event.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-200 dark:bg-neutral-600 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 sm:text-sm"
                    onClick={onClose}
                  >
                    إغلاق
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        event.eventLink,
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-500 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                  >
                    زيارة صفحة الحدث
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
