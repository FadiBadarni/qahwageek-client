import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { NewEvent } from 'models/event';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  handleEventDateChange,
  handleEventInputChange,
} from 'utils/eventHelpers';
import { format, parseISO } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getAllEventCategories } from 'store/event/eventActions';

interface EventEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventEditDialog: React.FC<EventEditDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const selectedEvent = useSelector(
    (state: RootState) => state.events.selectedEvent.data
  );

  const eventsCategories = useSelector(
    (state: RootState) => state.events.eventsCategories.data
  );

  useEffect(() => {
    dispatch(getAllEventCategories());
  }, [dispatch]);

  const [newEvent, setNewEvent] = useState<NewEvent>(() => {
    if (selectedEvent) {
      return {
        title: selectedEvent.title || '',
        description: selectedEvent.description || '',
        dateTime: format(
          parseISO(selectedEvent.dateTime),
          "yyyy-MM-dd'T'HH:mm"
        ),
        location: selectedEvent.location || '',
        imageUrl: selectedEvent.imageUrl || '',
        eventLink: selectedEvent.eventLink || '',
        isOnlineEvent: selectedEvent.onlineEvent || false,
        category: selectedEvent.category || {
          id: 0,
          name: '',
          description: '',
        },
      };
    } else {
      return {
        title: '',
        description: '',
        dateTime: '',
        location: '',
        imageUrl: '',
        eventLink: '',
        isOnlineEvent: false,
        category: { id: 0, name: '', description: '' },
      };
    }
  });

  const [, setEventImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.type === 'file') {
      const files = target.files;
      if (files && files[0]) {
        const file = files[0];
        setEventImage(file);
        const previewUrl = URL.createObjectURL(file);
        setNewEvent((prev) => ({
          ...prev,
          imageUrl: previewUrl,
        }));
      }
    } else {
      handleEventInputChange(
        e as React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
        setNewEvent,
        eventsCategories,
        setEventImage
      );
    }
  };

  const handleDateChange = (date: Date | null) => {
    handleEventDateChange(date, setNewEvent);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newEvent);
    onClose();
  };

  if (!isOpen || !selectedEvent) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 overflow-y-auto">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-dark-layer p-6 text-right align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-xl font-bold leading-6 text-gray-900 dark:text-white mb-4 text-center"
            >
              تعديل الحدث
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    عنوان الحدث
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    تصنيف الحدث
                  </label>
                  <select
                    name="category"
                    value={newEvent.category.id}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm  pr-8 pl-2"
                  >
                    {eventsCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="md:flex md:items-end md:justify-between gap-6">
                <div className="md:w-1/2">
                  <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    <input
                      type="checkbox"
                      name="isOnlineEvent"
                      checked={newEvent.isOnlineEvent}
                      onChange={handleChange}
                      className="ml-2 align-middle bg-light-input dark:bg-dark-input focus:border-brand-500 focus:ring-brand-500"
                    />
                    الحدث عبر الإنترنت
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                    required={!newEvent.isOnlineEvent}
                    placeholder="موقع الحدث"
                  />
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="eventLink"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    رابط الحدث
                  </label>
                  <input
                    type="text"
                    name="eventLink"
                    value={newEvent.eventLink}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="md:grid md:grid-cols-5 md:gap-6">
                  <div className="md:col-span-3">
                    <div className="mb-6">
                      <label
                        htmlFor="dateTime"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        تاريخ ووقت الحدث
                      </label>
                      <ReactDatePicker
                        selected={
                          newEvent.dateTime
                            ? new Date(newEvent.dateTime)
                            : new Date()
                        }
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        wrapperClassName="datePicker"
                        className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        وصف الحدث
                      </label>
                      <textarea
                        name="description"
                        value={newEvent.description}
                        onChange={handleChange}
                        className="mt-1 block w-full h-48 rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-light-text dark:text-dark-text"
                    >
                      صورة الحدث الحالية
                    </label>
                    {newEvent.imageUrl && (
                      <div className="mb-4 mt-1">
                        <img
                          src={newEvent.imageUrl}
                          alt="Current Event"
                          className="max-w-xs h-auto rounded-md shadow"
                        />
                      </div>
                    )}
                    <label
                      htmlFor="eventImage"
                      className="block text-sm font-medium text-light-text dark:text-dark-text"
                    >
                      تحديث صورة الحدث
                    </label>
                    <input
                      id="eventImage"
                      name="eventImage"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 text-light-text dark:text-dark-text"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-500 text-base font-medium text-white hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 sm:text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-500 text-base font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm"
                >
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default EventEditDialog;
