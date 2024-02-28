import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getUserProfile } from 'store/user/userActions';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile.data);
  const status = useSelector((state: RootState) => state.userProfile.status);
  const userId = useSelector((state: RootState) => state.user.data?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>No profile data</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-light-layer dark:bg-dark-layer rounded-lg shadow-md">
      <div className="flex flex-col items-center text-right">
        <div className="h-32 w-32 md:h-48 md:w-48 overflow-hidden rounded-full border-4 border-primary">
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
        </div>
        <h2 className="mt-4 font-bold text-xl dark:text-text text-dark-text">
          {userProfile.username}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-200">
          {userProfile.email}
        </p>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          {userProfile.bio}
        </p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-200">
          انضم: {new Date(userProfile.joinDate).toLocaleDateString('ar-EG')}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
