import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getNewestProgrammingPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import NewsReport from './NewsReport';
import CategoryPosts from '../CategoryPosts';

type Props = {};

const ProgrammingPosts = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewestProgrammingPosts());
  }, [dispatch]);

  const programmingPosts = useSelector(
    (state: RootState) => state.posts.programmingPosts.data
  );
  return (
    <CategoryPosts posts={programmingPosts} newsComponent={<NewsReport />} />
  );
};

export default ProgrammingPosts;
