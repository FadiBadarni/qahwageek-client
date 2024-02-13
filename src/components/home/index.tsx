import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { getUserInfo } from 'store/user/userActions';
import FeaturedPosts from './FeaturedPosts';

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
      <div>
        <FeaturedPosts />
      </div>
    </div>
  );
};
