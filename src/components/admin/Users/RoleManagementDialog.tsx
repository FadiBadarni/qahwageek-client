import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { RoleOption, roleOptions } from 'utils/roleTranslationUtil';

interface RoleManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userRoles: RoleOption[];
  onRolesUpdate: (roles: RoleOption[]) => void;
}

const RoleManagementDialog: React.FC<RoleManagementDialogProps> = ({
  isOpen,
  onClose,
  userRoles,
  onRolesUpdate,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<MultiValue<RoleOption>>(
    []
  );

  useEffect(() => {
    setSelectedRoles(userRoles);
  }, [userRoles]);

  const handleRoleChange = (
    selectedOptions: MultiValue<RoleOption>,
    actionMeta: ActionMeta<RoleOption>
  ) => {
    setSelectedRoles(selectedOptions);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex min-h-screen justify-center p-4 text-center items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-dark-layer rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
              >
                إدارة الأدوار
              </Dialog.Title>
              <div className="mt-2">
                <Select
                  isMulti
                  name="roles"
                  options={roleOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="اختر الأدوار..."
                  isRtl={true}
                  value={selectedRoles}
                  onChange={handleRoleChange}
                  isClearable={false}
                  isSearchable={false}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    placeholder: (base) => ({ ...base, textAlign: 'right' }),
                  }}
                />
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-500 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm"
                >
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RoleManagementDialog;
