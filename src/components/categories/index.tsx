import { LightPost } from 'models/post';
import React, { ReactNode } from 'react';

type CategoryHeaderProps = {
  bannerTitle: string;
  bannerSubtitle: string;
  posts: LightPost[];
  PostsComponent?: ReactNode;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  bannerTitle,
  bannerSubtitle,
  posts,
  PostsComponent,
}) => {
  return (
    <>
      <div className="relative bg-neutral-700 dark:bg-dark-800 py-8 sm:py-8 transition duration-300 ease-in-out text-center z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          {bannerTitle}
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl leading-8 text-neutral-300 dark:text-neutral-200">
          {bannerSubtitle}
        </p>
        <div className="pb-20 md:pb-32"></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="relative mt-[-10%] px-4 md:px-6 lg:px-8 z-20 ">
          <div className="flex justify-center items-start flex-wrap">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`w-full md:w-1/2 lg:w-1/3 overflow-hidden shadow-lg bg-white dark:bg-neutral-800 ${
                  index > 0 ? 'hidden md:block' : ''
                } ${
                  index % 2 === 0 ? 'md:border-l-2' : 'md:border-r-2'
                } border-neutral-300 dark:border-neutral-600`}
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={post.mainImageUrl}
                    alt="Programming Post"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2 text-neutral-700 dark:text-neutral-200 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                    {post.categoryNames.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-8 border-t border-neutral-300 dark:border-neutral-600" />
        {PostsComponent && PostsComponent}
      </div>
    </>
  );
};

export default CategoryHeader;
