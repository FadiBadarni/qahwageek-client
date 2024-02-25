import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import CategoryHeader from '..';
import ExpressionPosts from './TermsPosts';
import { getNewestTermsPosts } from 'store/post/postActions';

type Props = {};

const TermsCategoryHome = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNewestTermsPosts());
  }, [dispatch]);

  const latestCareerPosts = useSelector((state: RootState) =>
    state.posts.latestTermsPosts.data.slice(0, 2)
  );

  return (
    <CategoryHeader
      bannerTitle="تطوير المصطلحات"
      bannerSubtitle="دليل المصطلحات 📖"
      posts={latestCareerPosts}
      PostsComponent={<ExpressionPosts />}
    />
  );
};

export default TermsCategoryHome;
