import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/24/outline';

interface ProfilePictureUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePictureUpdateDialog: React.FC<ProfilePictureUpdateDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 transition-opacity dark:bg-neutral-900 dark:bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-light-layer text-light-text dark:bg-dark-layer dark:text-dark-text shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6">
                <div className="text-center">
                  <CameraIcon
                    className="mx-auto h-12 w-12 text-neutral-500 dark:text-neutral-400"
                    aria-hidden="true"
                  />
                  <Dialog.Title
                    as="h3"
                    className="mt-2 text-lg font-medium leading-6"
                  >
                    تغيير الصورة الشخصية
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm">
                      يمكنك تحميل صورة جديدة لتغيير صورة ملفك الشخصي.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="file"
                    onChange={handleFileInput}
                    className="text-center"
                    accept="image/*"
                  />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium shadow-sm hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfilePictureUpdateDialog;
