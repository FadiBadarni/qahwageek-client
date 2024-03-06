import { LightPost } from 'models/post';
import React, { ReactNode } from 'react';
import './categoryPage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type CategoryHeaderProps = {
  posts: LightPost[];
  PostsComponent?: ReactNode;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  posts,
  PostsComponent,
}) => {
  const navigate = useNavigate();

  const currentCategory = useSelector(
    (state: RootState) => state.categories.currentCategory.data
  );

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };
  return (
    <>
      <div className="relative bg-light-border dark:bg-dark-border py-8 sm:py-8 transition duration-300 ease-in-out text-center z-10 complex-border">
        <div className="theme-based-shape-divider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
          {currentCategory?.name}
        </h2>
        <p className="mt-4 text-base sm:text-lg md:text-xl leading-8 text-neutral-700 dark:text-neutral-100">
          {currentCategory?.description}
        </p>
        <div className="pb-20 md:pb-32"></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="relative mt-[-10%] px-4 md:px-6 lg:px-8 z-20 ">
          <div className="flex justify-center items-start flex-wrap">
            {posts.map((post, index) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className={`w-full md:w-1/2 lg:w-1/3 overflow-hidden shadow-lg bg-light-border dark:bg-dark-border ${
                  index > 0 ? 'hidden md:block' : ''
                } ${
                  index % 2 === 0 ? 'md:border-l-2' : 'md:border-r-2'
                } border-neutral-300 dark:border-neutral-600 relative cursor-pointer`}
              >
                <div className="w-full h-48 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover"
                    src={post.mainImageUrl}
                    alt="Programming Post"
                  />
                  <span className="absolute bottom-0 right-0 py-1 px-3 text-sm font-semibold text-neutral-800 bg-neutral-200 dark:bg-neutral-600 dark:text-neutral-200 rounded-tl-lg">
                    {post.categoryNames.join(', ')}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2 text-neutral-700 dark:text-neutral-200 line-clamp-2">
                    {post.title}
                  </h3>
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
