import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { getUserInfo } from 'store/user/userActions';
import FeaturedPosts from './FeaturedPosts';
import { LatestPosts } from './LatestPosts';
import { UpcomingEvents } from './UpcomingEvents';
import { PopularPosts } from './PopularPosts';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mt-2 mb-6">
        أهلا وسهلا بقهوة چيك!
      </h1>
      <div className="space-y-4">
        <div className="py-3">
          <FeaturedPosts />
        </div>
        <div className="md:flex md:space-x-4">
          <div className="md:w-2/3">
            <LatestPosts />
            <PopularPosts />
          </div>
          <div className="md:w-1/3">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};
