import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface AddCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(addCategory({ name: categoryName, description }));
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white dark:bg-dark-layer px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-white text-center mb-4"
              >
                إضافة تصنيف جديد
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-2">
                <div className="mt-2">
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-light-input dark:bg-dark-input text-neutral-700 dark:text-neutral-200"
                    placeholder="اسم التصنيف"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <textarea
                    className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-light-input dark:bg-dark-input text-neutral-700 dark:text-neutral-200"
                    placeholder="الوصف"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  ></textarea>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-center space-x-reverse space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-neutral-200 dark:bg-neutral-600 px-4 py-2 text-base font-medium text-neutral-700 dark:text-neutral-300 shadow-sm hover:bg-neutral-300 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-brand-400"
                    onClick={onClose}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-500 dark:bg-brand-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-brand-600 dark:hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-brand-400"
                  >
                    حفظ
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddCategoryDialog;
