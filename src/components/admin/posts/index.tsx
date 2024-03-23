import React, { useEffect, useState } from 'react';
import { Post } from 'models/post';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import {
  deletePost,
  fetchAllPosts,
  updatePostStatus,
} from 'store/post/postActions';
import PostsTable from './PostsTable';
import { PaginationComponent } from 'components/shared/PaginationComponent';
import PublishRejectActions from './PublishRejectActions';
import EditDeleteActions from './EditDeleteActions';
import { displayToast } from 'utils/alertUtils';
import { clearSelectedPost, setSelectedPost } from 'store/admin/adminSlice';
import { useNavigate } from 'react-router-dom';

type Props = {};

const PostsManagement: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const POSTS_PER_PAGE = 6;
  const [sort, setSort] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [isPostUpdating, setIsPostUpdating] = useState(false);
  const [isPostDeleting, setIsPostDeleting] = useState(false);

  const {
    items: posts,
    totalPages,
    currentPage,
  } = useSelector((state: RootState) => state.admin.posts.data);

  const { data: selectedPost } = useSelector(
    (state: RootState) => state.admin.selectedPost
  );

  useEffect(() => {
    dispatch(
      fetchAllPosts({ page: currentPage, size: POSTS_PER_PAGE, status, sort })
    );
  }, [dispatch, currentPage, sort, status]);

  const handlePageChange = (page: number) => {
    dispatch(fetchAllPosts({ page, size: POSTS_PER_PAGE, status, sort }));
  };

  const handlePublish = (post: Post) => {
    setIsPostUpdating(true);

    dispatch(setSelectedPost(post));

    dispatch(updatePostStatus({ postId: post.id, status: 'PUBLISHED' }))
      .unwrap()
      .then((updatedPost) => {
        dispatch(setSelectedPost(updatedPost));
        displayToast('تم نشر المنشور بنجاح', true, currentTheme);
      })
      .catch((error) => {
        displayToast('فشل في نشر المنشور', false, currentTheme);
      })
      .finally(() => {
        setIsPostUpdating(false);
        dispatch(clearSelectedPost());
      });
  };

  const handleReject = (post: Post) => {
    setIsPostUpdating(true);

    dispatch(setSelectedPost(post));

    dispatch(updatePostStatus({ postId: post.id, status: 'REJECTED' }))
      .unwrap()
      .then((updatedPost) => {
        dispatch(setSelectedPost(updatedPost));
        displayToast('تم رفض المنشور بنجاح', true, currentTheme);
      })
      .catch((error) => {
        displayToast('فشل في رفض المنشور', false, currentTheme);
      })
      .finally(() => {
        dispatch(clearSelectedPost());
        setIsPostUpdating(false);
      });
  };

  const handleDelete = (post: Post) => {
    setIsPostDeleting(true);

    dispatch(setSelectedPost(post));

    dispatch(deletePost(post.id))
      .unwrap()
      .then(() => {
        displayToast('تم حذف المنشور بنجاح', true, currentTheme);
      })
      .catch((error) => {
        displayToast('فشل في حذف المنشور', false, currentTheme);
      })
      .finally(() => {
        dispatch(clearSelectedPost());
        setIsPostDeleting(false);
      });
  };

  const handleEdit = (postId: number) => {
    navigate(`/cms/posts/edit/${postId}`);
  };

  const renderPublishRejectActions = (post: Post) => (
    <PublishRejectActions
      post={post}
      isLoading={selectedPost?.id === post.id && isPostUpdating}
      isGlobalUpdating={isPostUpdating || isPostDeleting}
      onPublish={() => handlePublish(post)}
      onReject={() => handleReject(post)}
    />
  );

  const renderEditDeleteActions = (post: Post) => (
    <EditDeleteActions
      postId={post.id}
      onDelete={() => handleDelete(post)}
      onEdit={() => handleEdit(post.id)}
      isLoading={selectedPost?.id === post.id && isPostDeleting}
      isGlobalUpdating={isPostDeleting || isPostUpdating}
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
            <PostsTable
              posts={posts}
              renderEditDeleteActions={renderEditDeleteActions}
              renderPublishRejectActions={renderPublishRejectActions}
            />
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
