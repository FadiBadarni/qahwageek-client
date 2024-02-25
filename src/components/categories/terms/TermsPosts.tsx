import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { fetchPostsByCategory } from 'store/post/postActions';
import CategoryPosts from '../CategoryPosts';
import NewsReport from '../NewsReport';

type Props = {};

const TermsPosts = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchPostsByCategory({ categoryName: 'terms', page: 0, size: 10 })
    );
  }, [dispatch]);

  return <CategoryPosts newsComponent={<NewsReport />} categoryName="terms" />;
};

export default TermsPosts;
