import React, { useEffect, useState } from 'react';
import PostActions from './PostActions';
import { Post } from 'models/post';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { fetchAllPosts } from 'store/post/postActions';
import PostsTable from './PostsTable';
import { PaginationComponent } from 'components/shared/PaginationComponent';

type Props = {};

const PostsManagement: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const POSTS_PER_PAGE = 6;
  const [sort, setSort] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>(undefined);

  const {
    items: posts,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.admin.posts.data);

  useEffect(() => {
    dispatch(
      fetchAllPosts({ page: currentPage, size: POSTS_PER_PAGE, status, sort })
    );
  }, [dispatch, currentPage, sort, status]);

  const handlePageChange = (page: number) => {
    dispatch(fetchAllPosts({ page, size: POSTS_PER_PAGE, status, sort }));
  };

  const dummyHandler = (postId: number) => {
    console.log(`Action on post ID: ${postId}`);
  };

  const renderActions = (post: Post) => (
    <PostActions
      post={post}
      onPublish={dummyHandler}
      onReject={dummyHandler}
      onDelete={dummyHandler}
      onEdit={dummyHandler}
      isLoading={false}
      isGlobalUpdating={false}
    />
  );

  return (
    <div className="bg-light-background dark:bg-dark-background p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-8 text-center">
        إدارة المنشورات
      </h1>
      <div className="text-right mb-4 flex justify-start space-x-4 space-x-reverse">
        <select
          className="pr-8 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">اختر معيار الترتيب</option>
          <option value="publishedAt,asc">تاريخ النشر (تصاعدي)</option>
          <option value="publishedAt,desc">تاريخ النشر (تنازلي)</option>
          <option value="createdAt,asc">تاريخ الإنشاء (تصاعدي)</option>
          <option value="createdAt,desc">تاريخ الإنشاء (تنازلي)</option>
        </select>
        <select
          className="pr-8 text-sm dark:text-neutral-200 bg-light-layer dark:bg-dark-layer border border-light-border dark:border-dark-border rounded-md p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value || undefined)}
        >
          <option value="">فلتر حسب الحالة</option>
          <option value="PENDING">قيد الانتظار</option>
          <option value="REJECTED">مرفوض</option>
          <option value="PUBLISHED">منشور</option>
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden border-b border-light-border dark:border-dark-border rounded-lg">
            <PostsTable posts={posts} renderActions={renderActions} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={POSTS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default PostsManagement;
