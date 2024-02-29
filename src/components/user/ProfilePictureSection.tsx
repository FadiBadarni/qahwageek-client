import React from 'react';
import { Dialog } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/24/outline';

interface ProfilePictureSectionProps {
  previewUrl: string | null;
  defaultProfilePicUrl: string;
  handleFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePictureSection: React.FC<ProfilePictureSectionProps> = ({
  previewUrl,
  defaultProfilePicUrl,
  handleFileInput,
}) => (
  <div className="flex-1 flex flex-col items-center justify-center">
    <div className="text-center mb-4">
      <CameraIcon
        className="mx-auto h-12 w-12 text-neutral-500 dark:text-neutral-400"
        aria-hidden="true"
      />
      <Dialog.Title as="h3" className="mt-2 text-lg font-medium leading-6">
        تغيير الصورة الشخصية
      </Dialog.Title>
    </div>
    {previewUrl ? (
      <img
        src={previewUrl}
        alt="Preview"
        className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
      />
    ) : (
      <img
        src={defaultProfilePicUrl || 'defaultProfilePicUrl'}
        alt="Current Profile"
        className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
      />
    )}
    <div className="mt-4 w-full flex flex-col items-center">
      <label
        htmlFor="profilePicture"
        className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-200"
      >
        اختر صورة جديدة للملف الشخصي
      </label>
      <input
        id="profilePicture"
        type="file"
        onChange={handleFileInput}
        className="block mx-auto text-sm text-neutral-500 file:py-2 file:px-4 file:rounded-lg file:border file:border-neutral-400 file:text-sm file:font-semibold file:bg-light-layer dark:file:bg-dark-layer file:text-light-text dark:file:text-dark-text hover:file:bg-light-accent dark:hover:file:bg-dark-accent cursor-pointer"
        accept="image/*"
      />
    </div>
  </div>
);

export default ProfilePictureSection;
