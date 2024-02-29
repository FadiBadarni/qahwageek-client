import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Dialog, Transition } from '@headlessui/react';
import { uploadProfilePicture } from 'store/user/userActions';
import { useAppDispatch } from 'hooks/useAppDispatch';
import ProfilePictureSection from './ProfilePictureSection';
import SocialMediaSection from './SocialMediaSection';
import BioSection from './BioSection';

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
              <div className="fixed inset-0 bg-neutral-700 bg-opacity-75 transition-opacity dark:bg-neutral-900 dark:bg-opacity-75"></div>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-light-layer dark:bg-dark-layer p-6 text-light-text dark:text-dark-text shadow-xl transition-all sm:my-8 sm:max-w-4xl sm:w-full">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  تعديل تفاصيل المستخدم
                </Dialog.Title>
                <div className="flex flex-col md:flex-row mt-4">
                  <ProfilePictureSection
                    previewUrl={previewUrl}
                    defaultProfilePicUrl={userProfile?.profilePicture || ''}
                    handleFileInput={handleFileInput}
                  />

                  <div className="flex-1 mt-4 md:mt-0 md:ml-4">
                    <BioSection bio={bio} handleBioChange={handleBioChange} />

                    <SocialMediaSection
                      socialMediaHandles={socialMediaHandles}
                      handleSocialMediaChange={handleSocialMediaChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-neutral-200 dark:bg-neutral-600 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
                    onClick={() => {
                      setBio('');
                      setSocialMediaHandles([]);
                      setFile(null);
                      setPreviewUrl(null);
                      onClose();
                    }}
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-light-background dark:bg-dark-background text-base font-medium text-white hover:bg-brand-400 dark:hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-accent-500"
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
