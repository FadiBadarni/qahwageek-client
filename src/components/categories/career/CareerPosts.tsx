import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { fetchPostsByCategory } from 'store/post/postActions';
import NewsReport from '../code/NewsReport';
import CategoryPosts from '../CategoryPosts';

type Props = {};

const CareerPosts = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchPostsByCategory({ categoryName: 'career', page: 0, size: 10 })
    );
  }, [dispatch]);

  return <CategoryPosts newsComponent={<NewsReport />} categoryName="career" />;
};

export default CareerPosts;
