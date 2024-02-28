import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getUserProfile } from 'store/user/userActions';
import UserPosts from './UserPosts';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import UserSocialMedia from './UserSocialMedia';

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
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* User's Basic Information */}
        <div className="md:flex-1 md:w-1/3 flex flex-col items-center text-center p-4">
          <div className="h-32 w-32 md:h-48 md:w-48 overflow-hidden rounded-full border-4 border-primary self-center">
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
            {userProfile.bio || 'لا يوجد سيرة ذاتية'}
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-200">
            انضم:{' '}
            {format(parseISO(userProfile.joinDate), 'dd MMMM, yyyy', {
              locale: ar,
            })}
          </p>
          {/* Subtitle for Social Media Handles */}
          <h3 className="mt-4 mb-2 text-xs font-semibold dark:text-dark-text text-light-text">
            حسابات التواصل الاجتماعي
          </h3>
          <UserSocialMedia
            socialMediaHandles={userProfile.socialMediaHandles}
          />
        </div>

        {/* User's Posts */}
        <div className="md:flex-2 md:w-2/3 space-y-4">
          <UserPosts posts={userProfile.posts} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
