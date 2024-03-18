import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoIosAddCircleOutline,
  IoIosPeople,
  IoMdCalendar,
} from 'react-icons/io';
import { FaTags } from 'react-icons/fa';

const EventsManagerDashboard: React.FC = () => {
  const dashboardItems = [
    {
      to: '/events/add-event',
      title: 'إضافة حدث',
      Icon: IoIosAddCircleOutline,
    },
    { to: '/events', title: 'عرض كل الأحداث', Icon: IoMdCalendar },
    {
      to: '/events/review-requests',
      title: 'مراجعة طلبات الأحداث',
      Icon: IoIosPeople,
    },
    { to: '/events/categories', title: 'فئات الأحداث', Icon: FaTags },
  ];

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background flex flex-col justify-start items-center px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 mb-4 text-center">
        لوحة تحكم مدير اللقاءات
      </h2>
      <p className="text-md md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl text-center mb-10">
        استخدم هذه الأدوات لإدارة الأحداث، طلبات الأحداث، وفئات الأحداث.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl px-4">
        {dashboardItems.map(({ to, title, Icon }) => (
          <Link
            key={title}
            to={to}
            className="flex flex-col items-center justify-center p-6 bg-light-layer dark:bg-dark-layer rounded-lg shadow hover:shadow-md transition duration-300 ease-in-out hover:bg-neutral-200 dark:hover:bg-neutral-700"
            style={{ minHeight: '220px' }}
          >
            <Icon className="mb-4 w-12 h-12 text-brand-500 dark:text-accent-500" />
            <span className="text-center text-neutral-700 dark:text-neutral-200">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsManagerDashboard;
