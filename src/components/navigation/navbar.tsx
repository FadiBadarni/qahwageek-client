import React, { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { logout } from 'store/user/userActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'assets/logo.svg';
import MobileNav from './MobileNav';
import { toggleTheme } from 'store/theme/themeReducer';
import { classNames } from 'utils/tailwindUtil';
import './navbar.css';
import SearchInput from './SearchInput';
import { fetchAllCategories } from 'store/category/categoryActions';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.user.data);
  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const categories = useSelector(
    (state: RootState) => state.categories.categories.data
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const userInitial = user?.username
    ? user.username.charAt(0).toUpperCase()
    : '';

  const isAdmin = user?.roles.includes('ROLE_ADMIN');
  return (
    <Disclosure
      as="nav"
      className="bg-light-layer dark:bg-dark-layer text-neutral-900 dark:text-neutral-100 transition duration-300 ease-in-out"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <Link
                    to="/"
                    className="flex-shrink-0 hover:opacity-75 transition-opacity duration-300"
                  >
                    <img
                      className={`h-8 w-auto ${
                        currentTheme === 'dark'
                          ? 'svg-light-theme'
                          : 'svg-dark-theme'
                      }`}
                      src={logo}
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div className="hidden lg:mr-6 lg:block">
                  <div className="flex space-x-4 rtl:space-x-reverse">
                    {categories.map((category) =>
                      (category.subCategories?.length || 0) > 0 ? (
                        <Menu as="div" className="relative" key={category.id}>
                          <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-layer focus:ring-dark-primary bg-light-layer dark:bg-dark-layer text-light-text dark:text-dark-text border-light-border dark:border-dark-border">
                            {category.name}
                            <ChevronDownIcon
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-light-input dark:bg-dark-input ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                              <div className="py-1">
                                {category.subCategories?.map((subCategory) => (
                                  <Menu.Item key={subCategory.id}>
                                    {({ active }) => (
                                      <Link
                                        to={`/category/${subCategory.slug}`}
                                        className={`block px-4 py-2 text-sm ${
                                          active
                                            ? 'bg-neutral-200 dark:bg-neutral-700'
                                            : 'text-light-text dark:text-dark-text'
                                        }`}
                                      >
                                        {subCategory.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-700"
                        >
                          {category.name}
                        </Link>
                      )
                    )}
                    {isAdmin && (
                      <Link
                        to="/cms"
                        className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-700"
                      >
                        ادارة المحتوى
                      </Link>
                    )}
                    {user?.roles.includes('ROLE_EVENTS_MANAGER') && (
                      <Link
                        to="/events/cms"
                        className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-700"
                      >
                        إدارة الأحداث
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                <SearchInput />
              </div>
              <button onClick={handleToggleTheme} className="p-2">
                {currentTheme === 'dark' ? (
                  <SunIcon className="h-6 w-6 text-yellow-500" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-700" />
                )}
              </button>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover: focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">فتح القائمة الرئيسية</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:mr-4 lg:block">
                <div className="flex items-center">
                  {user ? (
                    <Menu as="div" className="relative mr-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">فتح قائمة المستخدم</span>
                          <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center dark:bg-slate-950 bg-neutral-300">
                            {user?.profilePicture ? (
                              <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span>{userInitial}</span>
                            )}
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 z-20 mt-2 w-48 origin-top-left rounded-md bg-light-background dark:bg-dark-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/user/profile/${user.id}`}
                                className={classNames(
                                  active
                                    ? 'bg-neutral-200 dark:bg-neutral-700'
                                    : '',
                                  'block px-4 py-2 text-sm w-full text-right text-light-text dark:text-dark-text'
                                )}
                              >
                                المنطقة الشخصية
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active
                                    ? 'bg-neutral-200 dark:bg-neutral-700'
                                    : '',
                                  'block px-4 py-2 text-sm w-full text-right text-light-text dark:text-dark-text'
                                )}
                                onClick={handleLogout}
                              >
                                تسجيل الخروج
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="ml-4 bg-brand-500 p-2 rounded-md text-sm text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus:ring-offset-dark-700"
                    >
                      تسجيل الدخول
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <MobileNav
            handleLogout={handleLogout}
            user={user}
            isAdmin={isAdmin}
          />
        </>
      )}
    </Disclosure>
  );
};
