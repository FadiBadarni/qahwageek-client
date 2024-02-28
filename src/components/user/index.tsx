import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { getUserProfile } from 'store/user/userActions';
import UserPosts from './UserPosts';
import UserBasicInfo from './UserBasicInfo';
import { Helmet } from 'react-helmet-async';

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
      <Helmet>
        <title>{`${userProfile.username} - المساحة الشخصية`}</title>
        <meta
          name="description"
          content={`${
            userProfile.bio ||
            'استكشف المساحة الشخصية والمقالات ل' + userProfile.username
          } في قهوة چيك.`}
        />
        <meta
          property="og:title"
          content={`${userProfile.username} - المساحة الشخصية`}
        />
        <meta
          property="og:description"
          content={`${
            userProfile.bio ||
            'استكشف المساحة الشخصية والمقالات ل' + userProfile.username
          } في قهوة چيك.`}
        />
        <meta
          property="og:image"
          content={
            userProfile.profilePicture || 'URL_TO_A_DEFAULT_PROFILE_IMAGE'
          }
        />
        <meta property="og:type" content="profile" />
        <meta
          property="og:url"
          content={`https://qahwageek.netlify.app/user/${userId}`}
        />
        <link
          rel="canonical"
          href={`https://qahwageek.netlify.app/user/${userId}`}
        />
      </Helmet>
      <div className="flex flex-col md:flex-row gap-4">
        {/* User's Basic Information */}
        <UserBasicInfo userProfile={userProfile} />

        {/* User's Posts */}
        <div className="md:flex-2 md:w-2/3 space-y-4">
          <UserPosts posts={userProfile.posts} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
