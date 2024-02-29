import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { UserProfileType } from 'models/user';
import UserSocialMedia from './UserSocialMedia';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { FaEdit } from 'react-icons/fa';
import EditProfileDialog from './EditProfileDialog';

interface UserBasicInfoProps {
  userProfile: UserProfileType;
}

const UserBasicInfo: React.FC<UserBasicInfoProps> = ({ userProfile }) => {
  const user = useSelector((state: RootState) => state.user.data);
  const isCurrentUser = user && userProfile.id === user.id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="md:flex-1 md:w-1/3 flex flex-col items-center text-center p-4 bg-light-layer dark:bg-dark-layer rounded-md shadow-lg">
      <div className="h-32 w-32 md:h-48 md:w-48 relative">
        <div className="h-32 w-32 md:h-48 md:w-48 overflow-hidden rounded-full border-4 border-light-border dark:border-dark-border self-center">
          {userProfile.profilePicture ? (
            <img
              src={userProfile.profilePicture}
              alt="الملف الشخصي"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-neutral-400 text-white">
              {userProfile.username.charAt(0)}
            </div>
          )}
          {isCurrentUser && (
            <button
              className="absolute -bottom-2 right-0 mb-4 mr-4 p-2 rounded-full bg-light-border dark:bg-dark-border hover:bg-brand-400 text-light-text dark:text-dark-text shadow-lg transition duration-300"
              aria-label="تغيير الصورة الشخصية"
              onClick={handleEditClick}
            >
              <FaEdit size={24} />
            </button>
          )}
        </div>
      </div>
      <h2 className="mt-4 text-lg sm:text-xl md:font-bold dark:text-text text-dark-text">
        {userProfile.username}
      </h2>
      <p className="text-xs sm:text-sm dark:text-neutral-200">
        {userProfile.email}
      </p>
      <p className="mt-1 text-xs sm:text-sm dark:text-neutral-400">
        {userProfile.bio || 'لا يوجد سيرة ذاتية'}
      </p>
      <p className="mt-1 text-xs sm:text-sm dark:text-neutral-200">
        انضم:{' '}
        {format(parseISO(userProfile.joinDate), 'dd MMMM, yyyy', {
          locale: ar,
        })}
      </p>
      <div className="mt-auto w-full">
        <UserSocialMedia socialMediaHandles={userProfile.socialMediaHandles} />
      </div>
      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default UserBasicInfo;
