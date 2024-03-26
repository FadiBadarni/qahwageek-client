import { useAppDispatch } from 'hooks/useAppDispatch';
import { LightPost } from 'models/post';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllPublishedPosts } from 'store/post/postActions';
import { RootState } from 'store/store';
import PostFilterSortOptions from './PostFilterSortOptions';
import { PaginationComponent } from 'components/shared/PaginationComponent';
import PostCard from './PostCard';

const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: posts,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.posts.publishedPosts.data);
  const categories = useSelector(
    (state: RootState) => state.categories.categories.data
  );
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const ITEMS_PER_PAGE = 6;
  const [sort, setSort] = useState<string>('createdAt,desc');

  useEffect(() => {
    dispatch(
      fetchAllPublishedPosts({
        page: currentPage,
        size: ITEMS_PER_PAGE,
        sort: sort,
        ...(selectedCategory && { categoryId: selectedCategory }),
      })
    );
  }, [dispatch, currentPage, sort, selectedCategory]);

  const handlePageChange = (newPage: number) => {
    dispatch(
      fetchAllPublishedPosts({
        page: newPage,
        size: ITEMS_PER_PAGE,
        sort: sort,
        ...(selectedCategory && { categoryId: selectedCategory }),
      })
    );
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">المقالات المنشورة</h2>
      </div>

      <PostFilterSortOptions
        sort={sort}
        selectedCategoryId={selectedCategory}
        categories={categories}
        onSortChange={handleSortChange}
        onCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post: LightPost) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center col-span-full">
            <p>لا توجد منشورات متاحة.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};

export default PostsPage;
