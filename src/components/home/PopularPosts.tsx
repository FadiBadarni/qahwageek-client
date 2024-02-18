import React from 'react';
import { RecentPost } from 'models/post';
import PostItem from 'components/shared/PostItem';

const posts: RecentPost[] = [
  {
    id: 1,
    title: 'العنوان الأول',
    author: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 2,
    title: 'العنوان الأول',
    author: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 3,
    title: 'العنوان الأول',
    author: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

export const PopularPosts: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white text-right">
        المقالات الشائعة
      </h2>
      <div>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            writer={post.author}
            publishedAt={post.publishedAt}
            imageUrl={post.imageUrl}
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
