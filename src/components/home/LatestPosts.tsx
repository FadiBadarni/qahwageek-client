import React from 'react';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { RecentPost } from 'models/post';

const posts: RecentPost[] = [
  {
    id: 1,
    title: 'العنوان الأول',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 2,
    title: 'العنوان الأول',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 3,
    title: 'العنوان الأول',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

export const LatestPosts: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white text-right">
        المقالات الجديدة
      </h2>
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex items-center p-4 border-b border-gray-300 last:border-b-0 dark:border-dark-500 bg-gray-100 dark:bg-dark-700 rounded-md"
          >
            <div className="flex flex-grow flex-col justify-between h-full">
              <h3 className="text-lg font-semibold dark:text-white">
                {post.title}
              </h3>

              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-6">
                <UserIcon className="h-5 w-5 ml-1" />
                <span>{post.writer}</span>
                <CalendarIcon className="h-5 w-5 ml-1 mr-4" />
                <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                <ClockIcon className="h-5 w-5 ml-1 mr-4" />
                <span>{post.readingTime} دقائق قراءة</span>
              </div>
            </div>
            <img
              className="w-24 h-24 object-cover rounded-lg ml-4"
              src={post.imageUrl}
              alt={post.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
