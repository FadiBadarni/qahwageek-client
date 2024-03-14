import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchPostsByCategory } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { PaginationComponent } from './PaginationComponent';
import { useNavigate } from 'react-router-dom';
import { CategoryDetail } from 'models/post';

type CategoryPostsProps = {
  newsComponent?: React.ReactNode;
  categorySlug: string;
};

const CategoryPosts: React.FC<CategoryPostsProps> = ({
  newsComponent,
  categorySlug,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    items: posts,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.posts.categoryPosts.data);

  useEffect(() => {
    if (categorySlug) {
      dispatch(
        fetchPostsByCategory({ categorySlug, page: currentPage, size: 10 })
      );
    }
  }, [dispatch, currentPage, categorySlug]);

  const handlePageChange = (page: number) => {
    if (categorySlug) {
      dispatch(fetchPostsByCategory({ categorySlug, page, size: 10 }));
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const handleCategoryClick = (categorySlug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 mt-8 lg:mt-10">
        <div className="lg:col-span-5 space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative flex flex-row items-start bg-light-layer dark:bg-dark-layer rounded-sm p-4 cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="flex-shrink-0">
                <img
                  src={post.mainImageUrl}
                  alt={post.title}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl object-cover"
                />
              </div>
              <div className="flex-1 mr-4 h-28 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <p className="text-sm text-neutral-400">{post.author}</p>

                    <time
                      dateTime={post.publishedAt}
                      className="text-sm text-neutral-400"
                    >
                      {format(parseISO(post.publishedAt), 'dd MMMM, yyyy', {
                        locale: ar,
                      })}
                    </time>
                  </div>

                  <h3 className="text-lg font-semibold leading-6 text-neutral-700 dark:text-neutral-100 group-hover:text-brand-500 line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.categoryDetails.map(
                    (category: CategoryDetail, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium bg-neutral-400/50 dark:bg-dark-border text-light-text dark:text-dark-text hover:bg-light-primary dark:hover:bg-dark-primary cursor-pointer transition-colors duration-200 ease-in-out"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category.slug, e);
                        }}
                      >
                        {category.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {newsComponent && <div className="lg:col-span-3">{newsComponent}</div>}
      </div>
    </div>
  );
};

export default CategoryPosts;
