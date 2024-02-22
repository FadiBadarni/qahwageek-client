import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = format(new Date(), 'yyyy');

  return (
    <footer className="w-full bg-light-layer dark:bg-dark-layer text-neutral-500 dark:text-neutral-300 mt-auto py-4 dir-rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row-reverse justify-between items-center space-y-2 sm:space-y-0">
        <div className="text-sm text-center sm:text-right">
          © {currentYear} جميع الحقوق محفوظة
        </div>
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
