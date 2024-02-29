import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Dialog, Transition } from '@headlessui/react';
import { uploadProfilePicture } from 'store/user/userActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { CameraIcon } from '@heroicons/react/24/outline';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile.data);
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [socialMediaHandles, setSocialMediaHandles] = useState(
    userProfile?.socialMediaHandles || []
  );
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const handleSocialMediaChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedHandles = [...socialMediaHandles];
      updatedHandles[index] = {
        ...updatedHandles[index],
        handle: e.target.value,
      };
      setSocialMediaHandles(updatedHandles);
    };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    if (userProfile && userProfile.id) {
      // Handle profile picture update
      if (file) {
        await dispatch(uploadProfilePicture({ userId: userProfile.id, file }));
      }
      // Handle bio and social media handles update
      //await dispatch(updateUserDetails({ userId: userProfile.id, bio, socialMediaHandles }));
    }
    onClose(); // Close dialog after saving changes
  };

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity"></div>
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-4xl sm:w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  تعديل تفاصيل المستخدم
                </Dialog.Title>
                <div className="flex flex-col md:flex-row mt-4">
                  <div className="flex-1">
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
                          src={
                            userProfile?.profilePicture ||
                            'defaultProfilePicUrl'
                          }
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
                  </div>
                  <div className="flex-1 mt-4 md:mt-0 md:ml-4">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      السيرة الذاتية
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={bio}
                      onChange={handleBioChange}
                    ></textarea>
                    {socialMediaHandles.map((handle, index) => (
                      <div key={index} className="mt-4">
                        <label
                          htmlFor={`social-${index}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {handle.platform}
                        </label>
                        <input
                          type="text"
                          name={`social-${index}`}
                          id={`social-${index}`}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={handle.handle}
                          onChange={(e) => handleSocialMediaChange(index)(e)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default EditProfileDialog;
