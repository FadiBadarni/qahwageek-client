import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostsListing from './PostsListing';

const CMSPage: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-light-100 dark:bg-dark-900">
      {/* Mobile Nav Toggle */}
      <div className="flex justify-between items-center bg-light-200 dark:bg-dark-800 p-4 lg:hidden">
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          CMS Dashboard
        </span>
        <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav Content */}
      <div
        className={`bg-light-200 dark:bg-dark-800 lg:hidden ${
          isMobileNavOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className="py-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/cms/posts"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                المقالات
              </Link>
            </li>
            <li>
              <Link
                to="/cms/create-post"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                إنشاء مقالة
              </Link>
            </li>
            <li>
              <Link
                to="/cms/categories"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                الفئات
              </Link>
            </li>
            <li>
              <Link
                to="/cms/media"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                الوسائط
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-light-200 dark:bg-dark-800 overflow-y-auto lg:h-full">
        <div className="py-4 px-3">
          <ul className="space-y-2">
            <li>
              <Link
                to="/cms/posts"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                المقالات
              </Link>
            </li>
            <li>
              <Link
                to="/cms/create-post"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                إنشاء مقالة
              </Link>
            </li>
            <li>
              <Link
                to="/cms/categories"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                الفئات
              </Link>
            </li>
            <li>
              <Link
                to="/cms/media"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                الوسائط
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        <PostsListing />
      </div>
    </div>
  );
};

export default CMSPage;
