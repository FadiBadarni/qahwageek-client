import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { getAllEventCategories } from 'store/event/eventActions';
import { NewEvent } from 'models/event';
import { useNavigate } from 'react-router-dom';
import { handleEventInputChange, handleEventSubmit } from 'utils/eventHelpers';
import { EventDateTimeAndImage } from 'components/events_manager/EventCreation/EventDateTimeAndImage';
import { EventOnlineDetails } from 'components/events_manager/EventCreation/EventOnlineDetails';
import { EventBasicDetails } from 'components/events_manager/EventCreation/EventBasicDetails';

const CreateEventDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const eventsCategories = useSelector(
    (state: RootState) => state.events.eventsCategories.data
  );

  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    description: '',
    dateTime: new Date().toISOString(),
    imageUrl: '',
    eventLink: '',
    isOnlineEvent: false,
    location: '',
    category: { id: 0, name: '', description: '' },
  });
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(getAllEventCategories());
    }
  }, [dispatch, isOpen]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleEventSubmit(
      e,
      newEvent,
      eventImage,
      setLoading,
      dispatch,
      navigate,
      setNewEvent
    );
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-light-background dark:bg-dark-background rounded-lg text-right shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-right w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-light-text dark:text-dark-text mb-6 text-center"
                >
                  إنشاء حدث جديد
                </Dialog.Title>
                <form onSubmit={onSubmit} className="space-y-8">
                  <EventBasicDetails
                    newEvent={newEvent}
                    eventsCategories={eventsCategories}
                    setNewEvent={setNewEvent}
                    setEventImage={setEventImage}
                  />

                  <EventOnlineDetails
                    newEvent={newEvent}
                    setNewEvent={setNewEvent}
                    eventsCategories={eventsCategories}
                    setEventImage={setEventImage}
                  />

                  <EventDateTimeAndImage
                    newEvent={newEvent}
                    setNewEvent={setNewEvent}
                    eventsCategories={eventsCategories}
                    setEventImage={setEventImage}
                  />

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-light-text dark:text-dark-text"
                    >
                      وصف الفعالية
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newEvent.description}
                      onChange={(e) =>
                        handleEventInputChange(
                          e,
                          setNewEvent,
                          eventsCategories,
                          setEventImage
                        )
                      }
                      required
                      className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
                      placeholder="أدخل وصف الفعالية هنا"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-500 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    >
                      {loading ? 'جارٍ الإنشاء...' : 'إنشاء الفعالية'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-500 text-base font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => onClose()}
              disabled={loading}
            >
              إغلاق
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-500 text-base font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {loading ? 'جارٍ الإنشاء...' : 'إنشاء الفعالية'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateEventDialog;
