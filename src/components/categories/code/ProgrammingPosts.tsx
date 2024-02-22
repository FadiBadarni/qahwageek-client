import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchPostsByCategory } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import NewsReport from './NewsReport';
import CategoryPosts from '../CategoryPosts';

type Props = {};

const ProgrammingPosts = (props: Props) => {
  const dispatch = useAppDispatch();

  const programmingPosts = useSelector(
    (state: RootState) => state.posts.categoryPosts.data.items
  );

  useEffect(() => {
    dispatch(
      fetchPostsByCategory({ categoryName: 'programming', page: 0, size: 10 })
    );
  }, [dispatch]);

  return (
    <CategoryPosts posts={programmingPosts} newsComponent={<NewsReport />} />
  );
};

export default ProgrammingPosts;
