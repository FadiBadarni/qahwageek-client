import { useNavigate } from 'react-router-dom';
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { LightPost } from 'models/post';

const posts: LightPost[] = [
  {
    id: 1,
    title: 'فهم React Hooks',
    author: 'جين دو',
    publishedAt: '2023-01-01',
    mainImageUrl: 'https://via.placeholder.com/100',
    categoryNames: [],
  },
  {
    id: 4,
    title: 'مقدمة في TypeScript',
    author: 'جين دو',
    publishedAt: '2023-01-01',
    categoryNames: [],
    mainImageUrl: 'https://via.placeholder.com/100',
  },
];

export default function PostsListing() {
  const navigate = useNavigate();

  const handleDelete = (postId: number) => {
    console.log('Deleting post with ID:', postId);
  };

  return (
    <div className="p-5 pt-5 lg:pt-5">
      <div className="flex justify-center lg:justify-end mb-2">
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            البحث
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-1.5 rounded-md border-0 bg-gray-50 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 dark:bg-gray-700 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus:text-gray-100 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="بحث..."
              type="search"
            />
          </div>
        </div>
      </div>

      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li
            key={post.id}
            className="group relative flex items-center justify-between gap-x-6 py-5 px-4 cursor-pointer bg-light-200 hover:bg-light-300 dark:bg-dark-800 dark:hover:bg-dark-700 rounded-md"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div
              className="flex min-w-0 gap-x-4 flex-grow"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="h-12 w-12 flex-none rounded-full"
                src={post.mainImageUrl}
                alt={post.title}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-brand-500">
                  {post.title}
                </p>
                <p className="mt-1 flex text-xs leading-5 text-neutral-400">
                  {post.author} ·{' '}
                  {format(new Date(post.publishedAt), 'PPP', { locale: ar })}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/cms/posts/edit/${post.id}`);
                }}
                className="text-brand-500 hover:text-brand-600 p-1"
              >
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post.id);
                }}
                className="text-red-500 hover:text-red-600 p-1"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
