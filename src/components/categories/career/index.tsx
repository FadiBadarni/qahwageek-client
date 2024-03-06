import { useAppDispatch } from 'hooks/useAppDispatch';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNewestCareerPosts } from 'store/post/postActions';
import { RootState } from 'store/store';
import CategoryHeader from '..';
import DynamicCategoryPosts from '../DynamicCategoryPosts';

type Props = {};

const CareerCategoryHome = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewestCareerPosts());
  }, [dispatch]);

  const latestCareerPosts = useSelector((state: RootState) =>
    state.posts.latestCareerPosts.data.slice(0, 2)
  );

  return (
    <CategoryHeader
      bannerTitle="تطوير المهنة"
      bannerSubtitle="تطوير الـ Career 💼"
      posts={latestCareerPosts}
      PostsComponent={<DynamicCategoryPosts />}
    />
  );
};

export default CareerCategoryHome;
