import { EventCategory, NewEvent } from 'models/event';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  handleEventDateChange,
  handleEventInputChange,
} from 'utils/eventHelpers';

interface EventDateTimeAndImageProps {
  newEvent: NewEvent;
  setNewEvent: React.Dispatch<React.SetStateAction<NewEvent>>;
  eventsCategories: EventCategory[];
  setEventImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export const EventDateTimeAndImage: React.FC<EventDateTimeAndImageProps> = ({
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

  const handleDateChange = (date: Date | null) => {
    handleEventDateChange(date, setNewEvent);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="dateTime"
          className="block text-sm font-medium text-light-text dark:text-dark-text"
        >
          تاريخ ووقت الفعالية
        </label>
        <ReactDatePicker
          selected={
            newEvent.dateTime ? new Date(newEvent.dateTime) : new Date()
          }
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          wrapperClassName="datePicker"
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 cursor-pointer"
        />
      </div>
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-light-text dark:text-dark-text"
        >
          رابط صورة الفعالية
        </label>
        <input
          id="eventImage"
          name="eventImage"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
          placeholder="أدخل رابط صورة الفعالية هنا"
        />
      </div>
    </div>
  );
};
