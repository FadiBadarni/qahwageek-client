import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { UserData } from 'models/user';

interface MobileNavProps {
  handleLogout: () => void;
  user: UserData | null;
}

const MobileNav: React.FC<MobileNavProps> = ({ handleLogout, user }) => {
  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : '';

  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <Disclosure.Button
          as={Link}
          to="/"
          className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
        >
          الرئيسية
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/category/terms"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          دليل المصطلحات
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/category/code"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          اسبرسو كود
        </Disclosure.Button>
        <Disclosure.Button
          as={Link}
          to="/category/career"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          تطوير المهنة
        </Disclosure.Button>
      </div>
      <div className="border-t border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-slate-700">
              {userInitial}
            </div>
          </div>
          <div className="mr-3">
            <div className="text-base font-medium text-white">
              {user?.username}
            </div>
            <div className="text-sm font-medium text-gray-400">
              {user?.email}
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1 px-2">
          <button
            className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={handleLogout}
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </Disclosure.Panel>
  );
};

export default MobileNav;
