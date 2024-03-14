import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingStatus } from 'store/shared/commonState';
import { RootState } from 'store/store';
import {
  deleteUser,
  fetchAllUsers,
  updateUserRoles,
} from 'store/user/userActions';
import { RoleOption, translateRole } from 'utils/roleTranslationUtil';
import RoleManagementDialog from './RoleManagementDialog';
import { displayConfirmation, displayToast } from 'utils/alertUtils';
import { PaginationComponent } from 'components/categories/PaginationComponent';

export const UsersManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.admin.users
  );
  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUserRoles, setEditingUserRoles] = useState<RoleOption[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(fetchAllUsers({ page: currentPage, size: 10 }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (data.totalPages !== undefined && data.currentPage !== undefined) {
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
  }, [data.totalPages, data.currentPage]);

  const handleOpenDialog = (userId: number, userRoles: RoleOption[]) => {
    setEditingUserId(userId);
    setEditingUserRoles(userRoles);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUserId(null);
    setEditingUserRoles([]);
  };

  const handleRolesUpdate = async (newRoles: RoleOption[]) => {
    if (editingUserId) {
      const roleStrings = newRoles.map((role) => role.value);
      await dispatch(
        updateUserRoles({ userId: editingUserId, roles: roleStrings })
      );
      handleCloseDialog();
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const result = await displayConfirmation({
      title: 'هل أنت متأكد؟',
      text: 'هل ترغب حقًا في حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.',
      icon: 'warning',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'لا، إلغاء الأمر!',
    });

    if (result.isConfirmed) {
      await dispatch(deleteUser(userId));
      dispatch(fetchAllUsers({ page: 0, size: 10 }));
      displayToast('تم حذف المستخدم بنجاح', true, currentTheme);
    }
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchAllUsers({ page: newPage, size: 10 }));
  };

  return (
    <>
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
                      className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text  tracking-wider"
                    >
                      الصورة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text  tracking-wider border-r border-light-border dark:border-dark-border"
                    >
                      البريد الإلكتروني
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text  tracking-wider border-r border-light-border dark:border-dark-border"
                    >
                      اسم المستخدم
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text  tracking-wider border-r border-light-border dark:border-dark-border"
                    >
                      الأدوار
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text  tracking-wider border-r border-light-border dark:border-dark-border"
                    >
                      العمليات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-light-layer dark:bg-dark-layer divide-y divide-light-border dark:divide-dark-border">
                  {status === LoadingStatus.Loading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        جاري التحميل...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-red-600">
                        حدث خطأ: {error}
                      </td>
                    </tr>
                  ) : data.items.length > 0 ? (
                    data.items.map((user) => (
                      <tr key={user.id} className="align-center">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt="Profile"
                              className="h-10 w-10 rounded-full object-cover mx-auto"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full flex items-center justify-center mx-auto bg-brand-500 text-white uppercase font-semibold">
                              {user.username.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border">
                          <div className="flex items-center gap-2">
                            {user.roles.map((role, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                              >
                                {translateRole(role)}
                              </span>
                            ))}
                            <PencilIcon
                              className="h-5 w-5 text-green-500 cursor-pointer mr-4"
                              onClick={() =>
                                handleOpenDialog(
                                  user.id,
                                  user.roles.map((role) => ({
                                    label: translateRole(role),
                                    value: role,
                                  }))
                                )
                              }
                            />
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative border-r border-light-border dark:border-dark-border">
                          <div className="flex justify-center items-center gap-4 h-full absolute inset-0">
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-400 dark:hover:text-red-300 flex items-center focus:outline-none"
                            >
                              <TrashIcon
                                className="h-5 w-5 ml-2"
                                aria-hidden="true"
                              />
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        لم يتم العثور على مستخدمين.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <RoleManagementDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        userRoles={editingUserRoles}
        onRolesUpdate={handleRolesUpdate}
      />
    </>
  );
};
