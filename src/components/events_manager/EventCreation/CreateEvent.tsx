import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getAllEventCategories } from 'store/event/eventActions';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';

const CreateEvent: React.FC = () => {
  const dispatch = useAppDispatch();
  const eventsCategories = useSelector(
    (state: RootState) => state.events.eventsCategories.data
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [imageUrl, setImageUrl] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllEventCategories());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="p-4 mx-auto max-w-4xl px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center text-light-text dark:text-dark-text mb-6">
        إنشاء حدث جديد
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
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
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={selectedCategory ?? ''}
              onChange={(e) =>
                setSelectedCategory(Number(e.target.value) || null)
              }
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

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:w-1/2">
            <label
              htmlFor="isOnlineEvent"
              className="flex items-center text-sm font-medium text-light-text dark:text-dark-text"
            >
              <input
                id="isOnlineEvent"
                type="checkbox"
                checked={isOnlineEvent}
                onChange={(e) => setIsOnlineEvent(e.target.checked)}
                className="rounded border-neutral-300 text-brand-500 shadow-sm focus:border-brand-300 focus:ring focus:ring-offset-0 focus:ring-brand-500 ml-2"
              />
              هل الفعالية عبر الإنترنت؟
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
              placeholder={
                isOnlineEvent
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
              type="text"
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
              placeholder="أدخل رابط الفعالية إذا كان متاحًا"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium text-light-text dark:text-dark-text"
            >
              تاريخ ووقت الفعالية
            </label>
            <ReactDatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
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
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border border-neutral-300 bg-light-input dark:bg-dark-input py-2 px-4"
              placeholder="أدخل رابط صورة الفعالية هنا"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-light-text dark:text-dark-text"
          >
            وصف الفعالية
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
