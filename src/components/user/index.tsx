import { UserProfileType } from 'models/user';
import React from 'react';

const user: UserProfileType = {
  username: 'JaneDoe',
  email: 'jane.doe@example.com',
  profilePicture: 'https://via.placeholder.com/150',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  joinDate: new Date().toISOString(),
};

const UserProfile: React.FC = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto bg-light-layer dark:bg-dark-layer rounded-lg shadow-md">
      <div className="flex flex-col items-center text-right">
        <div className="h-32 w-32 md:h-48 md:w-48 overflow-hidden rounded-full border-4 border-primary">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="الملف الشخصي"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-neutral-400 text-white">
              {user.username.charAt(0)}
            </div>
          )}
        </div>
        <h2 className="mt-4 font-bold text-xl dark:text-text text-dark-text">
          {user.username}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-200">
          {user.email}
        </p>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          {user.bio}
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-200">
          انضم: {new Date(user.joinDate).toLocaleDateString('ar-EG')}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
