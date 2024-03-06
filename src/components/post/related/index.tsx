import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchRelatedPosts } from 'store/post/postActions';
import { RootState } from 'store/store';

interface RelatedPostsProps {
  postId: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.posts.relatedPosts
  );
  useEffect(() => {
    dispatch(fetchRelatedPosts({ relatedPostId: postId, page: 0, size: 10 }));
  }, [dispatch, postId]);

  if (status === 'loading') return <div>Loading related posts...</div>;
  if (error) return <div>Error fetching related posts: {error}</div>;

  return <div></div>;
};

export default RelatedPosts;
