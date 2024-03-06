import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryHeader from '.';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { fetchPostsByCategory } from 'store/post/postActions';
import DynamicCategoryPosts from './DynamicCategoryPosts';

const DynamicCategoryHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      dispatch(fetchPostsByCategory({ categorySlug: slug, page: 0, size: 10 }));
    }
  }, [slug, dispatch]);

  const { items: posts } = useSelector(
    (state: RootState) => state.posts.categoryPosts.data
  );

  return (
    <CategoryHeader
      bannerTitle="test"
      bannerSubtitle="test"
      posts={posts}
      PostsComponent={<DynamicCategoryPosts />}
    />
  );
};

export default DynamicCategoryHome;
