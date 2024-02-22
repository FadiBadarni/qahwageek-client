import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchPostsByCategory } from 'store/post/postActions';
import NewsReport from './NewsReport';
import CategoryPosts from '../CategoryPosts';

type Props = {};

const ProgrammingPosts = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchPostsByCategory({ categoryName: 'programming', page: 0, size: 10 })
    );
  }, [dispatch]);

  return (
    <CategoryPosts newsComponent={<NewsReport />} categoryName="programming" />
  );
};

export default ProgrammingPosts;
