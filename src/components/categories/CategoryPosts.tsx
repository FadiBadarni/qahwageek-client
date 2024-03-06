import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { fetchPostsByCategory } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { PostsPagination } from './PostsPagination';
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
              className="relative flex flex-row gap-4 items-center bg-light-layer dark:bg-dark-layer rounded-sm p-2 cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="flex-shrink-0">
                <div className="w-24 h-24 lg:w-32 lg:h-32 p-2">
                  <img
                    src={post.mainImageUrl}
                    alt={post.title}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.publishedAt}
                    className="text-neutral-400"
                  >
                    {format(parseISO(post.publishedAt), 'dd MMMM, yyyy', {
                      locale: ar,
                    })}
                  </time>
                  {post.categoryDetails.map(
                    (category: CategoryDetail, index: number) => (
                      <span
                        key={index}
                        className="..."
                        onClick={(e) => handleCategoryClick(category.slug, e)}
                      >
                        {category.name}
                      </span>
                    )
                  )}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-neutral-700 dark:text-neutral-100 group-hover:text-brand-500 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="hidden sm:block mt-3 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                    تعلم المزيد حول التقنيات والممارسات الحديثة في مجال البرمجة.{' '}
                  </p>
                </div>
              </div>
            </article>
          ))}
          <PostsPagination
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
