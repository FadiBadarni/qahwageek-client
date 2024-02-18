import React, { useEffect } from 'react';
import PostItem from 'components/shared/PostItem';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getRecentPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const LatestPosts: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecentPosts());
  }, [dispatch]);

  const posts = useSelector((state: RootState) => state.posts.data);
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white text-right">
        المقالات الجديدة
      </h2>
      <div>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            writer={post.author}
            publishedAt={post.publishedAt}
            imageUrl={post.mainImageUrl}
            readingTime={post.readingTime}
          />
        ))}
      </div>
      <button className="mt-4 w-full py-2 bg-brand-500 text-white font-semibold rounded-md hover:bg-brand-400 transition duration-300 ease-in-out text-center">
        رؤية المزيد
      </button>
    </div>
  );
};
