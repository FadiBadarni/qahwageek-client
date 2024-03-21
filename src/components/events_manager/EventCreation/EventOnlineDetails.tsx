import { EventCategory, NewEvent } from 'models/event';
import React from 'react';
import { handleEventInputChange } from 'utils/eventHelpers';

interface EventOnlineDetailsProps {
  newEvent: NewEvent;
  setNewEvent: React.Dispatch<React.SetStateAction<NewEvent>>;
  eventsCategories: EventCategory[];
  setEventImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export const EventOnlineDetails: React.FC<EventOnlineDetailsProps> = ({
  newEvent,
  setNewEvent,
  eventsCategories,
  setEventImage,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    handleEventInputChange(e, setNewEvent, eventsCategories, setEventImage);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6">
      <div className="md:w-1/2">
        <label
          htmlFor="isOnlineEvent"
          className="flex items-center text-sm font-medium text-light-text dark:text-dark-text"
        >
          <input
            id="isOnlineEvent"
            name="isOnlineEvent"
            type="checkbox"
            checked={newEvent.isOnlineEvent}
            onChange={handleInputChange}
            className="rounded border-neutral-300 text-brand-500 shadow-sm focus:border-brand-300 focus:ring focus:ring-offset-0 focus:ring-brand-500 ml-2"
          />
          هل الفعالية عبر الإنترنت؟
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={newEvent.location}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text"
          placeholder={
            newEvent.isOnlineEvent
              ? 'أدخل رابط الحدث عبر الإنترنت (مثل Zoom)'
              : 'أدخل موقع الفعالية هنا'
          }
        />
      </div>
      <div className="md:w-1/2">
        <label
          htmlFor="eventLink"
          className="block text-sm font-medium text-light-text dark:text-dark-text"
        >
          رابط الفعالية
        </label>
        <input
          id="eventLink"
          name="eventLink"
          type="text"
          value={newEvent.eventLink}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text"
          placeholder="أدخل رابط الفعالية إذا كان متاحًا"
        />
      </div>
    </div>
  );
};
