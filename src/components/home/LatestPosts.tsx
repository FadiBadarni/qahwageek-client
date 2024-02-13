import React from 'react';
import { Link } from 'react-router-dom';

interface RecentPost {
  id: number;
  title: string;
  writer: string;
  publishedAt: string;
  imageUrl?: string;
}

const posts: RecentPost[] = [
  {
    id: 1,
    title: 'العنوان الأول',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'العنوان الأول',
    writer: 'فادي بدارنة',
    publishedAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/150',
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
    <div className="max-w-sm">
      <ul className="divide-y divide-gray-100 ">
        {posts.map((post) => (
          <li key={post.id} className="flex gap-x-4 py-5">
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-sm font-semibold leading-6 text-neutral-100 line-clamp-2">
                {post.title}
              </p>
              <div className="flex justify-between items-end mt-4">
                <p className="text-sm leading-6 text-neutral-100">
                  {post.writer} -{' '}
                  <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                </p>
              </div>
            </div>
            <img
              className="h-12 w-12 flex-none rounded-sm bg-gray-50 order-last"
              src={post.imageUrl}
              alt=""
            />
          </li>
        ))}
      </ul>
      <Link
        to="/most-recent"
        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        عرض الكل
      </Link>
    </div>
  );
};
