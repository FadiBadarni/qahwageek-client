import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getNewestProgrammingPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import CategoryHeader from '..';
import DynamicCategoryPosts from '../DynamicCategoryPosts';

type Props = {};

const CodeCategoryHome = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewestProgrammingPosts());
  }, [dispatch]);

  const latestProgrammingPosts = useSelector((state: RootState) =>
    state.posts.latestProgrammingPosts.data.slice(0, 2)
  );

  return (
    <CategoryHeader
      bannerTitle="اسبرسو كود"
      bannerSubtitle="هنا تجد مقالات برمجية تعليمية ومفيدة."
      posts={latestProgrammingPosts}
      PostsComponent={<DynamicCategoryPosts />}
    />
  );
};

export default CodeCategoryHome;
