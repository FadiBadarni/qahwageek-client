import { NewEvent } from 'models/event';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EventDateTimeAndImageProps {
  newEvent: NewEvent;
  handleDateChange: (date: Date | null) => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export const EventDateTimeAndImage: React.FC<EventDateTimeAndImageProps> = ({
  newEvent,
  handleDateChange,
  handleInputChange,
}) => {
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
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={newEvent.imageUrl}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
          placeholder="أدخل رابط صورة الفعالية هنا"
        />
      </div>
    </div>
  );
};
