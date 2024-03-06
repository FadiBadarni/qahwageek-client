import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CategoryDetail, LightPost } from 'models/post';
import React from 'react';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface UserPostsProps {
  posts: LightPost[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
        آخر المشاركات
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex justify-between items-start p-2 bg-light-layer dark:bg-dark-layer rounded-lg cursor-pointer"
          onClick={() => handlePostClick(post.id)}
        >
          <div className="flex space-x-2">
            {post.mainImageUrl && (
              <img
                src={post.mainImageUrl}
                alt={post.title}
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
              />
            )}
            <div className="flex flex-col flex-grow pr-4">
              <h3 className="text-md font-semibold text-neutral-800 dark:text-neutral-100">
                {post.title}
              </h3>
              <div className="flex flex-wrap gap-1 mt-1 mb-2">
                {post.categoryDetails.map(
                  (category: CategoryDetail, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium bg-neutral-400/50 dark:bg-dark-border text-light-text dark:text-dark-text hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer transition-colors duration-200 ease-in-out"
                      onClick={() => handleCategoryClick(category.slug)}
                    >
                      {category.name}
                    </span>
                  )
                )}
              </div>
              <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-xs">
                <CalendarIcon className="h-4 w-4 ml-2" />
                <time dateTime={post.publishedAt}>
                  {format(parseISO(post.publishedAt), 'dd MMM yyyy', {
                    locale: ar,
                  })}
                </time>
                {post.readingTime && (
                  <>
                    <ClockIcon className="h-4 w-4 ml-2 mr-2" />
                    <span>{post.readingTime} دقائق</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
