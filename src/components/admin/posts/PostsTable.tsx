import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { translatePostStatus } from 'models/event';
import { Post, PostStatus } from 'models/post';
import { useState } from 'react';

type PostsTableProps = {
  posts: Post[];
  renderPublishRejectActions: (post: Post) => JSX.Element;
  renderEditDeleteActions: (post: Post) => JSX.Element;
};

const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  renderPublishRejectActions,
  renderEditDeleteActions,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleIconClick = (post: Post) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-light-border dark:divide-dark-border">
        <thead className="bg-light-layer dark:bg-dark-layer">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-light-text dark:text-dark-text tracking-wider"
            >
              العنوان
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              الكاتب
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              تاريخ الانشاء
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              الفئات
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              الحالة
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              إجراءات النشر
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-xs font-medium text-light-text dark:text-dark-text tracking-wider border-r border-light-border dark:border-dark-border"
            >
              إجراءات التعديل
            </th>
          </tr>
        </thead>
        <tbody className="bg-light-layer dark:bg-dark-layer divide-y divide-light-border dark:divide-dark-border">
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 overflow-hidden text-ellipsis max-w-[240px]">
                {post.title.length > 40
                  ? `${post.title.substring(0, 40)}...`
                  : post.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 text-center border-r border-light-border dark:border-dark-border overflow-hidden text-ellipsis max-w-[160px]">
                {post.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 text-center border-r border-light-border dark:border-dark-border ">
                {format(new Date(post.createdAt), 'PP، HH:mm', {
                  locale: ar,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border overflow-hidden text-ellipsis max-w-[120px]">
                <div
                  className="overflow-hidden text-ellipsis"
                  title={post.categoryDetails
                    .map((detail) => detail.name)
                    .join(', ')}
                >
                  {post.categoryDetails.map((detail, index) => (
                    <span key={index}>{(index ? ', ' : '') + detail.name}</span>
                  ))}
                </div>
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap text-sm border-r border-light-border dark:border-dark-border text-center ${
                  post.status === PostStatus.Pending
                    ? 'text-orange-500'
                    : post.status === PostStatus.Published
                    ? 'text-green-500'
                    : post.status === PostStatus.Rejected
                    ? 'text-red-500'
                    : 'text-neutral-700 dark:text-neutral-200'
                }`}
              >
                {translatePostStatus(post.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border ">
                {renderPublishRejectActions(post)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-200 border-r border-light-border dark:border-dark-border ">
                {renderEditDeleteActions(post)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PostsTable;
