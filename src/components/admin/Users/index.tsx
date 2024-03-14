import { TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { UserData } from 'models/user';
import React, { useEffect, useState } from 'react';

const fetchUsers = async (): Promise<UserData[]> => {
  return Promise.resolve([
    {
      id: 1,
      email: 'user1@example.com',
      username: 'user1',
      roles: ['Admin'],
      profilePicture: '',
    },
    {
      id: 2,
      email: 'user2@example.com',
      username: 'user2',
      roles: ['User'],
      profilePicture: '',
    },
  ]);
};

export const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background p-4 rtl">
      <h1 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-8 text-center">
        إدارة المستخدمين
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden border-b border-light-border dark:border-dark-border rounded-lg">
            <table className="min-w-full divide-y divide-light-border dark:divide-dark-border">
              <thead className="bg-light-layer dark:bg-dark-layer">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    الصورة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    البريد الإلكتروني
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    اسم المستخدم
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    الأدوار
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider border-r border-light-border dark:border-dark-border"
                  >
                    العمليات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-light-layer dark:bg-dark-layer divide-y divide-light-border dark:divide-dark-border">
                {users.map((user) => (
                  <tr key={user.id} className="align-center">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <img
                        src={
                          user.profilePicture || 'default-profile-picture-url'
                        }
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover mx-auto"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                      {user.roles.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative border-r border-light-border dark:border-dark-border">
                      <div className="flex justify-center items-center gap-4 h-full absolute inset-0">
                        <a
                          href="/cms/manage-users"
                          className="text-red-600 hover:text-red-400 dark:hover:text-red-300 flex items-center"
                        >
                          <TrashIcon
                            className="h-5 w-5 ml-2"
                            aria-hidden="true"
                          />
                          حذف
                        </a>
                        <a
                          href="/cms/manage-users"
                          className="text-yellow-600 hover:text-yellow-400 dark:hover:text-yellow-300 flex items-center"
                        >
                          <XCircleIcon
                            className="h-5 w-5 ml-2"
                            aria-hidden="true"
                          />
                          حظر
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
