import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryHeader from '.';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { fetchPostsByCategory } from 'store/post/postActions';
import DynamicCategoryPosts from './DynamicCategoryPosts';
import { fetchCategoryBySlug } from 'store/category/categoryActions';

const DynamicCategoryHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      dispatch(fetchCategoryBySlug(slug));
      dispatch(fetchPostsByCategory({ categorySlug: slug, page: 0, size: 10 }));
    }
  }, [slug, dispatch]);

  const currentCategory = useSelector(
    (state: RootState) => state.categories.currentCategory.data
  );

  const { items: posts } = useSelector(
    (state: RootState) => state.posts.categoryPosts.data
  );

  return (
    <CategoryHeader
      bannerTitle={currentCategory?.name || 'Loading Category...'}
      bannerSubtitle={
        currentCategory?.description ||
        'Please wait while we load category details.'
      }
      posts={posts}
      PostsComponent={<DynamicCategoryPosts />}
    />
  );
};

export default DynamicCategoryHome;
