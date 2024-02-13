import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { getUserInfo } from 'store/user/userActions';
import { LatestPosts } from './LatestPosts';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div className=" text-neutral-100">
      <h1 className="text-3xl font-bold text-center">أهلا وسهلا ب قهوة چيك!</h1>
      <LatestPosts />
    </div>
  );
};
