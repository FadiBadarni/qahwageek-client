import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const posts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    author: 'Jane Doe',
    createdAt: '2023-01-01',
    imageUrl: 'https://via.placeholder.com/100',
    excerpt:
      'An introduction to React Hooks and how they can be used to enhance your functional components...',
    href: '/cms/posts/1',
  },
];

export default function PostsListing() {
  return (
    <div className="p-5 pt-5 lg:pt-5">
      <ul className="divide-y divide-gray-100">
        {posts.map((post) => (
          <li
            key={post.id}
            className="relative flex justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={post.imageUrl}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <Link to={post.href}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {post.title}
                  </Link>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {post.author} ·{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="hidden lg:block mt-2 text-sm text-gray-500">
                  {post.excerpt}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <Link
                to={post.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <ChevronRightIcon
                  className="h-5 w-5 flex-none"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
