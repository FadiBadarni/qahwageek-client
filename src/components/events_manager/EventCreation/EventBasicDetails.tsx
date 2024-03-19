import { EventCategory, NewEvent } from 'models/event';
import React from 'react';

interface EventBasicDetailsProps {
  newEvent: NewEvent;
  eventsCategories: EventCategory[];
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export const EventBasicDetails: React.FC<EventBasicDetailsProps> = ({
  newEvent,
  eventsCategories,
  handleInputChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-light-text dark:text-dark-text"
        >
          عنوان الفعالية
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={newEvent.title}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
          placeholder="أدخل عنوان الفعالية هنا"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-light-text dark:text-dark-text"
        >
          تصنيف الفعالية
        </label>
        <select
          id="category"
          name="category"
          value={newEvent.category.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4 pr-8 pl-2"
        >
          <option disabled value="">
            اختر تصنيفاً...
          </option>
          {eventsCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
