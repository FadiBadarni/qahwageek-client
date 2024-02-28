import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { LightPost } from 'models/post';
import React from 'react';

interface UserPostsProps {
  posts: LightPost[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-neutral-400 rounded-lg p-4 bg-neutral-100 dark:bg-dark-layer text-neutral-600 dark:text-neutral-200"
        >
          <div className="flex gap-4">
            <img
              src={post.mainImageUrl}
              alt={post.title}
              className="w-24 h-24 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex flex-col justify-between">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <div className="text-xs md:text-sm flex flex-wrap gap-1 mt-2">
                {post.categoryNames.length > 0 && (
                  <>
                    {post.categoryNames.map((name, index) => (
                      <span
                        key={index}
                        className="bg-accent-500 text-white dark:text-dark-text px-2 py-1 rounded-full"
                      >
                        {name}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <div className="mt-2">
                <p className="text-xs">بواسطة: {post.author}</p>
                <p className="text-xs">
                  نشر في:{' '}
                  {format(parseISO(post.publishedAt), 'dd MMMM, yyyy', {
                    locale: ar,
                  })}
                </p>
                {post.readingTime && (
                  <p className="text-xs">
                    وقت القراءة: {post.readingTime} دقائق
                  </p>
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
