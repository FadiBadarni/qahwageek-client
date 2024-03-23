import React, { useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from 'models/user';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchAllCategories } from 'store/category/categoryActions';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface MobileNavProps {
  handleLogout: () => void;
  user: UserData | null;
  isAdmin: boolean | undefined;
  closeMenu: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  handleLogout,
  user,
  isAdmin,
  closeMenu,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useSelector(
    (state: RootState) => state.categories.categories.data
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Disclosure.Panel className="lg:hidden fixed bg-light-layer dark:bg-dark-layer text-neutral-900 dark:text-neutral-100 w-full z-40">
      <div className="space-y-1 px-2 pt-2 pb-3 bg-light-layer dark:bg-dark-layer">
        {categories.map((category) =>
          (category.subCategories?.length || 0) > 0 ? (
            <Disclosure key={category.id} as="div" className="space-y-1">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-left text-sm font-medium rounded-lg hover:bg-light-layer dark:hover:bg-dark-layer focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 text-light-text dark:text-dark-text">
                    {category.name}
                    <ChevronDownIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-light-text dark:text-dark-text`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-light-text dark:text-dark-text">
                    {category.subCategories?.map((subCategory) => (
                      <Link
                        key={subCategory.id}
                        to={`/category/${subCategory.slug}`}
                        onClick={closeMenu}
                        className=" pl-4 pr-2 py-1 rounded hover:bg-light-layer dark:hover:bg-dark-layer flex items-center"
                      >
                        <svg
                          className="h-4 w-4 text-light-text dark:text-dark-text ml-2 rotate-180"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {subCategory.name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ) : (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              onClick={closeMenu}
              className="block px-4 py-2 text-sm rounded hover:bg-light-layer dark:hover:bg-dark-layer text-light-text dark:text-dark-text"
            >
              {category.name}
            </Link>
          )
        )}
        {isAdmin && (
          <Link
            to="/cms"
            className="block px-4 py-2 text-sm rounded hover:bg-light-accent dark:hover:bg-dark-accent text-light-text dark:text-dark-text"
          >
            ادارة المحتوى
          </Link>
        )}
        {user?.roles.includes('ROLE_EVENTS_MANAGER') && (
          <Link
            to="/events/cms"
            className="block px-4 py-2 text-sm rounded hover:bg-light-accent dark:hover:bg-dark-accent text-light-text dark:text-dark-text"
          >
            إدارة الأحداث
          </Link>
        )}
      </div>
      {user ? (
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-slate-700 dark:bg-dark-800">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.username}'s Profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </div>
            </div>
            <div className="mr-3">
              <div className="text-base font-medium text-gray-900 dark:text-neutral-100">
                {user.username}
              </div>
              <div className="text-sm font-medium text-gray-800 dark:text-neutral-400">
                {user.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            <Disclosure.Button
              as={Link}
              to={`/user/profile/${user.id}`}
              className="block w-full text-right rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white"
            >
              المنطقة الشخصية
            </Disclosure.Button>
            <button
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="px-2">
            <button
              onClick={handleLogin}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-400 dark:hover:bg-gray-500 dark:text-white"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      )}
    </Disclosure.Panel>
  );
};

export default MobileNav;
