import { EventCategory, NewEvent } from 'models/event';
import React, { useCallback, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
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
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleDateChange = (date: Date | null) => {
    handleEventDateChange(date, setNewEvent);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    handleEventInputChange(e, setNewEvent, eventsCategories, setEventImage);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setEventImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));

      const event: any = {
        target: {
          name: 'file',
          value: file,
          files: acceptedFiles,
        },
      };
      handleEventInputChange(
        event,
        setNewEvent,
        eventsCategories,
        setEventImage
      );
    },
    [setEventImage, setNewEvent, eventsCategories]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    onDrop,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mt-1">
        <label
          htmlFor="dateTime"
          className="my-1 block text-sm font-medium text-light-text dark:text-dark-text"
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
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 cursor-pointer text-light-text dark:text-dark-text"
        />

        <label
          htmlFor="eventLink"
          className="my-1 mt-2 block text-sm font-medium text-light-text dark:text-dark-text"
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

        <label
          htmlFor="isOnlineEvent"
          className="my-1 mt-2 flex items-center text-sm font-medium text-light-text dark:text-dark-text"
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
          className="my-1 mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text"
          placeholder={
            newEvent.isOnlineEvent
              ? 'أدخل رابط الحدث عبر الإنترنت (مثل Zoom)'
              : 'أدخل موقع الفعالية هنا'
          }
        />
      </div>
      <div>
        <label
          htmlFor="eventImage"
          className="text-sm font-medium text-light-text dark:text-dark-text"
        >
          صورة الفعالية
        </label>
        <div
          {...getRootProps({
            className:
              'mt-2 dropzone flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-lg text-center p-4 relative',
            style: { minHeight: '200px' },
          })}
        >
          <input id="eventImage" {...getInputProps()} />
          {!imagePreviewUrl && (
            <p className="text-sm font-medium text-light-text dark:text-dark-text">
              قم بالسحب والإفلات هنا، أو انقر لتحديد الملفات
            </p>
          )}
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};
