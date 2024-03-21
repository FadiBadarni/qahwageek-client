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
import AddEventGuidelines from './AddEventGuidelines';

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

        <div className="inline-block align-bottom bg-light-background dark:bg-dark-background rounded-lg text-right shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 p-4 space-y-8">
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
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text"
                    placeholder="أدخل وصف الفعالية هنا"
                  />
                </div>
              </form>
              <div className="bg-light-background dark:bg-dark-background px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-between">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-500 dark:bg-brand-400 text-base font-medium text-white hover:bg-brand-600 dark:hover:bg-dark-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-dark-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onClose()}
                  disabled={loading}
                >
                  إغلاق
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-500 dark:bg-brand-500 text-base font-medium text-white hover:bg-brand-600 dark:hover:bg-dark-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-dark-primary sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {loading ? 'جارٍ الإنشاء...' : 'إنشاء الفعالية'}
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-6 text-light-text dark:text-dark-text bg-light-layer dark:bg-dark-layer rounded-lg shadow-lg">
              <AddEventGuidelines />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateEventDialog;
