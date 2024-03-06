import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import CategoryPosts from './CategoryPosts';
import { fetchPostsByCategory } from 'store/post/postActions';
import NewsReport from './NewsReport';

const DynamicCategoryPosts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      dispatch(fetchPostsByCategory({ categoryName: slug, page: 0, size: 10 }));
    }
  }, [slug, dispatch]);

  if (!slug) {
    return null;
  }

  return <CategoryPosts newsComponent={<NewsReport />} categoryName={slug} />;
};

export default DynamicCategoryPosts;
