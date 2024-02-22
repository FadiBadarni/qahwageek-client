import { useEffect } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getNewestProgrammingPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import ProgrammingPosts from './ProgrammingPosts';
import CategoryHeader from '..';

type Props = {};

const CodeCategoryHome = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewestProgrammingPosts());
  }, [dispatch]);

  const programmingPosts = useSelector((state: RootState) =>
    state.posts.programmingPosts.data.slice(0, 2)
  );

  return (
    <CategoryHeader
      bannerTitle="اسبرسو كود"
      bannerSubtitle="هنا تجد مقالات برمجية تعليمية ومفيدة."
      posts={programmingPosts}
      PostsComponent={<ProgrammingPosts />}
    />
  );
};

export default CodeCategoryHome;
