import { LightPost } from 'models/post';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';

const RecommendedPosts: React.FC = () => {
  const currentPost = useSelector(
    (state: RootState) => state.posts.currentPost.data
  );
  const [recommendedPosts, setRecommendedPosts] = useState<LightPost[]>([]);

  useEffect(() => {
    // Placeholder for fetching recommended posts based on current post's info
    const fetchRecommendedPosts = async () => {
      const recommendations: LightPost[] = [
        {
          id: 1,
          title: 'How to brew the perfect cup of coffee',
          author: 'John Doe',
          publishedAt: '2022-01-01T00:00:00Z',
          mainImageUrl: 'https://via.placeholder.com/300',
          readingTime: 5,
          categoryDetails: [
            {
              name: 'Coffee',
              slug: 'coffee',
            },
          ],
        },
      ];

      setRecommendedPosts(recommendations);
    };

    if (currentPost) {
      fetchRecommendedPosts();
    }
  }, [currentPost]);

  if (!recommendedPosts.length) return null;

  return (
    <div className="mt-8 mx-auto max-w-7xl px-6 lg:px-8 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-primary dark:text-accent">
        من الممكن أن تعجبك أيضًا
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedPosts.map((post) => (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
            className="block hover:bg-accent dark:hover:bg-primary p-4 rounded-lg bg-layer dark:bg-dark-layer border border-border dark:border-dark-border"
          >
            {post.mainImageUrl && (
              <img
                src={post.mainImageUrl}
                alt={post.title}
                className="w-full h-36 object-cover rounded-md mb-2"
              />
            )}
            <h3 className="text-lg font-semibold text-text dark:text-dark-text">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;
