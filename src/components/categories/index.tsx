import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { fetchPostsByCategory } from 'store/post/postActions';
import DynamicCategoryPosts from './DynamicCategoryPosts';
import { fetchCategoryBySlug } from 'store/category/categoryActions';

const DynamicCategoryHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      dispatch(fetchCategoryBySlug(slug))
        .unwrap()
        .catch((error) => {
          if (error.status === 404) {
            navigate('/404');
          }
        });
      dispatch(fetchPostsByCategory({ categorySlug: slug, page: 0, size: 10 }));
    }
  }, [slug, dispatch, navigate]);

  const { items: posts } = useSelector(
    (state: RootState) => state.posts.categoryPosts.data
  );

  return (
    <CategoryHeader posts={posts} PostsComponent={<DynamicCategoryPosts />} />
  );
};

export default DynamicCategoryHome;
