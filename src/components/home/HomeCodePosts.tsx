import React, { useEffect } from 'react';
import PostItem from 'components/shared/PostItem';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getNewestProgrammingPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { LoadingStatus } from 'store/shared/commonState';
import PostItemSkeleton from 'components/shared/PostItemSkeleton';
import { useNavigate } from 'react-router-dom';

export const HomeCodePosts: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewestProgrammingPosts());
  }, [dispatch]);

  const { data: latestProgrammingPosts, status: loadingStatus } = useSelector(
    (state: RootState) => state.posts.latestProgrammingPosts
  );

  const handleViewMoreClick = () => {
    navigate('/category/espresso-code');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white text-right">
        اسبرسو كود
      </h2>
      <div>
        {loadingStatus === LoadingStatus.Loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <PostItemSkeleton key={index} />
            ))
          : latestProgrammingPosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
      </div>
      <button
        onClick={handleViewMoreClick}
        className="mt-4 w-full py-2 bg-brand-500 text-white font-semibold rounded-md hover:bg-brand-400 transition duration-300 ease-in-out text-center"
      >
        رؤية المزيد
      </button>
    </div>
  );
};
