import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/24/outline';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { uploadProfilePicture } from 'store/user/userActions';

interface ProfilePictureUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePictureUpdateDialog: React.FC<ProfilePictureUpdateDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.user.data);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDiscard = () => {
    setFile(null);
    setPreviewUrl(null);
    onClose();
  };

  const handleDialogClose = () => {
    setFile(null);
    setPreviewUrl(null);
    onClose();
  };

  const handleSaveChanges = async () => {
    if (file && user?.id) {
      await dispatch(uploadProfilePicture({ userId: user.id, file }));
      setFile(null);
      setPreviewUrl(null);
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleDialogClose}>
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
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-4 w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src={user?.profilePicture || 'defaultProfilePicUrl'}
                      alt="Current Profile"
                      className="mt-4 w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full object-cover"
                    />
                  )}
                  <div className="mt-4 text-right">
                    <label
                      htmlFor="profilePicture"
                      className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-200"
                    >
                      اختر صورة جديدة للملف الشخصي
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      onChange={handleFileInput}
                      className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-500 file:text-white hover:file:bg-brand-400"
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 space-x-2 flex justify-around">
                  <button
                    type="button"
                    className=" inline-flex justify-center rounded-md border border-transparent bg-neutral-200 px-4 py-2 text-base font-medium text-neutral-600 shadow-sm hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
                    onClick={handleDiscard}
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium shadow-sm hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    onClick={handleSaveChanges}
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
