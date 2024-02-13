import React from 'react';
import { ClockIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface RecentPost {
  id: number;
  title: string;
  writer: string;
  publishedAt: string;
  imageUrl?: string;
  readingTime?: number;
}

const posts: RecentPost[] = [
  {
    id: 1,
    title: '9 استراتيجيّات البحث عن عمل في زمن التغيرات',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 2,
    title: 'العنوان الثاني',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-02',
    imageUrl: 'https://via.placeholder.com/150',
    readingTime: 5,
  },
  {
    id: 3,
    title: 'العنوان الثالث',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-03',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'العنوان الرابع',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-04',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const FeaturedPosts: React.FC = () => {
  return (
    <div className="rounded-lg shadow-lg grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative bg-white rounded-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
        >
          {post.imageUrl && (
            <div className="relative group">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full object-cover h-48 rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold leading-6 text-white">
                  {post.title}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <UserIcon
                      className="h-5 w-5 text-gray-200 ml-1"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-200">{post.writer}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon
                      className="h-5 w-5 text-gray-200 ml-1"
                      aria-hidden="true"
                    />
                    <time
                      dateTime={post.publishedAt}
                      className="text-sm text-gray-200"
                    >
                      {post.publishedAt}
                    </time>
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center text-gray-200">
                      <ClockIcon className="h-5 w-5 ml-1 " aria-hidden="true" />
                      <span>{post.readingTime} دقائق</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <a
            href="/post/link"
            className="absolute inset-0 z-10"
            aria-label={`Read more about ${post.title}`}
          ></a>{' '}
          {/* Invisible link covering the entire card for accessibility */}
        </div>
      ))}
    </div>
  );
};

export default FeaturedPosts;
