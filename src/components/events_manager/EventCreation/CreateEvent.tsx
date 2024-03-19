import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { createEvent, getAllEventCategories } from 'store/event/eventActions';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { NewEvent } from 'models/event';
import { useNavigate } from 'react-router-dom';
import { EventBasicDetails } from './EventBasicDetails';
import { EventOnlineDetails } from './EventOnlineDetails';
import { EventDateTimeAndImage } from './EventDateTimeAndImage';

const CreateEvent: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventsCategories = useSelector(
    (state: RootState) => state.events.eventsCategories.data
  );
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllEventCategories());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';

    if (name === 'isOnlineEvent') {
      const isChecked = isCheckbox
        ? (e.target as HTMLInputElement).checked
        : false;
      setNewEvent((prev) => ({
        ...prev,
        [name]: isChecked,
        // Clear the location if the event is marked as online
        location: isChecked ? '' : prev.location,
      }));
    } else if (name === 'category') {
      // Handling category selection
      const selectedCategory = eventsCategories.find(
        (category) => category.id === Number(value)
      );
      setNewEvent((prev) => ({
        ...prev,
        category: selectedCategory || prev.category,
      }));
    } else {
      // Handling changes for all other inputs
      const newValue = isCheckbox
        ? (e.target as HTMLInputElement).checked
        : value;
      setNewEvent((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const updateLocation = (location: string) => {
    setNewEvent((prev) => ({
      ...prev,
      location,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setNewEvent((prev) => ({
      ...prev,
      dateTime: date?.toISOString() ?? '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const createdEvent = await dispatch(createEvent(newEvent)).unwrap();
      setNewEvent({
        title: '',
        description: '',
        dateTime: new Date().toISOString(),
        imageUrl: '',
        eventLink: '',
        isOnlineEvent: false,
        location: '',
        category: { id: 0, name: '', description: '' },
      });
      navigate(`/events/${createdEvent.id}`);
      console.log(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-4xl px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center text-light-text dark:text-dark-text mb-6">
        إنشاء حدث جديد
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <EventBasicDetails
          newEvent={newEvent}
          eventsCategories={eventsCategories}
          handleInputChange={handleInputChange}
        />

        <EventOnlineDetails
          newEvent={newEvent}
          handleInputChange={handleInputChange}
          updateLocation={updateLocation}
        />

        <EventDateTimeAndImage
          newEvent={newEvent}
          handleDateChange={handleDateChange}
          handleInputChange={handleInputChange}
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
            onChange={(e) => handleInputChange(e)}
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
