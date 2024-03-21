import {
  ExclamationCircleIcon,
  FaceFrownIcon,
} from '@heroicons/react/24/outline';
import PostItem from 'components/shared/PostItem';
import PostItemSkeleton from 'components/shared/PostItemSkeleton';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchRelatedPosts } from 'store/post/postActions';
import { LoadingStatus } from 'store/shared/commonState';
import { RootState } from 'store/store';

interface RelatedPostsProps {
  postId: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.posts.relatedPosts
  );
  const ITEMS_PER_PAGE = 3;
  const SKELETON_COUNT = 3;

  useEffect(() => {
    dispatch(
      fetchRelatedPosts({
        relatedPostId: postId,
        page: 0,
        size: ITEMS_PER_PAGE,
      })
    );
  }, [dispatch, postId]);

  return (
    <div className="related-posts-container mb-8">
      <h2 className="text-xl text-center font-semibold mb-4">
        مواضيع يمكن تعبي عينك
      </h2>
      {status === LoadingStatus.Loading ? (
        Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <PostItemSkeleton key={index} />
        ))
      ) : error ? (
        <div className="flex flex-col items-center justify-center">
          <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
          <p className="mt-2">
            يا دنيا... في مشكلة جابتلنا العيد بجلب المواضيع المتعلقة: {error}
          </p>
        </div>
      ) : data.items && data.items.length > 0 ? (
        data.items.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaceFrownIcon className="w-8 h-8 text-gray-400" />
          <p className="mt-2">
            والله ما لقينا إشي يناسب ذوقك الرفيع! جرب بعدين.
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedPosts;
