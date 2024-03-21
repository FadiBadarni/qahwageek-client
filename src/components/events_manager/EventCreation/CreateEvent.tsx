import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getAllEventCategories } from 'store/event/eventActions';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { NewEvent } from 'models/event';
import { useNavigate } from 'react-router-dom';
import { EventBasicDetails } from './EventBasicDetails';
import { EventOnlineDetails } from './EventOnlineDetails';
import { EventDateTimeAndImage } from './EventDateTimeAndImage';
import { handleEventInputChange, handleEventSubmit } from 'utils/eventHelpers';

const CreateEvent: React.FC = () => {
  const dispatch = useAppDispatch();
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
    dispatch(getAllEventCategories());
  }, [dispatch]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleEventSubmit(
      e,
      newEvent,
      eventImage,
      setLoading,
      dispatch,
      navigate,
      setNewEvent
    );
  };

  return (
    <div className="p-4 mx-auto max-w-4xl px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center text-light-text dark:text-dark-text mb-6">
        إنشاء حدث جديد
      </h2>
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
  );
};

export default CreateEvent;
