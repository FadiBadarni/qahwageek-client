import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryPosts from './CategoryPosts';
import NewsReport from './NewsReport';

const DynamicCategoryPosts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return null;
  }

  return <CategoryPosts newsComponent={<NewsReport />} categorySlug={slug} />;
};

export default DynamicCategoryPosts;
