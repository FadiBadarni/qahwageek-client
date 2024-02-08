import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { getUserInfo } from 'store/user/userActions';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div className="home">
      <h1>Welcome to the Home Page!</h1>
      <p>This page is protected and requires login.</p>
    </div>
  );
};
