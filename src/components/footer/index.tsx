import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = format(new Date(), 'yyyy');

  return (
    <footer className="w-full bg-light-layer dark:bg-dark-layer text-neutral-500 dark:text-neutral-300 mt-auto py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row-reverse justify-between items-center space-y-2 sm:space-y-0">
        <div className="text-sm text-center sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
          © {currentYear} جميع الحقوق محفوظة
        </div>

        <a
          href="https://devfadi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 hover:text-brand-500 transition duration-150 ease-in-out cursor-pointer"
        >
          <span className="text-xs sm:text-sm ml-1">صُنع بكل</span>
          <HeartIcon className="w-6 h-6 text-brand-500 animate-bounce" />
          <span className="text-xs sm:text-sm">من قبل فادي.</span>
        </a>

        <div className="flex space-x-4 space-x-reverse justify-center sm:justify-start">
          <Link
            to="/"
            className="hover:text-brand-500 transition duration-150 ease-in-out"
          >
            الرئيسية
          </Link>
          <Link
            to="/about"
            className="hover:text-brand-500 transition duration-150 ease-in-out"
          >
            من نحن
          </Link>
          <Link
            to="/contact"
            className="hover:text-brand-500 transition duration-150 ease-in-out"
          >
            اتصل بنا
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
